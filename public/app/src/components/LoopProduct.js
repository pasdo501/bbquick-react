import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";

class LoopProduct extends Component {
    state = {
        quantity: "1",
        quantityOptions: ["1"],
        adding: false,
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

    componentWillUnmount() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
    }

    handleChange = (event) => {
        this.setState({
            quantity: event.target.value,
        });
    };

    addToCart = async (e) => {
        e.preventDefault();
        e.persist();
        if (this.state.adding) {
            return;
        }
        this.setState({
            adding: true,
        });

        const thisButton = e.target;

        thisButton.classList.remove("added");
        thisButton.classList.add("loading");

        const { id, sku } = this.props.meal;
        const { quantity } = this.state;

        const payload = {
            product_id: id,
            product_sku: sku,
            quantity,
        };

        const data = new FormData();
        Object.keys(payload).forEach((key) => {
            data.append(key, payload[key]);
        });

        document.dispatchEvent(
            new CustomEvent("adding_to_cart", [thisButton, payload])
        );

        const url = window.wc_add_to_cart_params.wc_ajax_url
            .toString()
            .replace("%%endpoint%%", "add_to_cart");

        const response = await fetch(url, {
            method: "POST",
            body: data,
        });

        if (!response) {
            this.adding = false;
            return;
        }

        if (response.ok) {
            const responseBody = await response.json();
            const addedEvent = new CustomEvent("added_to_cart", [
                response.fragments,
                response.cart_hash,
                thisButton,
            ]);
            document.body.dispatchEvent(addedEvent);
            thisButton.classList.remove("loading");
            if (! responseBody.error) {
                thisButton.classList.add("added");

                if (this.timeout) {
                    window.clearTimeout(this.timeout);
                }
                this.timeout = window.setTimeout(() => {
                    thisButton.classList.remove("added");
                }, 5000);
            }
        } else {
            thisButton.classList.remove("loading");
        }

        this.setState({
            adding: false,
        });
    };

    render() {
        const { quantity, quantityOptions } = this.state;
        const {
            id,
            name,
            slug,
            rating_html,
            price_html,
            images,
        } = this.props.meal;
        const productBase = window.bbq_react_data.product_base;

        return (
            <Fragment>
                <Link
                    to={`${productBase}/${slug}`}
                    dangerouslySetInnerHTML={{
                        __html: images.loop_image,
                    }}
                />
                <div className="uk-flex uk-flex-column uk-flex-space-between loop-meta">
                    <Link to={`${productBase}/${slug}`}>
                        <h2 className="woocommerce-loop-product__title" dangerouslySetInnerHTML={{ __html: name }} />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: rating_html,
                            }}
                        />
                        <span
                            className="price"
                            dangerouslySetInnerHTML={{
                                __html: price_html,
                            }}
                        />
                    </Link>
                </div>
                <div className="uk-flex uk-flex-left uk-flex-middle cart">
                    <div className="quantity">
                        <label
                            className="screen-reader-text"
                            htmlFor={`quantity_${id}`}
                        >
                            Quantity
                        </label>
                        <select
                            id={`quantity_${id}`}
                            className="input-text qty text"
                            name="quantity"
                            title="Qty"
                            aria-labelledby={name}
                            value={quantity}
                            onChange={this.handleChange}
                        >
                            {quantityOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <a
                        className="button ajax_add_to_cart"
                        href={`?add-to-cart=${id}`}
                        onClick={this.addToCart}
                        rel="nofollow"
                    >
                        Add
                    </a>
                </div>
            </Fragment>
        );
    }
}

export default LoopProduct;
