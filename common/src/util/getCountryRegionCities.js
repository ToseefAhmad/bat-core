import {getCountryRegions} from '@luft/common';

export function getCountryRegionCities(countries, countryCode, selectedRegion) {
    if (!selectedRegion) {
        return [];
    }
    const regions = getCountryRegions(countries, countryCode);
    const region = regions.find((r) => r.code === selectedRegion);
    return region?.cities || [];
}
