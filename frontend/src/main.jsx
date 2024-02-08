import "@/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "@/pages/Landing";
import AppLayout from "@/layouts/App";
import HomePage from "@/pages/Home";
import BusinessEstablishments from "@/pages/BusinessEstablishments";
import Emissions from "@/pages/Emissions";
import Payroll from "@/pages/Payroll";
import TaxRevenue from "@/pages/TaxRevenue";
import Entrepreneurship from "@/pages/Entrepreneurship";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
  },
  {
    path: "app",
    element: (
      <>
        <SignedIn>
          <AppLayout />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "business-establishments",
        element: <BusinessEstablishments />,
      },
      {
        path: "emissions",
        element: <Emissions />,
      },
      {
        path: "payroll",
        element: <Payroll />,
      },
      {
        path: "tax-revenue",
        element: <TaxRevenue />,
      },
      {
        path: "entrepreneurship",
        element: <Entrepreneurship />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
