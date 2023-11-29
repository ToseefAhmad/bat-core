export const getVideoIdFromUrl = (url: string) => {
    const {pathname} = new URL(url);

    return pathname.split('/').pop();
};
