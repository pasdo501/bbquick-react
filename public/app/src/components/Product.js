import React from "react";

const Product = ({ match, products }) => {
    const productSlug = match.params.slug;

    const product = products.find(product => product.slug === productSlug);

    console.log(product);
    return (
        <div>
            <div>Product Name: {product.name}</div>
            <img src={product.images[0].src} alt={product.images[0].alt} />
            
        </div>
    )
}

export default Product;