import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";

class LoopProduct extends Component {
    state = {
        quantity: "1",
        quantityOptions: ["1"],
    };

    componentDidMount() {
        const maxQuantity = 30;
        const quantityOptions = [];
        for (let i = 1; i <= maxQuantity; i++) {
            quantityOptions.push(i.toString());
        }

        this.setState({
            quantityOptions,
        });
    }

    handleChange = (event) => {
        this.setState({
            quantity: event.target.value
        })
    }


    render() {
        const { quantity, quantityOptions } = this.state;
        const { meal } = this.props;
        const productBase = window.bbq_react_data.product_base;

        return (
            <Fragment>
                <Link
                    to={`${productBase}/${meal.slug}`}
                    dangerouslySetInnerHTML={{
                        __html: meal.images[0],
                    }}
                />
                <div className="uk-flex uk-flex-column uk-flex-space-between loop-meta">
                    <Link to={`${productBase}/${meal.slug}`}>
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
                    <div className="quantity">
                        <label
                            className="screen-reader-text"
                            htmlFor={`quantity_${meal.id}`}
                        >
                            Quantity
                        </label>
                        <select
                            id={`quantity_${meal.id}`}
                            className="input-text qty text"
                            name="quantity"
                            title="Qty"
                            aria-labelledby={meal.name}
                            value={quantity}
                            onChange={this.handleChange}
                        >
                            {quantityOptions.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="button">
                        Add
                    </button>
                </div>
            </Fragment>
        );
    }
}

export default LoopProduct;
