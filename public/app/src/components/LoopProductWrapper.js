import React from "react";

import LoopProduct from "./LoopProduct";

const LoopProductWrapper = ({ products, columns }) => (
    <ul className={`products columns-${columns}`}>
        {products.map((product, index) => {
            const first = index % columns === 0 ? "first" : "";
            const last = (index + 1) % columns === 0 ? "last" : "";

            return (
                <li key={product.id} className={`product type-product status-publish ${last} ${first}`}>
                    <LoopProduct meal={product} />
                </li>
            )
        })}
    </ul>
);

export default LoopProductWrapper;