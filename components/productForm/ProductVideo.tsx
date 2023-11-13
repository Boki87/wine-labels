"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
interface ProductVideoProps {
  form: any;
}

function ProductVideo({ form }: ProductVideoProps) {
  const [isValidUrl, setIsValidUrl] = useState(false);

  function sanitizeUrl(url: string) {
    if (url && url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }

  function checkIfIsValidUrl(url: string): boolean {
    return url?.includes("embed");
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>, field: any) {
    const sanitizedUrl = sanitizeUrl(e.target.value);
    setIsValidUrl(checkIfIsValidUrl(sanitizedUrl));
    field.onChange(sanitizedUrl);
  }

  useEffect(() => {
    setIsValidUrl(checkIfIsValidUrl(form.getValues("videoUrl")));
  }, []);

  return (
    <>
      <FormField
        control={form.control}
        name="videoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold text-lg mb-1 mt-6">Video</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                onChange={(e) => onInputChange(e, field)}
                placeholder="YouTube video URL"
              />
            </FormControl>
            <FormMessage className="text-gray-500">
              Copy YouTube video URL from address bar
            </FormMessage>
          </FormItem>
        )}
      />
      {isValidUrl && (
        <div className="max-w-md aspect-video mx-auto my-4 rounded-md overflow-hidden">
          <iframe
            src={form.watch("videoUrl")}
            className="border-none h-full aspect-video"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      )}
    </>
  );
}

export default ProductVideo;
