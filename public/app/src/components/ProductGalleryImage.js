import React from "react";

const ProductGalleryImage = ({ image }) => (
    <img
        className="wp-post-image"
        srcSet={image.src_set}
        sizes="(max-width: 510px) 100vw 510px"
        width="510"
        height="382"
        alt={image.alt}
    />
);

export default ProductGalleryImage;
