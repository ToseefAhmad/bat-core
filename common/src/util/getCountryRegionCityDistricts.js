import {getCountryRegionCities} from './getCountryRegionCities';

export function getCountryRegionCityDistricts(countries, countryCode, selectedRegion, selectedCity) {
    if (!selectedCity) {
        return [];
    }
    const cities = getCountryRegionCities(countries, countryCode, selectedRegion);
    const city = cities.find((c) => c.code === selectedCity);
    return city?.districts || [];
}
