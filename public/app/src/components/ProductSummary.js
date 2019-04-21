import React from "react";

const ProductSummary = ({ product }) => {
    const {
        id,
        name,
        rating_count,
        rating_html,
        price_html,
        short_description,
    } = product;
    return (
        <div className="summary entry-summary">
            {rating_count > 0 && (
                <div className="woocommerce-product-rating">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: rating_html,
                        }}
                    />
                    <div className="woocommerce-review-link">
                        ({rating_count} customer reviews MAKE ME A LINK)
                    </div>
                </div>
            )}
            <p
                className="price"
                dangerouslySetInnerHTML={{
                    __html: price_html,
                }}
            />
            <p
                className="woocommerce-product-details__short-description"
                dangerouslySetInnerHTML={{ __html: short_description }}
            />
            <div className="uk-flex uk-flex-left uk-flex-middle cart">
                <div className="quantity">
                    <label
                        className="screen-reader-text"
                        htmlFor={`quantity_${id}`}
                    >
                        Quantity
                    </label>
                    <select
                        id={`quantity_${id}`}
                        className="input-text qty text"
                        name="quantity"
                        title="Qty"
                        aria-labelledby={name}
                    >
                        <option value="1">1</option>
                    </select>
                </div>
                <a
                    className="button ajax_add_to_cart"
                    href={`?add-to-cart=${id}`}
                    onClick={() => console.log("clicked")}
                    rel="nofollow"
                >
                    Add to Cart
                </a>
            </div>
        </div>
    );
};

export default ProductSummary;
