import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  imageUrl: string | null | undefined;
  email: string | null | undefined;
  className?: string;
}

export const UserAvatar = ({ imageUrl, email, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      {imageUrl ? (
        <>
          <AvatarImage src={imageUrl} />
        </>
      ) : null}
      <AvatarFallback
        className={cn(
          "h-8 w-8 bg-primary-foreground text-lg font-medium text-primary",
          className,
        )}
      >
        {email ? email[0].toUpperCase() : ""}
      </AvatarFallback>
    </Avatar>
  );
};
