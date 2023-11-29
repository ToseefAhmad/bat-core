export const parseJsonString = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
};
