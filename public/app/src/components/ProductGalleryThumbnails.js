import React from "react";

const ProductGalleryThumbnails = ({ images, activeIndex, handleChange }) => (
    <ol className="flex-control-nav flex-control-thumbs">
        {images.map((image, index) => (
            <li key={image.id}>
                <img
                    className={index === activeIndex ? "flex-active" : ""}
                    src={image.thumbnail_src}
                    alt={image.alt}
                    onClick={() => handleChange(index)}
                />
            </li>
        ))}
    </ol>
);

export default ProductGalleryThumbnails;
