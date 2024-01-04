import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
    token: string|null;
}

type SessionFlashData = {
    error: string;
}

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		// a Cookie from `createCookie` or the same CookieOptions to create one
		cookie: {
			name: "__session",
			secrets: ["7gXc9R3kZ6nQ1vY8jS5fH2dP0aL4xZ7bQ6nM"],
			sameSite: "lax",
		},
	});

export { getSession, commitSession, destroySession }