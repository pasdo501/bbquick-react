import React from "react";

import { Transition } from "react-transition-group";

const duration = 300;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

const ProductGalleryImages = ({ images, activeIndex }) => {
    return images.map((image, index) => {
        const active = index === activeIndex;
        const positionStyle = active 
            ? {}
            : {
                position: `absolute`,
                top: 0,
                left: 0
            }
        return (
            <Transition
                in={active}
                timeout={duration}
                key={image.id}
            >
                {(state) => (
                    <img
                        className="wp-post-image"
                        src={image.full_src}
                        srcSet={image.src_set}
                        sizes="(max-width: 510px) 100vw 510px"
                        width="510"
                        height="382"
                        alt={image.alt}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                            ...positionStyle
                        }}
                    />
                )}
            </Transition>
        );
    });
};

export default ProductGalleryImages;
