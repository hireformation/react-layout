import React from "react";
import { CSSProperties } from "react";
import { create } from "nano-css";
import { addon as addonCache } from "nano-css/addon/cache";
import { addon as addonRule } from "nano-css/addon/rule";
import { addon as addonDrule } from "nano-css/addon/drule";

// Types --- --- ---
export type CSSUnit = string;

// Nano CSS Setup ---- --- ---
const nano = create();
addonCache(nano);
addonRule(nano);
addonDrule(nano);
if (!nano.rule || !nano.drule) {
  throw new Error("nano initialization failed!");
}
export const drule = nano.drule;
export const rule = nano.rule;

// Container Base Class --- --- ---
export interface CommonProps {
  inline?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
const containerCSS = drule({});
export function makeContainer<T extends CommonProps>(
  containerComponent: (
    props: T
  ) => readonly [containerChildren: React.ReactNode, containerClass: string],
  display: "block" | "flex" | "grid" | "table",
  displayName: string
): React.FC<T> {
  const component = (props: T, ref: React.Ref<HTMLDivElement>) => {
    const [containerChildren, containerClass] = containerComponent(props);
    const qualifiedDisplay = props.inline ? "inline-" + display : display;

    return (
      <div
        ref={ref}
        style={props.style}
        className={[
          containerCSS({ display: qualifiedDisplay }),
          containerClass,
          props.className,
        ].join(" ")}
      >
        {containerChildren}
      </div>
    );
  };
  component.displayName = displayName;
  // TODO:UNCLEAR should forwardRef be outside memo?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.memo(React.forwardRef(component)) as any;
}
