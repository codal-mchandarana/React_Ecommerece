import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import ItemPage, { loader as DataLoader } from './Pages/ItemPage/ItemPage'
import Layout from './Layout'
import CartContextProvider from './Store/CartContextProvider'
import Cart from './Pages/Cart/Cart'
import Login from './Pages/Login/Login'

// https://themewagon.github.io/malefashion/index.html

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      {  path: "/login", element: <Login /> },
      {
        path: "/shop",
        element: <ItemPage />,
        loader: DataLoader
      },
      {
        path: "/cart",
        element: <Cart />
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
