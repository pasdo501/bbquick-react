import React from "react";

const Product = (props) => {
    const { match, products } = props;
    const productSlug = match.params.slug;

    const product = products.find(product => product.slug === productSlug);

    return (
        <div>
            <div>Product Name: {product.name}</div>
            <img src={product.images[0].src} alt={product.images[0].alt} />
            
        </div>
    )
}

export default Product;