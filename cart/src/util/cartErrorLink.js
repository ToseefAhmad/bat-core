import {onError} from '@apollo/client/link/error';

const isCartNotFoundError = (error) => error?.extensions?.category === 'graphql-cart-not-found';

export const cartErrorLink = onError(({graphQLErrors = [], response}) => {
    if (!graphQLErrors.some(isCartNotFoundError)) return;

    // Silence all "cart not found" errors, due to their redundant nature for the user
    const filteredErrors = graphQLErrors.filter((error) => !isCartNotFoundError(error));

    response.errors = filteredErrors.length ? filteredErrors : null;
});
