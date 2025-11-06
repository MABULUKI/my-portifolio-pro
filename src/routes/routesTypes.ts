import type { ReactNode, FC } from "react";

export interface RouteType {
  path: string;
  name: string;
  fornav: boolean;
  forbottomnav: boolean;
  element: ReactNode;
  layout?: FC<{ children: ReactNode }>; // <-- change here
  children?: RouteType[];
}
