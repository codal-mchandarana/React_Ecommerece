import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import ItemPage, { loader as DataLoader } from './Pages/ItemPage/ItemPage'
import Layout from './Layout'
import CartContextProvider from './Store/CartContextProvider'
import Cart from './Pages/Cart/Cart'
import Login from './Pages/Login/Login'
import Template from './Pages/PDP/Template'

// https://themewagon.github.io/malefashion/index.html

const router = createBrowserRouter([
  {
    id: "mainPage",
    path: "/",
    element: <Layout />,
    loader: DataLoader,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
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
      <CartContextProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </CartContextProvider>
    </>
  );
}

export default App;
