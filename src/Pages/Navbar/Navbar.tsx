import BottomNav from "./BottomNav"
import TopNav from "./TopNav"

const Navbar:React.FC = ():JSX.Element=>{
    return(
       <>
         <TopNav />
         <BottomNav />
       </>
    )
}

export default Navbar