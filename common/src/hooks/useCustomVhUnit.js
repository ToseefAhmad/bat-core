import {useEffect} from 'react';

/**
 * @description
 * Set custom `vh` variable, which is calculated depending on real viewport height.
 * On mobile, vh unit behaves not the way it's expected (site's navigation and page controls
 * are taken in account during vh calculation).
 * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
export const useCustomVhUnit = () => {
    useEffect(() => {
        if (!window) return;

        const handleSetVhUnit = () => {
            // Get the viewport height and multiple it by 1% to get a value for a vh unit
            const vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        handleSetVhUnit();
        window.addEventListener('resize', handleSetVhUnit);

        return () => window.removeEventListener('resize', handleSetVhUnit);
    }, []);
};
