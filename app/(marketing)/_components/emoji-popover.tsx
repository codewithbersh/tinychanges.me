"use client";

import { Dispatch } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { DemoAction } from "./demo-reducer";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPopover {
  children: React.ReactNode;
  dispatch: Dispatch<DemoAction>;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const EmojiPopover = ({
  children,
  dispatch,
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
            dispatch({ type: "setEmoji", payload: { emoji: e.native } });
            console.log(e);
            onClose();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
