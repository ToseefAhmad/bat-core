export const getStorageManager = () => ({
    setStorageData: (storage, name, value) => {
        if (storage) {
            storage.setItem(name, JSON.stringify(value));
        }
    },
    getStorageData: (storage, name) => {
        let data = null;
        if (storage) {
            data = JSON.parse(storage.getItem(name));
            storage.removeItem(name);
        }
        return data;
    }
});
