import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicLayout, AuthorLayout } from "./layouts";

// Lazy load pages for token efficiency and performance optimization
const Home = lazy(() => import("./pages/Home.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignUpPage.jsx"));
const AllPosts = lazy(() => import("./pages/AllPosts.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));
const Post = lazy(() => import("./pages/Post.jsx"));
const BecomeAuthor = lazy(() => import("./pages/BecomeAuthor.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Drafts = lazy(() => import("./pages/Drafts.jsx"));
const Showcase = lazy(() => import("./pages/Showcase.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// Generic fallback loader for routes
const PageLoader = () => (
  <div className="w-full min-h-[50vh] flex flex-col items-center justify-center py-12 gap-4">
    <div className="flex flex-col gap-3 w-64 max-w-full">
      <div className="h-4 bg-surface-hover rounded-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="h-4 bg-surface-hover rounded-full w-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent animate-[shimmer_1.5s_infinite_0.15s]" />
      </div>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
          { path: "/showcase", element: <Suspense fallback={<PageLoader />}><Showcase /></Suspense> },
          { path: "/login", element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
          { path: "/signup", element: <Suspense fallback={<PageLoader />}><SignupPage /></Suspense> },
          { path: "/all-posts", element: <Suspense fallback={<PageLoader />}><AllPosts /></Suspense> },
          { path: "/post/:slug", element: <Suspense fallback={<PageLoader />}><Post /></Suspense> },
          { path: "/become-author", element: <Suspense fallback={<PageLoader />}><BecomeAuthor /></Suspense> },
          { path: "/profile", element: <Suspense fallback={<PageLoader />}><Profile /></Suspense> },
          { path: "*", element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
        ],
      },
      {
        element: <AuthorLayout />,
        children: [
          { path: "/dashboard", element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
          { path: "/drafts", element: <Suspense fallback={<PageLoader />}><Drafts /></Suspense> },
          { path: "/add-post", element: <Suspense fallback={<PageLoader />}><AddPost /></Suspense> },
          { path: "/edit-post/:slug", element: <Suspense fallback={<PageLoader />}><EditPost /></Suspense> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);