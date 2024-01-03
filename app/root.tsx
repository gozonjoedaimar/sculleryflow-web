import { cssBundleHref } from "@remix-run/css-bundle";
import { type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "@remix-run/react";

import stylesheet from "./styles.css";
import useAuth from "./hooks/auth";
import AuthLayout from "./layout/auth.layout";
import GuestLayout from "./layout/guest.layout";
import { useEffect } from "react";
import GuestOnly from "./config/routes/guest";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const { authenticated, reveal } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated && !GuestOnly.includes(location.pathname)) {
      navigate("/login");
    }
    if (authenticated && GuestOnly.includes(location.pathname)) {
      navigate("/");
    }
  }, [authenticated, location, navigate]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        { reveal && (authenticated ? <AuthLayout /> : <GuestLayout />) }
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
