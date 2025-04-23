import clsx from "clsx";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  headerPadding?: boolean;
}

export default function PaddedSection({
  children,
  headerPadding = false,
  className,
  ...props
}: Props) {
  return (
    <section
      className={clsx(className, "px-4 py-6", headerPadding && "pt-24")}
      {...props}
    >
      {children}
    </section>
  );
}
