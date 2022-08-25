import { CommonProps, CSSUnit, drule, makeContainer } from "./common";

/**
 * An array of components arranged along an axis. Basically a wrapper around flex-box. Typically clients will use `Row` or `Column`.
 */

// flex box --- --- ---
interface FlexBoxProps extends CommonProps {
  direction?: "row" | "column";
  reverse?: boolean;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  // align items along axis
  justifyContent?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
  // align items along cross axis
  alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
  // align content along cross axis- only works if !nowrap
  alignContent?: "start" | "end" | "center" | "space-between" | "space-around" | "stretch";
  gap?: CSSUnit | [x: CSSUnit, y: CSSUnit];
}
function addFlex<T extends string>(prop?: T) {
  if (prop === "start") {
    return "flex-start";
  } else if (prop === "end") {
    return "flex-end";
  } else {
    return prop;
  }
}
const flexBoxCSS = drule({});
export function innerFlexBox(props: FlexBoxProps) {
  if (props.alignContent && props.wrap !== "wrap" && props.wrap !== "wrap-reverse") {
    throw new Error("align content defined with nowrap");
  }
  const props2 = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flexDirection: (props.direction + (props.reverse ? "-reverse" : "")) as any,
    flexWrap: props.wrap,
    justifyContent: addFlex(props.justifyContent),
    alignItems: addFlex(props.alignItems),
    alignContent: addFlex(props.alignContent),
    gap: props.gap instanceof Array ? props.gap.join(" ") : props.gap,
  };

  return [props.children, flexBoxCSS(props2)] as const;
}
export const FlexBox = makeContainer(innerFlexBox, "flex", "flexBox");

// flex item --- --- ---
const flexItemsCSS = drule({});
interface FlexItemProps extends CommonProps {
  order?: number;
  grow?: number;
  shrink?: number;
  basis?: CSSUnit | "auto";
  alignSelf?: "auto" | "start" | "end" | "center" | "baseline" | "stretch";
}
export function innerFlexItem(props: FlexItemProps) {
  const props2 = {
    order: props.order,
    flexGrow: props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    alignSelf: props.alignSelf,
  };
  return [props.children, flexItemsCSS(props2)] as const;
}
export const FlexItem = makeContainer(innerFlexItem, "block", "flexItem");
