import React, { Component } from "react";
import "./ProductGallery.css";

class ProductGallery extends Component {
    state = {
        zoomImageVisible: false,
        throttle: null,
        x: 0,
        y: 0,
    };
    testRef = React.createRef();

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

    throttleMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        this.moveTest(x, y);
    };

    moveTest = (mouseX, mouseY) => {
        const container = this.testRef.current.getBoundingClientRect();
        const x = mouseX - container.left;
        const y = mouseY - container.top;

        this.setState({
            x,
            y,
        });
    };

    render() {
        const { images } = this.props;
        const { zoomImageVisible, x, y } = this.state;

        return (
            <div
                className={`woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images`}
            >
                <figure className="woocommerce-product-gallery__wrapper">
                    <div
                        className="woocommerce-product-gallery__image"
                        data-thumb="http://bbq-dev.siteisnot.live/wp-content/uploads/super_sampler_main_1-100x100.jpg"
                        style={{ position: `relative`, overflow: `hidden` }}
                        ref={this.testRef}
                    >
                        <div
                            onMouseEnter={this.showZoomImage}
                            onMouseLeave={this.hideZoomImage}
                            onMouseMove={this.throttleMove}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: images[0],
                                }}
                            />
                            <img
                                className={`zoomImg${
                                    zoomImageVisible ? " active" : ""
                                }`}
                                alt=""
                                src="http://bbq-dev.siteisnot.live/wp-content/uploads/super_sampler_main_1.jpg"
                                style={{
                                    top: -y,
                                    left: -x,
                                }}
                            />
                        </div>
                    </div>
                </figure>
            </div>
        );
    }
}

export default ProductGallery;
