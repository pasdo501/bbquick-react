import React from "react";

import LoopProductWrapper from "./LoopProductWrapper";

const RelatedProducts = ({ products }) => (products.length ? (
    <section className="related products">
        <h2>Related products</h2>
        <LoopProductWrapper products={products} columns={4} />
    </section>
) : null);

export default RelatedProducts;
