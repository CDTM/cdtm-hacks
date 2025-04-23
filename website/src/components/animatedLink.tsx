import clsx from "clsx";
import { motion } from "framer-motion";
import { HTMLAttributes } from "react";

const transition = { duration: 0.3, ease: "easeOut" };

interface Props {
  href: string;
  text: string;
  underlineInitial?: boolean;
  colorHover?: string;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export function AnimatedLink({
  underlineInitial = true,
  href,
  text,
  colorHover = "inherit",
  className,
  onClick,
  title,
}: Props) {
  const internal = !href.startsWith("http://") && !href.startsWith("https://");
  return (
    <AnimatedUnderline
      underlineInitial={underlineInitial}
      className={className}
      colorHover={colorHover}
    >
      <a
        href={href}
        onClick={onClick}
        target={internal ? undefined : "_blank"}
        rel={internal ? undefined : "noopener noreferrer"}
        title={title}
      >
        {text}
      </a>
    </AnimatedUnderline>
  );
}

interface AnimatedUnderlineProps extends HTMLAttributes<HTMLDivElement> {
  underlineInitial?: boolean;
  colorHover?: string;
}

export function AnimatedUnderline({
  underlineInitial = true,
  colorHover = "inherit",
  className,
  children,
}: AnimatedUnderlineProps) {
  return (
    <motion.div
      initial={false}
      animate={underlineInitial ? "visible" : "hidden"}
      whileHover={underlineInitial ? "hidden" : "visible"}
      className={clsx("inline-flex w-min flex-col text-nowrap", className)}
    >
      <motion.div
        variants={{
          visible: { color: "inherit" },
          hidden: { color: colorHover },
        }}
        transition={transition}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          visible: { width: "100%", color: "inherit" },
          hidden: { width: "0%", color: colorHover },
        }}
        transition={transition}
        className={clsx(
          "h-[0.1em] w-full bg-current",
          underlineInitial && "self-end"
        )}
      />
    </motion.div>
  );
}
