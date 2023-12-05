"use client";

import { BaseSyntheticEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Camera, ImagePlus, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { habitConfig } from "@/config/habit";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormLabel } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";

interface FieldImageProps {
  value: string | null;
  onChange: (value: string | null) => void;
  email: string | null | undefined;
  trigger: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  disabled: boolean;
}

export const FieldImage = ({
  value,
  onChange,
  email,
  trigger,
  disabled,
}: FieldImageProps) => {
  const [selected, setSelected] = useState<string | null>(value);

  if (!value || value.length === 0) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="grid h-24 w-24 cursor-pointer place-items-center rounded-full border border-neutral-700 bg-input-background">
            <Camera className="h-12 w-12 stroke-[0.5px]" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex flex-col items-center justify-center gap-2 border-neutral-700 bg-input-background"
        >
          <FormLabel className="mr-auto">Select Image</FormLabel>
          <div className="grid grid-cols-4 gap-1.5">
            {habitConfig.defaultAvatarImages.map((image) => (
              <Image
                key={image.src}
                className={cn(
                  "cursor-pointer rounded-md hover:opacity-75",
                  selected === image.value &&
                    "ring-2 ring-neutral-300 ring-offset-2 ring-offset-background",
                )}
                src={image.src}
                alt="Avatar"
                width={320}
                height={294}
                onClick={() => setSelected(image.value)}
              />
            ))}
          </div>
          <Button
            className="mt-2 w-full bg-neutral-50 text-neutral-950 hover:bg-neutral-50/75"
            onClick={() => {
              onChange(selected);
              trigger();
            }}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Select Image
          </Button>
          <span className="mb-2 mt-4 text-center text-xs font-medium text-muted-foreground">
            OR
          </span>
          <UploadButton
            endpoint="profileImage"
            content={{
              button({ isUploading }) {
                return (
                  <Button
                    className="pointer-events-none z-10 w-[254px] bg-input-background "
                    disabled={disabled || isUploading}
                    variant="ghost"
                  >
                    {isUploading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Upload Image
                  </Button>
                );
              },
            }}
            className="w-fit p-0 ut-button:h-fit ut-button:w-fit ut-button:bg-background ut-button:ring-0 ut-allowed-content:hidden"
            onClientUploadComplete={(res) => {
              onChange(res![0].url);
              trigger();
            }}
          />

          <div className="mt-4 flex gap-1 text-xs text-muted-foreground">
            <Link
              href="https://www.avatartion.com/"
              target="_blank"
              className=" underline hover:text-primary"
            >
              Avatartion
            </Link>
            |
            <Link
              href="https://www.drawkit.com/"
              target="_blank"
              className=" underline hover:text-primary"
            >
              Draw Kit
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <UserAvatar
        imageUrl={value}
        email={email}
        className="h-24 w-24 text-6xl font-medium"
      />
      <Button
        variant="secondary"
        onClick={() => onChange("")}
        disabled={disabled}
      >
        Remove Image
      </Button>
    </div>
  );
};

FieldImage.Skeleton = function SkeletonFieldImage() {
  return (
    <div className="flex items-center gap-6">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-8 w-[121px] rounded-md" />
    </div>
  );
};
