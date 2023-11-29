export const getActiveItemByPath = (tree, url) => tree?.children?.find(item =>
    // eslint-disable-next-line implicit-arrow-linebreak
    item?.url === url || item?.url.endsWith(url)
);
