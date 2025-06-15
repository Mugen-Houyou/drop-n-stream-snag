
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FileVideo, UploadCloud } from "lucide-react";

type DropZoneProps = {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
  file?: File | null;
};

const DropZone: React.FC<DropZoneProps> = ({ onFileSelected, file, disabled }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBrowse = () => !disabled && inputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files.length && files[0].name.endsWith(".m3u8")) {
      onFileSelected(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = e.target.files;
    if (files && files[0] && files[0].name.endsWith(".m3u8")) {
      onFileSelected(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-xl border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-muted bg-muted/30",
        disabled && "opacity-60 cursor-not-allowed"
      )}
      onClick={handleBrowse}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      tabIndex={0}
      aria-disabled={disabled}
    >
      <input
        type="file"
        accept=".m3u8"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        disabled={disabled}
      />
      {file ? (
        <div className="flex items-center gap-3">
          <FileVideo className="w-7 h-7 text-primary" />
          <span className="font-medium text-primary">
            {file.name}
            <span className="ml-2 text-xs text-muted-foreground">
              ({(file.size / 1024).toFixed(1)} KB)
            </span>
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <UploadCloud className="w-10 h-10 text-muted-foreground" />
          <span className="font-semibold text-lg">여기로 m3u8 파일을 드래그하거나 클릭해서 선택하세요</span>
          <span className="text-sm text-muted-foreground">
            Only .m3u8 files supported
          </span>
        </div>
      )}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 rounded-xl pointer-events-none" />
      )}
    </div>
  );
};

export default DropZone;
