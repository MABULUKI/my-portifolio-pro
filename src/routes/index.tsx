import { type RouteType } from "./routesTypes";
import Home from "../pages/index";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Myservices from "../pages/Myservices";
import Contact from "../pages/Contact";
import Insights from "../pages/Insights";
import MainLayout from "../layouts/MainLayout";
import Pannel from "../pages/Pannel";
import AdminLayout from "../layouts/AdminLayout";


export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    fornav: true,
    forbottomnav: true,
    element: <Home />,
    layout: MainLayout,
  },
  {
    path: "/about",
    name: "About",
    fornav: true,
    forbottomnav: true,
    element: <About />,
    layout: MainLayout,
  },
  {
    path: "/my-services",
    name: "My Services",
    fornav: true,
    forbottomnav: true,
    element: <Myservices />,
    layout: MainLayout,
  },
  {
    path: "/projects",
    name: "Projects",
    fornav: true,
    forbottomnav: true,
    element: <Projects />,
    layout: MainLayout,
  },
  {
    path: "/contact",
    name: "Contact",
    fornav: true,
    forbottomnav: true,
    element: <Contact />,
    layout: MainLayout,
  },
  {
    path: "/insights",
    name: "Insights",
    fornav: true,
    forbottomnav: true,
    element: <Insights />,
    layout: MainLayout,
  },
    {
    path: "/pannel",
    name: "Pannel",
    fornav: false,
    forbottomnav: false,
    element: <Pannel />,
    layout: AdminLayout,
  },
  
];
