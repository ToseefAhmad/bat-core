import React from 'react';
import ReactPaginate from 'react-paginate';

type Props = {
    itemsPerPage: number,
    itemsCount: number,
    onPageChange: Function
};

const PAGE_RANGE_DISPLAYED = 2;
const MARGIN_PAGES_DISPLAYED = 0;

export function PaginationComponent(props: Props) {
    const {
        itemsPerPage,
        itemsCount,
        onPageChange,
        ...other
    } = props;

    const pageCount = Math.ceil(itemsCount / itemsPerPage);

    return (
        <ReactPaginate breakLabel="..."
                       breakClassName="pagination-component-break"
                       pageClassName="pagination-component-item"
                       previousClassName="pagination-component-previous"
                       previousLinkClassName="pagination-component-previous-link"
                       nextClassName="pagination-component-next"
                       nextLinkClassName="pagination-component-next-link"
                       previousLabel=""
                       nextLabel=""
                       pageCount={pageCount}
                       marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
                       pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
                       onPageChange={onPageChange}
                       containerClassName="pagination-component"
                       activeClassName="active"
                       {...other}/>
    );
}
