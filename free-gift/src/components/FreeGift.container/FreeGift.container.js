import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import {toast} from 'react-toastify';
import {useIntl} from 'react-intl';
import {isEmpty, each} from 'lodash';

import {useCartIdQuery} from '@luft/quote';
import {useStoreConfigQuery} from '@luft/common';

import {FreeGiftModalComponent} from '../FreeGiftModal.component';
import {ToastContentComponent} from '../ToastContent.component';
import {useFreeGiftRulesQuery, useAddFreeGiftToCartMutation} from '../../hooks';
import messages from './resources/messages';

type Props = {
    as?: React.Component,
    autoClose?: boolean | number,
    onAddToCart?: (Object) => void
};

export function FreeGiftContainer(props: Props) {
    const {
        as: Component = FreeGiftModalComponent,
        autoClose = false,
        onAddToCart,
        ...others
    } = props;

    const {formatMessage} = useIntl();
    const toastRef = useRef(null);
    const [showFreeGifts, setShowFreeGifts] = useState(false);
    const [freeGiftItems, setFreeGiftItems] = useState([]);
    const {data: cartIdData} = useCartIdQuery();
    const cartId = cartIdData?.cart?.id;
    const {data: freeGiftData} = useFreeGiftRulesQuery(cartId);
    const [addFreeGiftToCart, {loading: addFreeGiftLoading}] = useAddFreeGiftToCartMutation();
    const {data: storeConfigData} = useStoreConfigQuery();
    const configFreeGiftMessage = storeConfigData?.storeConfig?.add_freegift_to_cart_message;
    const rules = freeGiftData?.getFreeGiftRules;

    const handleOpen = () => {
        setShowFreeGifts(true);
    };

    const handleClose = () => {
        setShowFreeGifts(false);
    };

    const onHideFreeGifts = () => {
        if (!toastRef.current) return;
        handleClose();
        toast.dismiss(toastRef.current);
        toastRef.current = null;
    };

    const handleOnAddToCart = async (item) => {
        const input = {
            cart_id: cartId,
            rule_id: item.product.rule_id,
            sku: item.product.sku,
            qty: 1
        };

        try {
            const resp = await addFreeGiftToCart(input);
            if (onAddToCart) onAddToCart(resp);
            return resp;
        } catch (err) {
            if (onAddToCart) onAddToCart(err);
        }
    };

    useEffect(() => onHideFreeGifts, []);

    useEffect(() => {
        if (isEmpty(rules)) {
            onHideFreeGifts();
            return;
        }

        const data = [];

        each(rules, (rule) => {
            const {is_auto_add, items} = rule;
            if (!is_auto_add) {
                items.forEach(item => data.push(item.product));
            }
        });

        if (isEmpty(data)) {
            onHideFreeGifts();
            return;
        }

        setFreeGiftItems(data);
        if (!toastRef.current) {
            toastRef.current = toast(
                <ToastContentComponent title={formatMessage(messages.title)}
                                       message={configFreeGiftMessage}
                                       onOpen={handleOpen}
                                       type="success"/>,
                {
                    autoClose
                });
        }
    }, [rules]);

    if (!showFreeGifts) return null;

    return (
        <Component {...others}
                   products={freeGiftItems}
                   onClose={handleClose}
                   showFreeGifts={showFreeGifts}
                   onAddToCart={handleOnAddToCart}
                   loading={addFreeGiftLoading}/>
    );
}
