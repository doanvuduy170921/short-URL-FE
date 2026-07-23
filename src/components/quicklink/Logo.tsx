import { Link2 } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-neon)] shadow-[var(--shadow-neon)]">
        <Link2 className="h-5 w-5 text-background" strokeWidth={2.5} />
      </div>
      <span className="font-display text-xl font-bold tracking-tight">
        Quick<span className="text-gradient">Link</span>
      </span>
    </div>
  );
}
