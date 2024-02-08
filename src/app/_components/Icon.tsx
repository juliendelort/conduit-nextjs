export interface IconProps {
  id: string;
  className?: string;
}

export function Icon({ id, className }: IconProps) {
  return (
    <svg aria-hidden="true" focusable="false" className={className}>
      <use href={`/icons.svg#${id}`}></use>
    </svg>
  );
}
