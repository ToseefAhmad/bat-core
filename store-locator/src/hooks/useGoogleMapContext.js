import {useContext} from 'react';

import {GoogleMapContext} from '../contexts';

export const useGoogleMapContext = () => useContext(GoogleMapContext);
