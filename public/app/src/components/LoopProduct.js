import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";

class LoopProduct extends Component {
    render() {
        const { meal } = this.props;
        
        return (
            <Fragment>
                <Link
                    to={`${window.bbq_react_data.product_base}/${meal.slug}`}
                    dangerouslySetInnerHTML={{
                        __html: meal.images[0],
                    }}
                />
                <div className="uk-flex uk-flex-column uk-flex-space-between loop-meta">
                    <Link
                        to={`${window.bbq_react_data.product_base}/${
                            meal.slug
                        }`}
                    >
                        <h2 className="woocommerce-loop-product__title">
                            {meal.name}
                        </h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: meal.rating_html,
                            }}
                        />
                        <span
                            className="price"
                            dangerouslySetInnerHTML={{
                                __html: meal.price_html,
                            }}
                        />
                    </Link>
                </div>
                <div className="uk-flex uk-flex-left uk-flex-middle cart">
                    <div>Quantity</div>
                    <div>Add</div>
                </div>
            </Fragment>
        );
    }
}

export default LoopProduct;
