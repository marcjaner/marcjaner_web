import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  underlineWidth?: string;
  fontSize?: string;
  textColor?: string;
}

export const MenuItem = ({
  to,
  label,
  isActive,
  onClick,
  underlineWidth = "w-2/3",
  fontSize = "",
  textColor = "text-foreground/80",
}: MenuItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        `${textColor} hover:text-foreground transition-colors relative group ${fontSize}`,
        isActive && "text-foreground"
      )}
      onClick={onClick}
    >
      {label}
      <span
        className={cn(
          `absolute bottom-0 left-1/2 -translate-x-1/2 ${underlineWidth} h-0.5 bg-primary transition-all duration-300 group-hover:opacity-100 opacity-0`,
          isActive && "opacity-100 h-1"
        )}
      ></span>
    </Link>
  );
};

export default MenuItem;
