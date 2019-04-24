import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

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
    const relatedIds = product.related_products.map((id) =>
        Number.parseInt(id)
    );
    const relatedProducts = products.filter((product) =>
        relatedIds.includes(product.id)
    );

    const images = product.images.single_product;

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{product.name}</title>
            </Helmet>
            <Breadcrumbs type="product" category={product.categories[0]} />
            <ProductWrapper id={product.id} name={product.name}>
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
                <RelatedProducts
                    key={`related-${product.id}`}
                    products={relatedProducts}
                />
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
