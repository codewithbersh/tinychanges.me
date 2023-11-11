import { UploadButton } from "@/lib/uploadthing";
import { Camera, ImagePlus, Loader } from "lucide-react";
import { BaseSyntheticEvent } from "react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

interface FieldImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
  email: string;
  trigger: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  disabled: boolean;
}

export const FieldImageUpload = ({
  value,
  onChange,
  email,
  trigger,
  disabled,
}: FieldImageUploadProps) => {
  if (!value || value.length === 0) {
    return (
      <div className="flex items-center gap-6">
        <div className="grid h-24 w-24 place-items-center rounded-full border border-muted">
          <Camera className="h-12 w-12 stroke-[0.5px]" />
        </div>
        <UploadButton
          endpoint="profileImage"
          content={{
            button({ isUploading }) {
              return (
                <Button
                  className="pointer-events-none z-10"
                  variant="secondary"
                  disabled={disabled || isUploading}
                >
                  {isUploading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {!isUploading && <ImagePlus className="mr-2 h-4 w-4" />}
                  Upload image
                </Button>
              );
            },
          }}
          className="ut-button:w-fit ut-button:h-fit ut-button:bg-background ut-allowed-content:hidden ut-button:ring-0 w-fit p-0"
          onClientUploadComplete={(res) => {
            onChange(res![0].url);
            trigger();
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <UserAvatar
        imageUrl={value}
        email={email[0]}
        className="h-24 w-24 text-5xl font-medium"
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
