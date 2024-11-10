'use client'

import React, { useState, useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Camera, Upload, ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Link, useTransitionRouter } from 'next-view-transitions'

type FileType = 'image/jpeg' | 'image/png' | 'application/pdf'

export default function MenuUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isWebcamOpen, setIsWebcamOpen] = useState(false)
  const webcamRef = useRef<Webcam>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useTransitionRouter()

  const processFile = useCallback((file: File) => {
    setFile(file)
    setPreview(URL.createObjectURL(file))
    // Here you would typically upload or process the file
    console.log('Processing file:', file)
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "captured-image.jpg", { type: 'image/jpeg' })
          processFile(file)
          setIsWebcamOpen(false)
        })
    }
  }, [webcamRef, processFile])

  const handleReturn = () => {
    // Implement your return logic here
    console.log('Returning to previous page')
  }

  const handleContinue = () => {
    // Implement your continue logic here
    console.log('Continuing to next page')
    router.push('/menu')
  }

  const handleDiscard = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {!file && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Select File
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
                  Capture Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Capture Image</DialogTitle>
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
                    Capture
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
                <img src={preview} alt="Preview" className="max-h-[55vh] w-full object-contain rounded-lg" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleDiscard}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Discard image</span>
                </Button>
              </div>
            )}
            {(file.type as FileType) === 'application/pdf' && (
              <div className="bg-muted text-muted-foreground p-4 rounded-lg">
                PDF File: {file.name}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
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

      <div className={`flex flex-row pt-4 gap-4 ${file ? 'justify-between' : 'justify-center'}`}>
        <Button className='h-12 w-full sm:w-auto transition-all duration-300' onClick={handleReturn}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          <Link href="/">Return</Link>
        </Button>
        {file && (
          <Button className='h-12 w-full sm:w-auto transition-all duration-300' onClick={handleContinue}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}