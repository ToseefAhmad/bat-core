import React from 'react';
import Script from 'react-load-script';

type Props = {
    containerId: string
};

export function GoogleOptimizeComponent(props: Props) {
    const {containerId} = props;

    if (!containerId) return null;

    const url = `https://www.googleoptimize.com/optimize.js?id=${containerId}`;

    return (
        <Script url={url}/>
    );
}
