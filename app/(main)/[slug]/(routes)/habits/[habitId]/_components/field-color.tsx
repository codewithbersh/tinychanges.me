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
      hex: "#34d399",
      tailwind: "bg-emerald-400",
    },
    {
      hex: "#f472b6",
      tailwind: "bg-pink-400",
    },

    {
      hex: "#38bdf8",
      tailwind: "bg-sky-400",
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
