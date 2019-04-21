import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import AddToCartButton from "./AddToCartButton";

const productBase = window.bbq_react_data.product_base;

const LoopProduct = ({ meal }) => {
    const { id, name, slug, sku, images, rating_html, price_html } = meal;
    return (
        <Fragment>
            <Link
                to={`${productBase}/${slug}`}
                dangerouslySetInnerHTML={{
                    __html: images.loop_image,
                }}
            />
            <div className="uk-flex uk-flex-column uk-flex-space-between loop-meta">
                <Link to={`${productBase}/${slug}`}>
                    <h2
                        className="woocommerce-loop-product__title"
                        dangerouslySetInnerHTML={{ __html: name }}
                    />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: rating_html,
                        }}
                    />
                    <span
                        className="price"
                        dangerouslySetInnerHTML={{
                            __html: price_html,
                        }}
                    />
                </Link>
            </div>
            <AddToCartButton id={id} name={name} sku={sku} />
        </Fragment>
    );
};

export default LoopProduct;
