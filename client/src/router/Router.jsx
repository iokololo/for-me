import { Navigate, createBrowserRouter } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { Main } from "../pages/Main/Main";
import { Login } from "../pages/Auth/Login/Login";
import { Register } from "../pages/Auth/Register/Register";
import { Verify } from "../pages/Auth/Verify/Verify";
import { Product } from "../pages/Product/Product";
import { Search } from "../pages/Search/Search";
import { Loader } from "../components/UI/Loader/Loader";
import { FAQ } from "../pages/FAQ/FAQ.jsx";
import { ForgotPassword } from "../pages/Auth/ForgotPassword/ForgotPassword";
import { MapView } from "../pages/MapView/MapView";
import { Profile } from "../pages/Profile/Profile";
import { Payment } from "../pages/Payment/Payment";
import { Gallery } from "../pages/Gallery/Gallery";
import { ShowMore } from "../pages/ShowMore/ShowMore";
import { EditProfile } from "../pages/EditProfile/EditProfile.jsx";
import { Reviews } from "../pages/Reviews/Reviews";
import { TeachersList } from "../pages/TeacherList/TeacherList.jsx";
import { AuthorProfile } from "../pages/AuthorProfile/AuthorProfile.jsx";
import { Chat } from "../pages/Chat/Chat.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <Main />
      </PageWrapper>
    ),
  },
  {
    path: "/teachers",
    element: (
      <PageWrapper>
        <TeachersList />
      </PageWrapper>
    ),
  },
  {
    path: "/teachers/:id",
    element: (
      <PageWrapper>
        <AuthorProfile />
      </PageWrapper>
    ),
  },
  {
    path: "/search",
    element: (
      <PageWrapper>
        <Search />
      </PageWrapper>
    ),
  },
  {
    path: "/faq",
    element: (
      <PageWrapper>
        <FAQ />
      </PageWrapper>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/verify/:token",
    element: <Verify />,
  },
  {
    path: "/product/:id",
    element: (
      <PageWrapper>
        <Product />
      </PageWrapper>
    ),
  },
  {
    path: "/map",
    element: (
      <PageWrapper>
        <MapView />
      </PageWrapper>
    ),
  },
  {
    path: "/*",
    element: <Navigate to='/' />,
  },
  {
    path: "/payment/:id",
    element: (
      <PageWrapper>
        <Payment />
      </PageWrapper>
    ),
  },
  {
    path: "/product/:id/gallery",
    element: (
      <PageWrapper>
        <Gallery />
      </PageWrapper>
    ),
  },
  {
    path: "/all/:category",
    element: (
      <PageWrapper>
        <ShowMore />
      </PageWrapper>
    ),
  },
  {
    path: "/editProfile/:id",
    element: (
      <PageWrapper>
        <EditProfile />
      </PageWrapper>
    ),
  },
  {
    path: "/reviews",
    element: (
      <PageWrapper>
        <Reviews />
      </PageWrapper>
    ),
  }
]);

export const LoadingRoute = createBrowserRouter([
  {
    path: "/*",
    element: (
      <div>
        <Loader />
      </div>
    ),
  },
]);

export const AuthRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <Main />
      </PageWrapper>
    ),
  },
  {
    path: "/teachers",
    element: (
      <PageWrapper>
        <TeachersList />
      </PageWrapper>
    ),
  },
  {
    path: "/teachers/:id",
    element: (
      <PageWrapper>
        <AuthorProfile />
      </PageWrapper>
    ),
  },
  {
    path: "/product/:id/gallery",
    element: (
      <PageWrapper>
        <Gallery />
      </PageWrapper>
    ),
  },
  {
    path: "/profile",
    element: (
      <PageWrapper>
        <Profile />
      </PageWrapper>
    ),
  },
  {
    path: "/search",
    element: (
      <PageWrapper>
        <Search />
      </PageWrapper>
    ),
  },
  {
    path: "/faq",
    element: (
      <PageWrapper>
        <FAQ />
      </PageWrapper>
    ),
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/product/:id",
    element: (
      <PageWrapper>
        <Product />
      </PageWrapper>
    ),
  },
  {
    path: "/chat",
    element: (
      <PageWrapper>
        <Chat />
      </PageWrapper>
    ),
  },
  {
    path: "/map",
    element: (
      <PageWrapper>
        <MapView />
      </PageWrapper>
    ),
  },
  {
    path: "/*",
    element: <Navigate to='/' />,
  },
  {
    path: "/payment/:id",
    element: (
      <PageWrapper>
        <Payment />
      </PageWrapper>
    ),
  },
  {
    path: "/all/:category",
    element: (
      <PageWrapper>
        <ShowMore />
      </PageWrapper>
    ),
  },
  {
    path: "/reviews",
    element: (
      <PageWrapper>
        <Reviews />
      </PageWrapper>
    ),
  }
]);
