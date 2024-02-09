import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import ItemPage, { loader as DataLoader } from './Pages/ItemPage/ItemPage'
import Layout from './Layout'
import CartContextProvider from './Store/CartContextProvider'

// https://themewagon.github.io/malefashion/index.html

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      {
        path: "/shop",
        element: <ItemPage />,
        loader: DataLoader
      }
    ]
  },
  {
    path:"/cart"
  }
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
