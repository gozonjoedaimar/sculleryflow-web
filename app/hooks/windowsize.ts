"use client";
import { useEffect, useState } from "react";

type WindowState = {
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean,
    isLargeDesktop: boolean,
    isExtraLargeDesktop: boolean,
    is2ExtraLargeDesktop: boolean,
    isSmall: boolean,
    isMedium: boolean,
    isLarge: boolean,
    isExtraLarge: boolean,
    is2ExtraLarge: boolean,
    notMedium: boolean,
}

/**
 * Window Size Helper
 * 
 * @property {boolean} isMobile - True if window size is less than 640px
 * @property {boolean} isTablet - True if window size is between 640px and 768px
 * @property {boolean} isDesktop - True if window size is between 768px and 1024px
 * @property {boolean} isLargeDesktop - True if window size is between 1024px and 1280px
 * @property {boolean} isExtraLargeDesktop - True if window size is between 1280px and 1536px
 * @property {boolean} is2ExtraLargeDesktop - True if window size is greater than 1536px
 * @property {boolean} isSmall - True if window size is greater than or equal to 640px
 * @property {boolean} isMedium - True if window size is greater than or equal to 768px
 * @property {boolean} isLarge - True if window size is greater than or equal to 1024px
 * @property {boolean} isExtraLarge - True if window size is greater than or equal to 1280px
 * @property {boolean} is2ExtraLarge - True if window size is greater than or equal to 1536px
 */
export default function useWindowSize(): Partial<WindowState>
{
    // handle ssr
    if (typeof  window === "undefined")
        return {};

    const sm = 640;
    const md = 768;
    const lg = 1024;
    const xl = 1280;
    const xxl = 1536;

    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const [windowState, setWindowState] = useState<Partial<WindowState>>();

    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    useEffect(() => {
        setWindowState(prev => ({
            ...prev,
            isMobile: windowSize < sm,
            isTablet: windowSize >= sm && windowSize < md,
            isDesktop: windowSize >= md && windowSize < lg,
            isLargeDesktop: windowSize >= lg && windowSize < xl,
            isExtraLargeDesktop: windowSize >= xl && windowSize < xxl,
            is2ExtraLargeDesktop: windowSize >= xxl,
            isSmall: windowSize >= sm,
            isMedium: windowSize >= md,
            isLarge: windowSize >= lg,
            isExtraLarge: windowSize >= xl,
            is2ExtraLarge: windowSize >= xxl,
            notMedium: windowSize < md,
        }))
    }, [windowSize]);
    

    return windowState || {};
}
