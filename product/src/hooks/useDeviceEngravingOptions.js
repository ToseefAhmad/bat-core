import {useQuery} from '@luft/apollo';

import DEVICE_ENGRAVING_QUERY from '../graphql/queries/DeviceEngravingOptions.query.graphql';

export function useDeviceEngravingOptions(options, query = DEVICE_ENGRAVING_QUERY) {
    return useQuery(query, options);
}
