

import { Routes, Route } from "react-router-dom";
import { routes } from "./index";

const renderRoutes = (routesArray: typeof routes) => {
  return routesArray.map((route, index) => {
    const Element = route.element;
    const Layout = route.layout ?? ((children: any) => <>{children}</>);

    return (
      <Route
        key={index}
        path={route.path}
        element={<Layout>{Element}</Layout>}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
};

const AppRoutes = () => <Routes>{renderRoutes(routes)}</Routes>;

export default AppRoutes;

