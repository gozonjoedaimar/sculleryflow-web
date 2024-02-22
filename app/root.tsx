import "remixicon/fonts/remixicon.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import { type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import stylesheet from "./styles.css";
import useAuth from "./hooks/auth";
import AuthLayout from "./layout/auth.layout";
import GuestLayout from "./layout/guest.layout";
import GuestOnly from "./config/routes/guest";
import { ModalContainer, ModalProvider } from "./components/modal/Modal";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const { authenticated } = useAuth();
  const location = useLocation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        { authenticated ?
          <ModalProvider>
            <ModalContainer>
              <AuthLayout />
            </ModalContainer>
          </ModalProvider>
          : (authenticated === null && !GuestOnly.includes(location.pathname) ? null: <GuestLayout />) }
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
