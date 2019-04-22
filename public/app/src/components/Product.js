import React, { Fragment } from "react";

import ProductWrapper from "./ProductWrapper";
import ProductGallery from "./ProductGallery";
import ProductSummary from "./ProductSummary";
import ProductIngredients from "./ProductIngredients";
import RelatedProducts from "./RelatedProducts";
import Reviews from "./Reviews";

const Product = ({ match, products }) => {
    const productSlug = match.params.slug;

    const product = products.find((product) => product.slug === productSlug);
    const relatedIds = product.related_products.map((id) =>
        Number.parseInt(id)
    );
    const relatedProducts = products.filter((product) =>
        relatedIds.includes(product.id)
    );

    const images = product.images.single_product;

    return (
        <Fragment>
            <ProductWrapper id={product.id} name={product.name}>
                <div className="bbquick-product-wrapper">
                    <ProductGallery images={images} />
                    <ProductSummary product={product} />
                    <ProductIngredients ingredients={product.ingredients} />
                </div>
                <RelatedProducts products={relatedProducts} />
            </ProductWrapper>
            <Reviews id={product.id} reviewCount={product.rating_count} />
        </Fragment>
    );
};

export default Product;
