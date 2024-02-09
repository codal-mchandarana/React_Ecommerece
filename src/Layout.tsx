import { Outlet } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";


const Layout:React.FC = ():JSX.Element=>{
    return <>
      <Navbar />
      <Outlet />
    </>
}

export default Layout;