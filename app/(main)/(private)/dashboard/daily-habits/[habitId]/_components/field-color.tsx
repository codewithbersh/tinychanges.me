import { habitConfig } from "@/config/habit";
import { cn } from "@/lib/utils";

interface FieldColorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const FieldColor = ({ value, onChange, disabled }: FieldColorProps) => {
  return (
    <div className="flex justify-between gap-1">
      {habitConfig.colors.map((color) => (
        <div
          key={color.id}
          className={cn(
            "h-6 w-6 cursor-pointer rounded-md ring-primary ring-offset-2 ring-offset-background",
            value === color.hex && "ring-2",
            disabled && "opacity-50",
          )}
          style={{ backgroundColor: color.hex }}
          onClick={() => onChange(color.hex)}
        />
      ))}
    </div>
  );
};
