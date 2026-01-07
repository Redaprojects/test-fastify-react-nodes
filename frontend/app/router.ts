// app/router.ts
import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";

import Root from "./root";

// This is a minimal router wiring.
// It mounts your Root layout and uses file-based routes.
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: routes,
  },
]);