'use client';

import React, { useState, useCallback, useRef, useContext } from 'react';
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
import { Link, useTransitionRouter } from 'next-view-transitions';
import { toBase64 } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useAppContext } from '@/contexts/AppContext';

type FileType = 'image/jpeg' | 'image/png' | 'application/pdf';

export default function MenuUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useTransitionRouter();
  const t = useTranslations();
  const { dispatch } = useAppContext();

  const processFile = useCallback(async (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    const base64String = await toBase64(file);
    dispatch({ type: 'SET_UPLOADED_FILE', payload: base64String });
  }, []);

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
    <div className="mx-auto w-full max-w-md space-y-4">
      {!file && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {t('Select File')}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,application/pdf"
              className="hidden"
            />

            <Dialog open={isWebcamOpen} onOpenChange={setIsWebcamOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  {t('Capture Image')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('Capture Image')}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: 'environment' }}
                    className="w-full rounded-lg"
                  />
                  <Button onClick={captureImage} className="mt-4 w-full">
                    {t('Capture Image')}
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
            {preview && (file.type as FileType).startsWith('image/') && (
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
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Discard image</span>
                </Button>
              </div>
            )}
            {(file.type as FileType) === 'application/pdf' && (
              <div className="rounded-lg bg-muted p-4 text-muted-foreground">
                PDF File: {file.name}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={handleDiscard}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Discard file</span>
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
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('Return')}
        </Button>
        {file && (
          <Button
            className="h-12 w-full transition-all duration-300 sm:w-auto"
            onClick={() => router.push('/menu')}
          >
            {t('Continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
