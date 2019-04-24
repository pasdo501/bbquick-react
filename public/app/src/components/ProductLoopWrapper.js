import React, { Component } from "react";

const fadeIn = {
    opacity: 0,
};

const visible = {
    transition: `opacity 0.5s ease-in`,
    opacity: 1,
};

class ProductLoopWrapper extends Component {
    state = {
        visible: false,
    };

    componentDidMount() {
        this.timeout = window.setTimeout(() => {
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
        const { categoryName, children } = this.props;

        return (
            <article
                className="uk-article uk-panel-box page type-page status-publish hentry"
                itemScope="itemscope"
                itemType="https://schema.org/CreativeWork"
                style={this.state.visible ? visible : fadeIn }
            >
                <header>
                    <h2 className="h2 page-title">{categoryName}</h2>
                </header>
                <div className="tm-article-content">{children}</div>
            </article>
        );
    }
}

export default ProductLoopWrapper;
