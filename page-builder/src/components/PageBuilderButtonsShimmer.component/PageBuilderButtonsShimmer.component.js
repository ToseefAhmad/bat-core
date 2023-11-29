import React from 'react';
import classnames from 'classnames';
import {omitBy} from 'lodash';

type Props = {
    appearance: 'inline' | 'stacked',
    marginTop: string,
    marginRight: string,
    marginBottom: string,
    marginLeft: string,
    paddingTop: string,
    paddingRight: string,
    paddingBottom: string,
    paddingLeft: string
};

type Values = {
    [key: string]: string
};

const removeZeroValues = (values: Values) => omitBy(values, (value) => !parseInt(value, 10));

export function PageBuilderButtonsShimmerComponent({
    appearance,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft
}: Props) {
    const classNames = classnames('page-builder-buttons-shimmer-component', {
        'page-builder-buttons-shimmer-component-inline': appearance === 'inline'
    });

    // Inline styles could potentially override CSS
    const dynamicStyles = removeZeroValues({
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    });

    return (
        <div className={classNames}
             style={dynamicStyles}/>
    );
}
