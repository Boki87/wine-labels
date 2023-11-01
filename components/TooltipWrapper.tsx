"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipWrapperProps {
  children: ReactNode;
  message?: string;
}

function TooltipWrapper({ children, message }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {message && (
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipWrapper;
