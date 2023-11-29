import React, {useCallback, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router';

import {
    ErrorComponent,
    LoaderComponent,
    useToast
} from '@luft/common';
import {
    SaveProductComponent,
    useProductContextField,
    useProductState
} from '@luft/product';
import {useUpdateWishlistItems} from '@luft/wishlist';

import {getInStockBundleOptions} from '../../../../wishlist/src/utils';

import messages from './resources/messages';

type Props = {
    /**
     * An id of wishlist item
     */
    wishlistItemId: string,
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * A representation for loading view
     */
    loadingAs?: React.Component,
    /**
     * A representation for error view
     */
    errorAs?: React.Component,
    /**
     * An await result state
     */
    awaitResult?: boolean,
}

export function EditableBundleUpdateWishlistItemContainer(
    {
        wishlistItemId,
        as: Component = SaveProductComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        awaitResult = true,
        ...other
    }: Props) {
    const history = useHistory();
    const {formatMessage} = useIntl();
    const addToast = useToast();
    const name = useProductContextField('product.name');
    const productType = useProductContextField('product.type');
    const [$editableBundleOpts, setEditableBundleOptions] = useProductState('editableBundleOptions');
    const $bundledOptions = useProductContextField('product.bundled_products');
    const [$qty] = useProductState('qty');
    const [updateItem, {loading, error}] = useUpdateWishlistItems(productType);

    // Fix required bundle option with single product
    useEffect(() => {
        const options = [];
        $bundledOptions.forEach((option) => {
            const {required, products} = option;
            if (required && products.length === 1) {
                const isExist = $editableBundleOpts?.some((opt) => opt?.option_id === option.id);
                if (!isExist) {
                    options.push({
                        option_id: option.id,
                        values: [option?.products?.[0]?.id],
                        quantity: $qty
                    });
                    setEditableBundleOptions([...$editableBundleOpts, ...options]);
                }
            }
        });
    }, [$bundledOptions, $editableBundleOpts]);

    const handleOnItemUpdate = useCallback(async () => {
        try {
            await updateItem(wishlistItemId, {
                editableBundleOptions: getInStockBundleOptions($editableBundleOpts, $bundledOptions),
                qty: $qty
            });
            addToast(formatMessage(messages.update_success, {name}), 'success');
            history.replace('/account/wishlist');
        } catch (e) {}
    }, [
        $editableBundleOpts,
        $bundledOptions,
        updateItem,
        wishlistItemId,
        $qty,
        addToast,
        formatMessage,
        name,
        history
    ]);

    if (awaitResult && loading) return Loading && <Loading/>;
    if (awaitResult && error) return Error && <Error error={error}/>;

    return (
        <Component {...other}
                   onSave={handleOnItemUpdate}
                   title={formatMessage(messages.update)}
                   variant="primary"
                   disabled={loading}/>
    );
}
