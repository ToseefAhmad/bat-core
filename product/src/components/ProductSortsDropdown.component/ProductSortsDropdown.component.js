import React, {
    useCallback,
    useMemo,
    useEffect
} from 'react';
import {useIntl} from 'react-intl';

import {DropdownComponent} from '@luft/common';
import {useProductListContextField} from '@luft/product';
import type {ProductListContext} from '@luft/product';
import type {Sort, SortInput} from '@luft/types';

import messages from './resources/messages';

type Props = {
    /**
     * Sort list
     */
    sorts: Sort[],
    /**
     * Applied sort
     */
    appliedSort?: Sort | ProductListContext.appliedSort,
    /**
     * A callback on sort change
     */
    onSortInputChange?: (sort: SortInput) => void
}

const getSortKey = (item: Sort) => `${item.sort_option_id}_${item.direction}`;

/**
 * Presentational component, used to show sorting dropdown
 */
export function ProductSortsDropdownComponent(
    {
        sorts,
        appliedSort,
        onSortInputChange
    }: Props) {
    const {formatMessage} = useIntl();
    const $appliedSort = useProductListContextField('appliedSort', appliedSort);

    const defaultSort = sorts?.find(({is_default}) => is_default);
    const $currentSort = $appliedSort || defaultSort;

    // It is not possible to set the translation for the option "position" in the admin panel,
    // as there is no such attribute. Therefore, it is necessary to do it on the FE side.
    const sortsOptions = useMemo(() => sorts?.map(item => {
        if (item.sort_option_id === 'position') {
            return {...item, name: formatMessage(messages.sorts_option_position)};
        }

        return item;
    }), [sorts, formatMessage]);

    const isActive = useCallback((itemKey: string) => {
        const currentSortKey = getSortKey($currentSort);

        return itemKey === currentSortKey;
    }, [$currentSort]);

    const handleSortChange = useCallback(item => {
        if (!onSortInputChange || !item) return;
        onSortInputChange({
            sort_option_id: item.sort_option_id,
            direction: item.direction
        });
    }, [onSortInputChange]);

    // Make initial request with default sorting options in case any sort options have not been applied yet
    useEffect(() => {
        if ($appliedSort) return;

        handleSortChange(defaultSort);
    }, [
        $appliedSort,
        defaultSort,
        handleSortChange
    ]);

    return !!sortsOptions?.length && (
        <div className="product-sorts-dropdown-component">
            <DropdownComponent>
                <DropdownComponent.Toggle>
                    {formatMessage(messages.sorts_title)}
                </DropdownComponent.Toggle>
                <DropdownComponent.Menu>
                    {sortsOptions.map((item) => {
                        const itemKey = getSortKey(item);

                        return (
                            <DropdownComponent.Item key={itemKey}
                                                    eventKey={itemKey}
                                                    onClick={() => handleSortChange(item)}
                                                    active={isActive(itemKey)}>
                                {item.name}
                            </DropdownComponent.Item>
                        );
                    })}
                </DropdownComponent.Menu>
            </DropdownComponent>
        </div>
    );
}
