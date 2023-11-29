export default class QueryMapper {
    static FilterInputsMapToArr(locationSearchString) {
        return locationSearchString && Object.entries(locationSearchString).map(([filter_id, values]) => ({
            filter_id,
            values: Array.isArray(values) ? values : [values]
        }));
    }

    static FilterInputsArrToMap(filterInputs) {
        return filterInputs && filterInputs.reduce((memo, {filter_id, values}) => {
            // eslint-disable-next-line no-param-reassign
            memo[filter_id] = values;
            return memo;
        }, {});
    }

    static SortInputToMap(sortInput) {
        return sortInput && {product_list_order: sortInput.sort_option_id};
    }

    // "Direction" value was hardcoded because it should be set for the BE-implementation but we don't set it
    // in the FE-part in the current phase
    static SortInputStringToObj(sortInputMap) {
        return sortInputMap && {sort_option_id: sortInputMap, direction: 'DESC'};
    }

    static formatSearchToSortInput(product_list_order) {
        return product_list_order && QueryMapper.SortInputStringToObj(product_list_order);
    }
}
