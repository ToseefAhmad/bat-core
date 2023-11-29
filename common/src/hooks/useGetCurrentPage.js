import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';

import {parse} from 'query-string';

const getCurrentPage = ({search}) => {
    const {page} = parse(search);
    const isValidPage = !!page && page >= 1;

    return isValidPage ? +page : 1;
};

export function useGetCurrentPage() {
    const location = useLocation();

    const [visiblePage, setVisiblePage] = useState(() => getCurrentPage(location));

    useEffect(() => {
        const currentPage = getCurrentPage(location);

        if (visiblePage === currentPage) return;

        setVisiblePage(currentPage);
    }, [location]);

    return {visiblePage, setVisiblePage};
}
