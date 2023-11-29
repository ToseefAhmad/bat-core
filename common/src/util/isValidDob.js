import {isValid, getYear} from 'date-fns';

const MAX_ALLOWED_YEAR = 100;

export const isValidDob = (date: string | Date) => {
    if (!isValid(date)) return false;

    const dateYear = getYear(new Date(date));
    const currentYear = getYear(new Date());

    if (dateYear > currentYear) return false;

    return currentYear - dateYear <= MAX_ALLOWED_YEAR;
};
