import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import ItemPage, { loader as DataLoader } from './Pages/ItemPage/ItemPage'
import Layout from './Layout'
import CartContextProvider from './Store/CartContextProvider'
import WishlistContextProvider from './Store/WishlistContextProvider'
import Cart from './Pages/Cart/Cart'
import Template from './Pages/PDP/Template'
import SignUp from "./Pages/SignUp/SignUp";
import Login1 from "./Pages/Login/Login1";
import Wishlist from "./Pages/Wishlist/Wishlist";
import {ToastContainer} from "react-toastify";

// https://themewagon.github.io/malefashion/index.html

const router = createBrowserRouter([
  {
    id: "mainPage",
    path: "/",
    element: <Layout />,
    loader: DataLoader,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      { path:"/wishlist", element:<Wishlist />},
      { path: "/login", element: <Login1 /> },
      { path: "/signUp", element: <SignUp /> },
      {
        path: "/shop",
        element: <ItemPage />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/pdp/:id",
        element: <Template />
      }
    ]
  },
])

const App: React.FC = (): JSX.Element => {

  return (
    <>
      <ToastContainer
          position="top-right"
          autoClose={4000}
      />
      <CartContextProvider>
        <WishlistContextProvider>
            <div className="App">
              <RouterProvider router={router} />
            </div>
        </WishlistContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
