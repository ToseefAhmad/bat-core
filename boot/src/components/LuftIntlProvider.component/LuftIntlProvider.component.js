import React, {useState, useEffect} from 'react';
import deepmerge from 'deepmerge';
import {IntlProvider} from 'react-intl';

import {LoaderComponent} from '@luft/common';
import {useCurrentStore} from '@luft/multistore';

// stubs for special formats used in luft
export const LUFT_NAMED_FORMATS = {
    number: {
        money: {}
    }
};

const DEFAULT_LOCALE = 'en';
const DEFAULT_FALLBACK_LOCALES = ['en-EN', 'en-US', 'en-AU', 'en-GB'];

type Messages = {
    /**
     * Translation message
     */
    [messageId: string]: string
};

type Translations = {
    /**
     * Locale in a format of a 2-symbol (like 'en') or a 5-symbol (like 'en-AU') language code.
     * Contains translations for a particular locale
     */
    [locale: string]: Messages
};

export type LuftIntlProps = {
    /**
     * Application locale
     */
    locale?: string,
    /**
     * Application fallback locales. They are used for preventing error messages in
     * console in case of missing translation for a locale from a `fallbackLocales` list
     */
    fallbackLocales?: string[],
    /**
     * Custom formats for named formatters
     */
    formats?: Object,
    /**
     * Translation messages for supported locales
     * Can be:
     *  Translations object
     *  Promise, that resolves to Translations object
     *  Function, that returns Messages Object or Promise, that resolves to Messages object
     */
    messages?: Translations | Promise<Translations> | () => Messages | () => Promise<Messages>,
    /**
     * Children component
     */
    children?: React.Component
}

export const LuftIntlProviderComponent = (props: LuftIntlProps) => {
    const {
        locale: configuredLocale,
        fallbackLocales = DEFAULT_FALLBACK_LOCALES,
        formats = {},
        messages: opaqueMessagesObject,
        children
    } = props;

    const currentStore = useCurrentStore();
    const [mergedFormats] = useState(() => deepmerge(LUFT_NAMED_FORMATS, formats));
    const [messages, setMessages] = useState();
    const [messagesLoading, setMessagesLoading] = useState(true);

    const locale = configuredLocale || currentStore?.locale || DEFAULT_LOCALE;
    const defaultLocale = fallbackLocales.includes(locale) ? locale : DEFAULT_LOCALE;

    useEffect(() => {
        if (!opaqueMessagesObject) return setMessagesLoading(false);

        if (opaqueMessagesObject.then) {
            opaqueMessagesObject.then(result => {
                setMessages(result);
                setMessagesLoading(false);
            });
        } else if (typeof opaqueMessagesObject === 'function') {
            Promise.resolve(opaqueMessagesObject(locale)).then(result => {
                setMessages(result);
                setMessagesLoading(false);
            });
        } else {
            setMessages(opaqueMessagesObject[locale]);
            setMessagesLoading(false);
        }
    }, [opaqueMessagesObject, locale]);

    if (messagesLoading) return <LoaderComponent type="fixed"/>;

    return (
        <IntlProvider {...props}
                      defaultLocale={defaultLocale}
                      locale={locale}
                      messages={messages}
                      formats={mergedFormats}>
            {children}
        </IntlProvider>
    );
};
