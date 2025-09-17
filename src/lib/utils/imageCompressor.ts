/**
 * Client-side image compression utility for Vercel deployment
 * No Node.js fs module dependency - works in browser environment
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  maxSizeKB?: number;
}

export class ImageCompressor {
  /**
   * Compress an image file
   * @param file - The image file to compress
   * @param options - Compression options
   * @returns Promise<File> - Compressed image file
   */
  static async compressImage(file: File, options: CompressionOptions = {}): Promise<File> {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.9,
      format = 'jpeg',
      maxSizeKB = 500
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      img.onload = () => {
        // Calculate new dimensions
        const { width, height } = this.calculateDimensions(
          img.width,
          img.height,
          maxWidth,
          maxHeight
        );

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            // Check if we need further compression
            if (blob.size / 1024 > maxSizeKB && quality > 0.1) {
              // Recursively compress with lower quality
              const newOptions = { ...options, quality: quality * 0.8 };
              this.compressImage(file, newOptions).then(resolve).catch(reject);
              return;
            }

            // Create new file with compressed data
            const compressedFile = new File([blob], file.name, {
              type: `image/${format}`,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          `image/${format}`,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Compress image specifically for logos
   * @param file - The logo image file
   * @returns Promise<File> - Compressed logo file
   */
  static async compressLogo(file: File): Promise<File> {
    return this.compressImage(file, {
      maxWidth: 400,
      maxHeight: 200,
      quality: 0.9,
      format: 'png', // PNG for transparency support
      maxSizeKB: 100
    });
  }

  /**
   * Compress image for thumbnails
   * @param file - The image file
   * @returns Promise<File> - Compressed thumbnail file
   */
  static async compressThumbnail(file: File): Promise<File> {
    return this.compressImage(file, {
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.7,
      format: 'jpeg',
      maxSizeKB: 50
    });
  }

  /**
   * Calculate optimal dimensions while maintaining aspect ratio
   */
  private static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    let { width, height } = { width: originalWidth, height: originalHeight };

    // Scale down if too large
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }

    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }

    return { width: Math.round(width), height: Math.round(height) };
  }

  /**
   * Get image dimensions without loading the full image
   */
  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Convert image to different format
   */
  static async convertFormat(
    file: File,
    targetFormat: 'jpeg' | 'png' | 'webp',
    quality: number = 0.8
  ): Promise<File> {
    return this.compressImage(file, {
      format: targetFormat,
      quality,
      maxWidth: 1920,
      maxHeight: 1080,
    });
  }

  /**
   * Create multiple sizes of an image
   */
  static async createMultipleSizes(
    file: File,
    sizes: Array<{ name: string; width: number; height: number; quality?: number }>
  ): Promise<Array<{ name: string; file: File }>> {
    const results = [];

    for (const size of sizes) {
      try {
        const compressed = await this.compressImage(file, {
          maxWidth: size.width,
          maxHeight: size.height,
          quality: size.quality || 0.8,
          format: 'jpeg'
        });

        results.push({
          name: size.name,
          file: new File([compressed], `${file.name.split('.')[0]}_${size.name}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          })
        });
      } catch (error) {
        console.error(`Failed to create ${size.name} size:`, error);
      }
    }

    return results;
  }
}