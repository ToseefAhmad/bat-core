// Checks if category is either equal to pathCategory or one of it's parents
export function isCategoryInPath(category, pathCategory) {
    let categoryNode = pathCategory;
    while (categoryNode && category) {
        if (category.id === categoryNode.id) {
            return true;
        }
        categoryNode = categoryNode.parent;
    }
    return false;
}
