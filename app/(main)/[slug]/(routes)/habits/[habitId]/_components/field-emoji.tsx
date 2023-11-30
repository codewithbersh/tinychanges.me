import { SmilePlus } from "lucide-react";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FieldEmojiProps {
  value: string;
  onChange: (value: string) => void;
  fieldError: FieldError | undefined;
  selectedColor: string;
  isSubmitting: boolean;
}

export const FieldEmoji = ({
  value,
  onChange,
  fieldError,
  selectedColor,
  isSubmitting,
}: FieldEmojiProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={isSubmitting}>
        <div
          className={cn(
            "grid h-24 w-24 cursor-pointer place-items-center rounded-lg border border-input bg-input-background",
            fieldError && "border-destructive",
          )}
          style={{ backgroundColor: selectedColor }}
          role="button"
          onClick={() => setOpen(true)}
        >
          {value ? (
            <span className="text-5xl leading-none">{value}</span>
          ) : (
            <SmilePlus
              className={cn(
                "h-12 w-12 stroke-[2px] text-muted-foreground",
                fieldError && "text-destructive",
                selectedColor.length > 0 && "text-neutral-950",
              )}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full  p-0">
        <Picker
          data={data}
          previewPosition="none"
          maxFrequentRows={2}
          onEmojiSelect={(e: { native: string }) => {
            onChange(e.native);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
