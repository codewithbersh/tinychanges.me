interface DemoLabelProps {
  title: string;
  description: string;
}

export const DemoLabel = ({ title, description }: DemoLabelProps) => {
  return (
    <div className="space-y-2">
      <h1 className="font-medium leading-none">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
