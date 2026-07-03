import { MOBILE_BREAKPOINT_PX } from '@/shared/config/env';
import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
    const breakpoint = MOBILE_BREAKPOINT_PX

    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < breakpoint;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [breakpoint]);

    return isMobile;
};
