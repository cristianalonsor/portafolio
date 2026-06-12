interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-slate/60 border border-teal/30 text-teal hover:border-teal transition-colors">
      {label}
    </span>
  );
}
