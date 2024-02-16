import clsx from "clsx";

export interface CommentProps {
  content: React.ReactNode;
  footer: React.ReactNode;
  contentClassName?: string;
}

export function Comment({ content, footer, contentClassName }: CommentProps) {
  return (
    <div className="my-4 overflow-hidden rounded border border-borderprimary">
      <div
        className={clsx(
          "whitespace-pre-wrap border-b border-borderprimary bg-surfaceprimary text-onsurfaceprimary ",
          contentClassName,
        )}
      >
        {content}
      </div>
      <div className="flex items-center gap-2 bg-surfacesecondary px-4 py-3 text-xs text-onsurfacesecondary">
        {footer}
      </div>
    </div>
  );
}
