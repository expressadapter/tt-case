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
import { useTranslations } from 'next-intl';
import { readMenuData } from '@/services/ocrProcess';
import useSessionStorage from '@/hooks/use-session-storage';
import preprocessImage from '@/services/imagePreprocess';
import MenuInfoFiller from '@/services/menuInfoFiller';
import { v4 as uuidv4 } from 'uuid';

export default function MenuUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useTransitionRouter();
  const t = useTranslations('MenuUpload');

  const [selectedLanguage] = useSessionStorage('language');
  const [, setMenuData] = useSessionStorage('menuData');
  const [, setUserId] = useSessionStorage('userId');

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

      // We are setting new useer id for new chat history
      setUserId(uuidv4());

      // Convert the file to a Base64 string
      const arrayBuffer = await file.arrayBuffer();
      const base64String = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;

      // Call the server function with the Base64 string
      const processedImage = await preprocessImage(base64String);
      if (!processedImage) throw new Error('Preprocess step failed');

      // Read menu data using the processed image
      const data = await readMenuData(processedImage);
      if (!data) throw new Error('Failed to read menu data');

      // Fill menu item info from using api
      const detailedMenuData = await MenuInfoFiller(data, selectedLanguage?.code);
      //Make translation if needed
      /* if (selectedLanguage.code !== 'en') {
        detailedMenuData = await translateMenu(detailedMenuData, selectedLanguage.name);
      } */

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
