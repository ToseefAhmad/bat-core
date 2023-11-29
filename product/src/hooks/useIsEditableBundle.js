// TODO: temporary hook to identify Editable Bundle product
import {useMemo} from 'react';

export const useIsEditableBundle = (bundledOptions) => useMemo(() => (
    bundledOptions.find(item => (
        !item.required
        || item.products.length !== 1
        || item.products.find(p => !p.is_default || p.qty_is_editable)
    ))
), [bundledOptions]);
