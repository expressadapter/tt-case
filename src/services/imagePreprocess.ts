'use server';

import sharp from 'sharp';

export default async function preprocessImage(base64String: string): Promise<string> {
  try {
    // Decode Base64 string into a Buffer
    const base64Data = base64String.split(',')[1]; // Remove the `data:image/...` prefix
    const inputBuffer = Buffer.from(base64Data, 'base64');

    // Detect the format
    const metadata = await sharp(inputBuffer).metadata();
    const format = metadata.format || 'png';

    // Process the image
    const processedImageBuffer = await sharp(inputBuffer)
      .greyscale()
      .normalize()
      .sharpen()
      .webp({lossless:true})
      .toFormat(format)
      .toBuffer();

    // Convert the processed image to Base64
    return `data:image/${format};base64,${processedImageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Image processing failed');
  }
}
