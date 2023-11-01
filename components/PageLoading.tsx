"use client";
import { Wine } from "lucide-react";

function PageLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Wine size={42} className="animate-bounce" />
    </div>
  );
}

export default PageLoading;
