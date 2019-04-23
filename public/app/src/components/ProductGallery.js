import React, { Component } from "react";
import "./ProductGallery.css";
import ProductGalleryImages from "./ProductGalleryImages";
import ProductGalleryThumbnails from "./ProductGalleryThumbnails";

class ProductGallery extends Component {
    state = {
        zoomImageVisible: false,
        x: 0,
        y: 0,
        activeImageIndex: 0,
    };
    wrapperRef = React.createRef();
    zoomRef = React.createRef();

    zoomFunction = (event) => {
        console.log(event);
    };

    showZoomImage = () => {
        this.setState({
            zoomImageVisible: true,
        });
    };

    hideZoomImage = () => {
        this.setState({
            zoomImageVisible: false,
        });
    };

    handleImageChange = (newIndex) => {
        this.setState({
            activeImageIndex: newIndex,
        });
    };

    zoomImageMove = (e) => {
        const zoomImageWidth = this.zoomRef.current.clientWidth;
        const zoomImageHeight = this.zoomRef.current.clientHeight;
        const wrapperWidth = this.wrapperRef.current.clientWidth;
        const wrapperHeight = this.wrapperRef.current.clientHeight;

        const xRatio = (zoomImageWidth - wrapperWidth) / wrapperWidth;
        const yRatio = (zoomImageHeight - wrapperHeight) / wrapperHeight;

        const container = this.wrapperRef.current.getBoundingClientRect();

        const x = (e.clientX - container.left) * xRatio;
        const y = (e.clientY - container.top) * yRatio;

        this.setState({
            x,
            y,
        });
    };

    render() {
        const { images } = this.props;
        const { zoomImageVisible, x, y, activeImageIndex } = this.state;

        return (
            <div
                className={`woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images`}
            >
                <div>
                    <figure className="woocommerce-product-gallery__wrapper">
                        <div
                            className="woocommerce-product-gallery__image"
                            style={{ position: `relative`, overflow: `hidden` }}
                            ref={this.wrapperRef}
                        >
                            <div
                                onMouseEnter={this.showZoomImage}
                                onMouseLeave={this.hideZoomImage}
                                onMouseMove={this.zoomImageMove}
                            >
                                <ProductGalleryImages
                                    images={images}
                                    activeIndex={activeImageIndex}
                                />
                                <img
                                    ref={this.zoomRef}
                                    className={`zoomImg${
                                        zoomImageVisible ? " active" : ""
                                    }`}
                                    alt={images[activeImageIndex].alt}
                                    src={images[activeImageIndex].full_src}
                                    style={{
                                        top: -y,
                                        left: -x,
                                    }}
                                />
                            </div>
                        </div>
                    </figure>
                </div>
                {images.length > 1 ? (
                    <ProductGalleryThumbnails
                        images={images}
                        activeIndex={activeImageIndex}
                        handleChange={this.handleImageChange}
                    />
                ) : null}
            </div>
        );
    }
}

export default ProductGallery;
