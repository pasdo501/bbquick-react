import React from "react";

const ProductWrapper = ({ children, id, name }) => (
    <article className={`uk-article uk-panel-box post-${id} type-product`}>
        <header>
            <h1
                className="h2 page-title"
                itemProp="headline"
                dangerouslySetInnerHTML={{ __html: name }}
            />
        </header>
        <div itemProp="articleBody">
            <div className="tm-article-content" itemProp="text">
                <div className="woocommerce">
                    <div className="product single-product">{children}</div>
                </div>
            </div>
        </div>
    </article>
);

export default ProductWrapper;
