import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ resultCount, currentPage, perPage, path }) => {
    const totalPages = Math.ceil(resultCount / perPage);
    const firstPage = currentPage === 1;
    const lastPage = currentPage === totalPages;

    const pagesArray = [];
    for (let page = 1; page <= totalPages; page++) {
        pagesArray.push(page);
    }

    return (
        <nav className="woocommerce-pagination">
            <ul className="page-numbers">
                {firstPage || (
                    <li>
                        <Link to={`${path}?product-page=${currentPage - 1}`}>
                            ←
                        </Link>
                    </li>
                )}
                {pagesArray.map((page) => (
                    <li key={page}>
                        {page === currentPage ? (
                            <span className="current">{page}</span>
                        ) : (
                            <Link to={`${path}?product-page=${page}`}>
                                {page}
                            </Link>
                        )}
                    </li>
                ))}
                {lastPage || (
                    <li>
                        <Link to={`${path}?product-page=${currentPage + 1}`}>
                            →
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
