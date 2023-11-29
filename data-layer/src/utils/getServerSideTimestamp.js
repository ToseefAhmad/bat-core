const SECOND = 1000;

export const getServerSideTimestamp = (timeZone: string) => {
    const currentDate = new Date();

    // Locale "en-US" does not really matter, it's needed only for correct parsing
    return Date.parse(currentDate.toLocaleString('en-US', {timeZone})) / SECOND;
};
