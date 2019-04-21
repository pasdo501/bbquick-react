import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Heading = ({ children }) => (
    <p className="ingredients">
        <strong>Includes</strong>
        {children}
    </p>
);

const ProductIngredients = ({ ingredients }) => {
    switch (typeof ingredients) {
        case "object":
            return Array.isArray(ingredients) && ingredients.length ? (
                <Fragment>
                    <Heading />
                    <ul className="bundle-list">
                        {ingredients.map((product) => (
                            <li key={product.id}>
                                <Link
                                    to={`${
                                        window.bbq_react_data.product_base
                                    }/${product.slug}`}
                                >
                                    {product.quantity > 1 && (
                                        <Fragment>
                                            <strong>{product.quantity}</strong>x{" "}
                                        </Fragment>
                                    )}
                                    {product.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            ) : null;
        case "string":
            return (
                <Fragment>
                    <Heading>
                        <br />
                        {ingredients}
                    </Heading>
                </Fragment>
            );
        default:
            return null;
    }
};

export default ProductIngredients;
