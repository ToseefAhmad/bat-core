export const getBundleProductInStock = (item = {}) => {
    if (!item?.bundle_info) {
        return true;
    }

    const selectedOptions = item?.bundle_info?.selected_options;
    const bundledOptions = item?.product?.bundled_products;

    if (!selectedOptions) {
        return false;
    }

    return selectedOptions.every(option => {
        const currentOption = bundledOptions.find(opt => opt.id === option.option_id);

        return option.values.every(optId => currentOption.products.some(product => product.id === optId.value_id));
    });
};
