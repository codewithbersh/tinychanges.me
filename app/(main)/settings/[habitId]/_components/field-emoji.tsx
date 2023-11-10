import { SmilePlus } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface FieldEmojiProps {
  value: string;
  onChange: (value: string) => void;
  fieldError: FieldError | undefined;
  selectedColor: string;
  disabled: boolean;
}

export const FieldEmoji = ({
  value,
  onChange,
  fieldError,
  selectedColor,
  disabled,
}: FieldEmojiProps) => {
  if (value) {
    return (
      <div className="flex items-center gap-6">
        <div
          className={cn(
            "bg-input-background grid h-24 w-24 place-items-center rounded-lg border",
            fieldError && "border-destructive",
          )}
          style={{ backgroundColor: selectedColor, borderColor: selectedColor }}
        >
          <span className="text-5xl leading-none">{value}</span>
        </div>
        <Button
          variant="secondary"
          onClick={() => onChange("")}
          disabled={disabled}
        >
          Remove Emoji
        </Button>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "bg-input-background grid h-24 w-24 cursor-pointer place-items-center rounded-lg border",
            fieldError && "border-destructive",
          )}
          style={{ backgroundColor: selectedColor }}
        >
          <SmilePlus
            className={cn(
              "h-12 w-12 stroke-[1px]",
              fieldError && "text-destructive",
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="bg-input-background w-full p-0">
        <Picker
          data={data}
          previewPosition="none"
          maxFrequentRows={2}
          onEmojiSelect={(e: { native: string }) => onChange(e.native)}
        />
      </PopoverContent>
    </Popover>
  );
};
