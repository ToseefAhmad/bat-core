import type {CartItem} from '@luft/types';
import type {EngravedOptionsInfo} from '../product';

export type CartItemType = CartItem & {
    /**
     * Product engraving options information
     */
    engraved_options: EngravedOptionsInfo
}
