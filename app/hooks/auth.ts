import { useAtom } from 'jotai';
import tokenAtom from "app/store/token";
import GuestOnly from 'app/config/routes/guest';
import { useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';

type AuthReturn = {
    token: string|null,
    authenticated: boolean,
    reveal: boolean
}

/**
 * useAuth
 * 
 * @returns {AuthReturn}
 * - token: string|null
 * - authenticated: boolean
 * - reveal: boolean (whether to reveal the page or not)
 */
export default function useAuth(): AuthReturn {
    const [token] = useAtom(tokenAtom);
    const location = useLocation();
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        if (token) {
            setReveal( true );
        }
        else if (GuestOnly.includes(location.pathname)) {
            setReveal( true );
        }
        else {
            setReveal( false );
        }
    }, [token, location]);

    return {
        token,
        authenticated: token !== null,
        reveal
    }
}