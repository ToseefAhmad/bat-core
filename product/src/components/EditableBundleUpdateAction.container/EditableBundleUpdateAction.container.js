import React, {useCallback} from 'react';
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
import {useUpdateCartItem} from '@luft/quote';

import messages from './resources/messages';

type Props = {
    /**
     * An id of cart item
     */
    cartItemId: string,
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

export function EditableBundleUpdateActionContainer(
    {
        cartItemId,
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
    const [$editableBundleOpts] = useProductState('editableBundleOptions');
    const [$qty] = useProductState('qty');
    const [updateItem, {loading, error}] = useUpdateCartItem(productType);

    const handleOnItemUpdate = useCallback(async () => {
        try {
            await updateItem(cartItemId, {editableBundleOptions: $editableBundleOpts, qty: $qty});
            addToast(formatMessage(messages.update_success, {name}), 'success');
            history.replace('/cart');
        } catch (e) {}
    }, [
        cartItemId,
        $qty,
        name,
        $editableBundleOpts,
        updateItem,
        addToast
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
