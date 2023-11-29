import cookie from 'cookie';

export const cookieManager = {
    has: (key: string) => {
        const cookies = cookie.parse(document?.cookie || '');

        return key in cookies;
    },
    get: (key: string) => {
        const cookies = cookie.parse(document?.cookie || '');

        return cookies[key] || null;
    },
    set: (key: string, value: string | number | boolean, options?: Object) => {
        if (typeof window === 'undefined') return;

        document.cookie = cookie.serialize(key, value, options);
    },
    delete: (key: string, options?: Object) => {
        if (typeof window === 'undefined') return;

        document.cookie = cookie.serialize(key, null, {
            maxAge: 0,
            ...options
        });
    }
};
