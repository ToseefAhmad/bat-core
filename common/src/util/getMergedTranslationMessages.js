/**
 * @description
 * Consecutively merge translation messages
 *
 * @returns merged messages
 *
 * @example
 * ```js
 * const mergedMessages = await getMergedTranslationMessages([
 *     import('../translations/en.json'),
 *     import('../translations/micro-pk.json')
 * ]);
 * ```
 */
export const getMergedTranslationMessages = async (translations) => {
    const results = await Promise.all(translations);

    const mergedMessages = results.reduce((allMessages, messages) => ({
        ...allMessages,
        ...messages.default
    }), {});

    return mergedMessages;
};
