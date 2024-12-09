import classNames from "classnames";
import { ReactNode, forwardRef } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  children: ReactNode;
  label: string;
  theme?: "plain" | "ghost";
  type?: "reset";
  onClick?: () => void;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ ...props }, forwardedRef) => {
    const { children, label, theme = "plain", type, onClick, ...rest } = props;

    return (
      <button
        ref={forwardedRef}
        aria-label={label}
        className={classNames(styles.iconButton, {
          [styles.plain]: theme === "plain",
          [styles.ghost]: theme === "ghost",
        })}
        title={label}
        type={type}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export const IconLinkButton = ({
  children,
  to,
  theme = "plain",
}: Omit<IconButtonProps, "onClick" | "type"> & { to: string }) => (
  <a
    className={classNames(styles.iconButton, {
      [styles.plain]: theme === "plain",
      [styles.ghost]: theme === "ghost",
    })}
    href={to}
    rel="noreferrer"
    target="_blank"
  >
    {children}
  </a>
);
