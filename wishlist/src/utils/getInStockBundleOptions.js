export const getInStockBundleOptions = (selectedOptions = [], bundleOptions = []) => {
    const actualSelectedOptions = [];

    selectedOptions.forEach(option => {
        const currentOptionsValues = [];
        const currentOptionProducts = bundleOptions.find(opt => opt.id === option.option_id)?.products || [];

        option?.values.forEach(id => {
            if (currentOptionProducts.some(product => product.id === id)) {
                currentOptionsValues.push(id);
            }
        });

        if (currentOptionsValues.length) {
            actualSelectedOptions.push({...option, values: currentOptionsValues});
        }
    });

    return actualSelectedOptions;
};
