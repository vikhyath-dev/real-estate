import HomePage from "./pages/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./pages/listPage/ListPage";
import { Layout, RequireAuth } from "./pages/layout/Layout";
import SinglePage from "./pages/singlePage/SinglePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Register from "./pages/register/register";
import Login from "./pages/login/Login";
import ProfileUpdatePage from "./pages/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./pages/newPostPage/newPostPage";
import { AuthContextProvider } from "./context/AuthContext";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader:listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
       
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  
function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  ); 
}

export default App;
