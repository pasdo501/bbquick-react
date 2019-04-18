import React from "react";

const SortDropdown = ({ value, handleChange }) => (
    <div className="woocommerce-ordering">
        <select
            className="orderby"
            name="orderby"
            value={value}
            onChange={handleChange}
        >
            <option value="default">Default sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="rating">Sort by average rating</option>
            <option value="latest">Sort by latest</option>
            <option value="price-asc">Sort by price: low to high</option>
            <option value="price-desc">Sort by price: high to low</option>
        </select>
    </div>
);

export default SortDropdown;
