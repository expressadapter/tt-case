'use client';

import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Camera, Upload, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
import { toBase64 } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { readMenuData } from '@/services/ai';
import { useSearchParams } from 'next/navigation';
import useSessionStorage from '@/hooks/useSessionStorage';
import preprocessImage from '@/services/imagePreprocess';
import MenuInfoFiller from '@/services/menuInfoFiller';

type FileType = 'image/jpeg' | 'image/png';

export default function MenuUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'English';
  const t = useTranslations('MenuUpload');

  const [selectedLanguage, setSelectedLanguage] = useSessionStorage('language');
  const [menuData, setMenuData] = useSessionStorage('menuData');

  const processFile = useCallback(async (file: File) => {
    try {
      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type');
        return;
      }
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);

      // Cleanup URL when component unmounts
      return () => URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  }, []);

  const handleContinue = async () => {
    if (!file) return;

    try {
      setIsLoading(true);

      // Convert the file to a Base64 string
      const arrayBuffer = await file.arrayBuffer();
      const base64String = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;

      // Call the server function with the Base64 string
      const processedImage = await preprocessImage(base64String);
      if (!processedImage) throw new Error('Preprocess step failed');

      // Read menu data using the processed image
      //const data = await readMenuData(processedImage, lang);
      const data = [
        {
          id: 'dine_on_demand',
          title: 'Dine On Demand',
          items: [
            {
              alternativeGroups: [
                { items: [{ name: 'Marinated Prawns And Grilled Vegetables' }] },
                { alternationType: 'or', items: [{ name: 'Best Of Mezze' }] },
                { alternationType: 'and/or', items: [{ name: 'Creamy Zucchini Soup' }] },
              ],
            },
            {
              alternativeGroups: [
                { items: [{ name: 'Grilled Cod Fish' }] },
                { alternationType: 'or', items: [{ name: 'Stir Fried Beef With Bbq' }] },
                { alternationType: 'or', items: [{ name: 'Rigatoni With Parmesan Tomato Sauce' }] },
              ],
            },
            {
              alternativeGroups: [
                { items: [{ name: 'Potpourri Of Traditional Turkish Desserts' }] },
                { alternationType: 'or', items: [{ name: 'Chocolate Cake' }] },
                { alternationType: 'or', items: [{ name: 'Apricot Caramel Cake' }] },
                { alternationType: 'or', items: [{ name: 'Selection Of Cheese' }] },
                { alternationType: 'or', items: [{ name: 'Fresh Fruit Salad' }] },
              ],
            },
          ],
        },
        {
          id: 'anytime',
          title: 'Anytime',
          items: [{ name: 'Roast Beef Sandwich' }, { name: 'Fruit Tartelette' }],
        },
        {
          id: 'before_landing',
          title: 'Before Landing',
          items: [
            { name: 'Freshly Squeezed Orange Juice' },
            { name: 'Fresh Papaya Juice' },
            { name: 'Mango & Banana Smoothie' },
            { name: 'Fresh Fruit Salad' },
            { name: 'Yoghurt' },
            { name: 'Chicken Breast & Smoked Turkey' },
            { name: 'Selection Of Cheese' },
            { name: 'Honey, Butter' },
            {
              alternativeGroups: [
                { items: [{ name: 'Mozzarella And Tomato Omelette' }] },
                { alternationType: 'or', items: [{ name: 'Crepe With Vanilla Custard' }] },
              ],
            },
            { name: 'Ovenfresh Bread Selection' },
            { name: 'Croissant And Danish' },
          ],
        },
      ];

      if (!data) throw new Error('Failed to read menu data');

      // Fill menu item info from using api
      const detailedMenuData = await MenuInfoFiller(data);

      console.log(detailedMenuData);

      setMenuData(detailedMenuData);

      router.push(`/menu`);
    } catch (error) {
      console.error('Error in handleContinue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
          processFile(file);
          setIsWebcamOpen(false);
        })
        .catch((error) => {
          console.error('Error capturing image:', error);
        });
    }
  }, [webcamRef, processFile]);

  const handleDiscard = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full max-w-md space-y-4">
        <h1 className="mb-6 text-center text-2xl font-bold">{t('uploadTitle')}</h1>

        {!file && (
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                disabled={isLoading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {t('selectFile')}
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png"
                className="hidden"
              />

              <Dialog open={isWebcamOpen} onOpenChange={setIsWebcamOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" disabled={isLoading}>
                    <Camera className="mr-2 h-4 w-4" />
                    {t('captureImage')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('captureImage')}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: 'environment' }}
                      className="w-full rounded-lg"
                    />
                    <Button onClick={captureImage} className="mt-4 w-full" disabled={isLoading}>
                      {t('capture')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {file && (
          <div className="space-y-4">
            <div className="relative">
              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[55vh] w-full rounded-lg object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={handleDiscard}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">{t('discardImage')}</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={`flex flex-row gap-4 pt-4 ${file ? 'justify-between' : 'justify-center'}`}>
          <Button
            className="h-12 w-full transition-all duration-300 sm:w-auto"
            onClick={() => router.push('/')}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('return')}
          </Button>
          {file && (
            <Button
              className="h-12 w-full transition-all duration-300 sm:w-auto"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? t('processing') : t('continue')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
