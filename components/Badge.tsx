// components/Badge.tsx
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/85 px-3 py-1 text-[11px] tracking-[0.16em] text-black/70">
      {children}
    </span>
  );
}
