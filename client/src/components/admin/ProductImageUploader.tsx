import React, { useRef, useState } from "react";
import { storage } from "@/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";

interface ProductImageUploaderProps {
  productFolder: string; // e.g. product name or id
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
}

export const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  productFolder,
  imageUrls,
  setImageUrls,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    setError(null);
    const uploadPromises = Array.from(files).map(async (file) => {
      const fileRef = ref(storage, `products/${productFolder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          undefined,
          (err) => reject(err),
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
    });
    try {
      const urls = await Promise.all(uploadPromises);
      setImageUrls([...imageUrls, ...urls]);
    } catch (err) {
      setError("Failed to upload one or more images.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (idx: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-muted hover:bg-accent transition min-h-[120px] text-center"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="text-sm text-muted-foreground">Drag & drop or click to select images (multiple allowed)</span>
        {uploading && <span className="text-xs text-blue-500 mt-2">Uploading...</span>}
        {error && <span className="text-xs text-red-500 mt-2">{error}</span>}
      </div>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {imageUrls.map((url, idx) => (
          <div key={url} className="relative group w-20 h-20 sm:w-24 sm:h-24">
            <img
              src={url}
              alt="Product preview"
              className="object-cover w-full h-full rounded border"
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-1 right-1 p-1 opacity-80 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(idx);
              }}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
