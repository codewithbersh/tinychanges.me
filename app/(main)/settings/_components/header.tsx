interface HeaderProps {
  route: string;
}

export const Header = ({ route }: HeaderProps) => {
  return (
    <h1 className="text-lg font-semibold text-muted-foreground">
      Settings / <span className="text-primary">{route}</span>
    </h1>
  );
};
