import React from "react";

export default function Stack({
  children,
  direction = "column",
  spacing = 0,
  alignItems,
  justifyContent,
  flexWrap,
  className = "",
  component: Component = "div",
  style = {},
  ...props
}) {
  // Mapping flex direction
  const getDirectionClass = () => {
    switch (direction) {
      case "row":
        return "flex-row";
      case "row-reverse":
        return "flex-row-reverse";
      case "column-reverse":
        return "flex-col-reverse";
      case "column":
      default:
        return "flex-col";
    }
  };

  // Mapping align items
  const getAlignItemsClass = () => {
    switch (alignItems) {
      case "flex-start":
        return "items-start";
      case "center":
        return "items-center";
      case "flex-end":
        return "items-end";
      case "stretch":
        return "items-stretch";
      case "baseline":
        return "items-baseline";
      default:
        return "";
    }
  };

  // Mapping justify content
  const getJustifyContentClass = () => {
    switch (justifyContent) {
      case "flex-start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "flex-end":
        return "justify-end";
      case "space-between":
        return "justify-between";
      case "space-around":
        return "justify-around";
      case "space-evenly":
        return "justify-evenly";
      default:
        return "";
    }
  };

  // Mapping flex wrap
  const getFlexWrapClass = () => {
    switch (flexWrap) {
      case "wrap":
        return "flex-wrap";
      case "wrap-reverse":
        return "flex-wrap-reverse";
      case "nowrap":
        return "flex-nowrap";
      default:
        return "";
    }
  };

  // Calculate the gap style
  // Nếu spacing là number, hệ số giống hệt Tailwind: spacing={2} => gap (0.5rem / 8px)
  // Nếu spacing là string: truyền trực tiếp ví dụ "16px", "1em"
  const gapStyle = spacing
    ? { gap: typeof spacing === "number" ? `${spacing * 0.25}rem` : spacing }
    : {};

  // Gộp toàn bộ class Tailwind
  const classes = `flex ${getDirectionClass()} ${getAlignItemsClass()} ${getJustifyContentClass()} ${getFlexWrapClass()} ${className}`
    .replace(/\s+/g, " ")
    .trim();

  return (
    <Component
      className={classes}
      style={{ ...gapStyle, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}