import React, {
  ChangeEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";

interface ProductImageUploadProps {
  onDelete?: (url: string) => void;
  onUpload?: (images: File[]) => void;
  images?: string[];
}

function ProductImageUpload({
  onDelete,
  onUpload,
  images,
}: ProductImageUploadProps) {
  const id = useId();
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    onUpload?.(newImages);
  }, [newImages]);

  useEffect(() => {
    setNewImages([]);
  }, [images]);

  return (
    <div>
      <div className="mb-3">
        <input
          style={{ display: "none" }}
          type="file"
          multiple
          id={id + "-image-upload"}
          accept=".jpg,.png,.jpeg,.webp"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (
              e.target &&
              e.target?.files?.length &&
              e.target?.files?.length > 0
            ) {
              //@ts-ignore
              setNewImages((prev) => [...prev, ...e.target.files]);
            }
          }}
        />
        <Button asChild>
          <label htmlFor={id + "-image-upload"}>
            <span>Upload images</span>
            <Upload size={20} className="ml-2" />
          </label>
        </Button>
      </div>
      <div className="overflow-hidden overflow-x-auto">
        <div className="flex items-center gap-2">
          {images?.map((image, i) => (
            <ImageThumb
              src={image}
              key={`${image}_${i}`}
              onDelete={() => onDelete?.(image)}
            />
          ))}
          {newImages.map((file, i) => (
            <ThumbFromFile
              file={file}
              onDelete={() => {
                const newImgs = [...newImages];
                newImgs.splice(i, 1);
                setNewImages(newImgs);
              }}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageThumb({
  src,
  onDelete,
}: {
  src: string;
  onDelete?: (img: string) => void;
}) {
  return (
    <div className="w-[200px] h-[200px] min-w-[200px] rounded-md overflow-hidden flex items-center justify-center relative">
      <div
        onClick={() => onDelete?.(src)}
        className="absolute top-0 right-0 w-10 h-10 rounded-bl-lg bg-white flex items-center justify-center cursor-pointer hover:bg-red-400 hover:text-white transition-all duration-300"
      >
        <X />
      </div>
      <img src={src} className="object-cover min-w-full min-h-full" />
    </div>
  );
}

function ThumbFromFile({
  file,
  onDelete,
}: {
  file: File;
  onDelete?: () => void;
}) {
  const [src, setSrc] = useState<string | null>(null);

  function initFileReader() {
    const reader = new FileReader();
    if (!reader) return;
    reader.onload = (e) => {
      setSrc(e.target?.result as string);
    };
    reader.onerror = () => setSrc(null);
    reader.readAsDataURL(file);
  }

  function deleteHandler() {
    onDelete?.();
  }

  useLayoutEffect(() => {
    initFileReader();
  }, [file]);

  if (!src) return null;

  return <ImageThumb src={src} onDelete={deleteHandler} />;
}

export default ProductImageUpload;
