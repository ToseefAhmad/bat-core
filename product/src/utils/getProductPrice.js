export const getProductPrice = (price) => {
    let productPrice;

    switch (true) {
        case !!price.minimum?.amount?.value:
            productPrice = price.minimum;
            break;

        case !!price.final?.amount?.value:
            productPrice = price.final;
            break;

        case 'regular' in price:
            productPrice = price.regular;
            break;

        default:
            break;
    }

    // Return object with value and currency
    return productPrice?.amount;
};
