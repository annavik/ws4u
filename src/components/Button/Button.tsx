import classNames from "classnames";
import { ReactNode, forwardRef } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  theme?: "outline" | "ghost" | "solid";
  title?: string;
  onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, forwardedRef) => {
    const {
      children,
      className,
      theme = "outline",
      title,
      onClick,
      ...rest
    } = props;

    return (
      <button
        aria-label={title}
        ref={forwardedRef}
        className={classNames(
          styles.button,
          {
            [styles.outline]: theme === "outline",
            [styles.ghost]: theme === "ghost",
            [styles.solid]: theme === "solid",
          },
          className,
        )}
        title={title}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export const LinkButton = ({
  children,
  className,
  theme = "outline",
  title,
  to,
}: Omit<ButtonProps, "onClick"> & { to: string }) => (
  <a
    aria-label={title}
    className={classNames(
      styles.button,
      {
        [styles.outline]: theme === "outline",
        [styles.ghost]: theme === "ghost",
        [styles.solid]: theme === "solid",
      },
      className,
    )}
    href={to}
    rel="noreferrer"
    target="_blank"
    title={title}
  >
    {children}
  </a>
);
