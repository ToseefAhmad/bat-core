import React, {
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useState
} from 'react';
import {
    isFunction,
    isNumber,
    isString,
    set,
    get
} from 'lodash';
import invariant from 'ts-invariant';

import type {OrderItemProduct, Product} from '@luft/types';

import {ProductContext} from '@luft/product';
import type {ProductContextState} from '@luft/product';

export type ProductDetailProviderProps = {
    /**
     * Product entity used for presentation
     */
    product: Product | OrderItemProduct,
    /**
     * Original product entity used in the context
     */
    originalProduct?: Product | OrderItemProduct,
    /**
     * Initial Product Context State
     */
    initialState?: ProductContextState,
    /**
     * If nested providers should inherit parent context value
     */
    inheritContext?: boolean,
    /**
     * Children element(s)
     */
    children?: React.ReactNode
};

export function ProductProvider(
    {
        product: initialProduct,
        originalProduct = initialProduct,
        initialState,
        inheritContext = true,
        children
    }: ProductDetailProviderProps) {
    const inheritedContextValue = useContext(ProductContext);
    const [product, setProduct] = useState(initialProduct || originalProduct);
    const [productState, setProductState] = useState(() => ({qty: 1, ...initialState}));

    const setProductStateField = useCallback((key, val) => {
        if (!isString(key) && !isNumber(key)) {
            invariant.warn('No key for state modification is provided, please, review "setProductState" call');
            return;
        }
        if (isFunction(val)) {
            setProductState(prevState => set({...prevState}, key, val(get(prevState, key))));
        } else {
            setProductState(prevState => set({...prevState}, key, val));
        }
    }, []);

    const value = useMemo(() => {
        if (inheritContext && inheritedContextValue._isFromProvider) return inheritedContextValue;
        return Object.freeze({
            product,
            originalProduct,
            productState,
            setProduct,
            setProductState: setProductStateField,
            _isFromProvider: true
        });
    }, [product, originalProduct, productState, setProductStateField, inheritContext, inheritedContextValue]);

    useLayoutEffect(() => setProductState({qty: 1, ...initialState}), [initialState]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
