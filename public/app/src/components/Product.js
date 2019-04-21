import React from "react";

import ProductWrapper from "./ProductWrapper";
import ProductGallery from "./ProductGallery";
import ProductSummary from "./ProductSummary";
import ProductIngredients from "./ProductIngredients";

const Product = ({ match, products }) => {
    const productSlug = match.params.slug;

    const product = products.find((product) => product.slug === productSlug);

    console.log(product);

    const images = product.images.single_product;

    return (
        <ProductWrapper id={product.id} name={product.name}>
            <ProductGallery images={images} />
            <ProductSummary product={product} />
            <ProductIngredients ingredients={product.ingredients} />
        </ProductWrapper>
    );
};

export default Product;
