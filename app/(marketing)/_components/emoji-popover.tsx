"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPopover {
  children: React.ReactNode;
  setEmoji: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const EmojiPopover = ({
  children,
  setEmoji,
  open,
  setOpen,
}: EmojiPopover) => {
  const onClose = () => {
    setOpen(!open);
  };
  return (
    <Popover open={open} onOpenChange={() => onClose()}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full p-0 " align="start">
        <Picker
          data={data}
          previewPosition="none"
          maxFrequentRows={2}
          onEmojiSelect={(e: { native: string }) => {
            onClose();
            setEmoji(e.native);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
