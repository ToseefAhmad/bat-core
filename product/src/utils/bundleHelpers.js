// TODO: Overridden from a future LUFT version. Should be removed after upgrading LUFT packages to 2.2.0 version
/**
 * Gets selected bundle options, and converts it to an array that contain information about product preselected values.
 * The array is used later as graphql input to find out total price for a bundle configuration and to update item
 * (in cart and wishlist).
 *
 * @param {SelectedBundleOption[]} options
 * @returns {BundleOptionInput[]}
 */
export const getPreselectedEditableBundleOptionsFromItem = (options) => options?.map(option => ({
    option_id: option.option_id,
    values: option.values.map(value => value.value_id),
    // options with multiple value should have qty as this field is required for M2
    quantity: option.values.length === 1 ? option.values[0].quantity : 1
}));

/**
 * Function gets selected options and check if all required options are selected,
 * therefore product is valid and can be added to cart.
 *
 * @param {BundleOptionInput} selectedOptions
 * @param {BundleOption[]} options
 * @returns {boolean}
 */
export const areEditableBundleOptionsValid = (selectedOptions, options) => {
    if (!selectedOptions || !options) return false;

    const selectedOptionsIds = selectedOptions
        .filter(option => !!option.values?.length && option.quantity > 0)
        .map(option => option.option_id);
    return options.filter(option => option.required).every(option => selectedOptionsIds.includes(option.id));
};

// TODO: just to make component override work. Should be removed after upgrading LUFT packages to 2.2.0 version
export const getPreselectedEditableBundleOptions = () => null;
