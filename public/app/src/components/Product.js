import React, { Fragment } from "react";

import SEO from "./SEO";
import Breadcrumbs from "./Breadcrumbs";
import ProductWrapper from "./ProductWrapper";
import ProductGallery from "./ProductGallery";
import ProductSummary from "./ProductSummary";
import ProductIngredients from "./ProductIngredients";
import RelatedProducts from "./RelatedProducts";
import Reviews from "./Reviews";

const Product = ({ match, products }) => {
    const productSlug = match.params.slug;

    const product = products.find((product) => product.slug === productSlug);
    let relatedProducts;

    if (product.related_products) {
        const relatedIds = product.related_products.map((id) =>
            Number.parseInt(id)
        );
        relatedProducts = products.filter((product) =>
            relatedIds.includes(product.id)
        );
    } else {
        relatedProducts = null;
    }

    const images = product.images.single_product;

    // For SEO meta head link purposes
    const fullUrl = `${window.bbq_react_data.wp_url}${match.url}`;
    const encodedUrl = encodeURIComponent(fullUrl);

    return (
        <Fragment>
            <SEO title={product.name}>
                <link rel="canonical" href={fullUrl} />
                <link
                    rel="shortlink"
                    href={`${window.bbq_react_data.wp_url}/?p=${product.id}`}
                />
                <link
                    rel="alternate"
                    type="application/json+oembed"
                    href={`${
                        window.bbq_react_data.wp_url
                    }/wp-json/oembed/1.0/embed?url=${encodedUrl}`}
                />
                <link
                    rel="alternate"
                    type="text/xml+oembed"
                    href={`${
                        window.bbq_react_data.wp_url
                    }/wp-json/oembed/1.0/embed?url=${encodedUrl}&format=xml`}
                />
            </SEO>
            <Breadcrumbs type="product" category={product.categories[0]} />
            <ProductWrapper
                key={`wrapper-${product.id}`}
                id={product.id}
                name={product.name}
            >
                <div className="bbquick-product-wrapper">
                    <ProductGallery
                        key={`gallery-${product.id}`}
                        images={images}
                    />
                    <ProductSummary
                        key={`summary-${product.id}`}
                        product={product}
                    />
                    <ProductIngredients ingredients={product.ingredients} />
                </div>
                {relatedProducts && (
                    <RelatedProducts
                        key={`related-${product.id}`}
                        products={relatedProducts}
                    />
                )}
            </ProductWrapper>
            <Reviews
                key={`reviews-${product.id}`}
                id={product.id}
                reviewCount={product.rating_count}
            />
        </Fragment>
    );
};

export default Product;
