const PHONE_ERROR_EXTENSION = 'graphql-phone-number-not-confirmed';

export const isPhoneConfirmError = (error) => error?.graphQLErrors?.[0]?.extensions?.category === PHONE_ERROR_EXTENSION;
