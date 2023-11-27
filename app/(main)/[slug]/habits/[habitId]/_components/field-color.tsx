import { cn } from "@/lib/utils";

interface FieldColorProps {
  value: string;
  onChange: (value: string) => void;
  isSubmitting: boolean;
}

export const FieldColor = ({
  value,
  onChange,
  isSubmitting,
}: FieldColorProps) => {
  const colors = [
    {
      hex: "#4ade80",
      tailwind: "bg-green-400",
    },
    {
      hex: "#ef4444",
      tailwind: "bg-red-500",
    },

    {
      hex: "#3b82f6",
      tailwind: "bg-blue-500",
    },
    {
      hex: "#fb923c",
      tailwind: "bg-orange-400",
    },
  ];

  return (
    <div className="flex gap-4">
      {colors.map((color) => (
        <button
          className={cn(
            "h-10 w-10 rounded-md disabled:cursor-not-allowed disabled:opacity-50",
            color.tailwind,
            value === color.hex &&
              "ring-2 ring-ring ring-offset-2 ring-offset-background",
          )}
          onClick={() => onChange(color.hex)}
          key={color.tailwind}
          disabled={isSubmitting}
          type="button"
        />
      ))}
    </div>
  );
};
