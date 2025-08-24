"use client";

type Props = { targetSelector: string };

export function FullscreenButton({ targetSelector }: Props) {
  const onClick = () => {
    const el = document.querySelector(targetSelector) as HTMLElement | null;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }
    el.requestFullscreen?.();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 text-xs px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="全画面に切り替え"
    >
      全画面切替
    </button>
  );
}
