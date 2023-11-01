"use client";
import React, { useEffect } from "react";
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
  //https://www.youtube.com/watch?v=GznmPACXBlY
  function sanitizeUrl(url: string) {
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }

  useEffect(() => {
    console.log(111, form.getValues("videoUrl"));
  }, [form]);
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
                placeholder="YouTube video URL"
              />
            </FormControl>
            <FormMessage className="text-gray-500">
              Copy YouTube video URL from address bar
            </FormMessage>
          </FormItem>
        )}
      />
      <div className="max-w-md aspect-video">
        <iframe />
      </div>
    </>
  );
}

export default ProductVideo;
