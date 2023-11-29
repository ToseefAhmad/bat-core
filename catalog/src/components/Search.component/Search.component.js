import React, {
    useState,
    useEffect,
    useRef,
    useCallback
} from 'react';
import {useIntl} from 'react-intl';
import {useLocation} from 'react-router';
import classnames from 'classnames';

import {
    ButtonComponent,
    InputComponent,
    CloseButtonComponent,
    useScrollDirection,
    useResolutions,
    useDebounce,
    useOnClickOutside
} from '@luft/common';
import {SearchModalContainer} from '@luft/catalog';

import messages from './resources/messages';

type Props = {
    /**
     * Search query
     */
    search: string,
    /**
     * Callback after navigate to the search page
     */
    onNavigateSearchResults: (search: string) => void
}

export function SearchComponent({search = '', onNavigateSearchResults}: Props) {
    const [direction, isScrolledToTop] = useScrollDirection();
    const {isSMdown: isMobile} = useResolutions();
    const {formatMessage} = useIntl();
    const {pathname} = useLocation();
    const [isVisibleSearch, setIsVisibleSearch] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [searchText, setSearchText] = useState(search);
    const debouncedSearchText = useDebounce(searchText, 500);
    const searchRef = useRef();
    const buttonRef = useRef();

    // Close mobile search bar on scroll
    useEffect(() => {
        if (!isMobile || isOpenModal) return;

        setIsVisibleSearch(false);
    }, [direction, isScrolledToTop, isMobile, isOpenModal]);

    // Close mobile search bar and modal on page change
    useEffect(() => {
        setIsVisibleSearch(false);
        setIsOpenModal(false);
    }, [pathname]);

    const onClickOutside = useCallback((e) => {
        const isToggleButton = buttonRef.current?.contains(e.target);

        if (!isOpenModal || isToggleButton) return;

        setIsOpenModal(false);
    }, [isOpenModal]);

    useOnClickOutside(searchRef, onClickOutside);

    const onChangeText = (e) => setSearchText(e.target.value);
    const onOpenModal = () => setIsOpenModal(true);
    const onCloseModal = () => setIsOpenModal(false);

    const onToggleSearch = () => {
        setIsVisibleSearch(prevIsVisibleSearch => !prevIsVisibleSearch);
        setIsOpenModal(false);
    };

    const onReset = useCallback((e) => {
        if (e) e.stopPropagation();

        setSearchText('');
        setIsOpenModal(false);
    }, []);

    const classNames = classnames('search-component', {
        'search-component-hidden': isMobile && !isVisibleSearch
    });

    return (
        <>
            {isMobile && (
                <ButtonComponent className="search-component-button"
                                 onClick={onToggleSearch}
                                 ref={buttonRef}
                                 inline={true}
                                 title={formatMessage(messages.button_title)}
                                 aria-label={formatMessage(messages.button_title)}
                                 variant="primary-link">
                    <span className="search-component-button-text">
                        {formatMessage(messages.button_title)}
                    </span>
                </ButtonComponent>
            )}
            <div className={classNames}
                 ref={searchRef}>
                <form noValidate
                      className="search-component-form"
                      onSubmit={(e) => e.preventDefault()}>
                    <div className="search-component-form-content">
                        <InputComponent className="search-component-form-content-input"
                                        value={searchText}
                                        title={formatMessage(messages.search)}
                                        placeholder={formatMessage(messages.search)}
                                        onChange={onChangeText}
                                        onFocus={onOpenModal}/>
                        {isOpenModal && isMobile ? (
                            <CloseButtonComponent className="search-component-form-content-icon icon-close"
                                                  title={formatMessage(messages.close)}
                                                  aria-label={formatMessage(messages.close)}
                                                  onClick={onReset}/>
                        ) : (
                            <ButtonComponent className="search-component-form-content-icon icon-search"
                                             variant="secondary"
                                             size="lg"
                                             inline={true}
                                             aria-label={formatMessage(messages.button_title)}
                                             onClick={onOpenModal}/>
                        )}
                    </div>
                </form>
                {isOpenModal && (
                    <SearchModalContainer search={debouncedSearchText}
                                          onNavigateSearchResults={onNavigateSearchResults}
                                          onRecentSearchItemClick={setSearchText}
                                          onReset={onReset}
                                          onClose={onCloseModal}/>
                )}
            </div>
        </>
    );
}
