import React, { Component } from "react";

const fadeIn = {
    opacity: 0,
};

const visible = {
    transition: `opacity 0.5s ease-in`,
    opacity: 1,
};

class ProductWrapper extends Component {
    state = {
        visible: false
    }

    componentDidMount() {
        this.timeout = window.setTimeout(() => {
            window.scrollTo(0, 0);
            this.setState({
                visible: true
            })
        });
    }

    componentWillUnmount() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
    }

    render() {
        const { children, id, name } = this.props;

        return (
            <article
                className={`uk-article uk-panel-box post-${id} type-product`}
                style={this.state.visible ? visible : fadeIn}
            >
                <header>
                    <h1
                        className="h2 page-title"
                        itemProp="headline"
                        dangerouslySetInnerHTML={{ __html: name }}
                    />
                </header>
                <div itemProp="articleBody">
                    <div className="tm-article-content" itemProp="text">
                        <div className="woocommerce single-product">
                            <div className="product single-product">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default ProductWrapper;
