import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Portal from "./Portal";

class Breadcrumbs extends Component {
    state = {
        portalRoot: null,
    };

    componentDidMount() {
        const portalRoot = document.getElementById("breadcrumb-list");

        if (portalRoot) {
            while (portalRoot.firstChild) {
                portalRoot.removeChild(portalRoot.firstChild);
            }

            this.setState({
                portalRoot,
            });
        }
    }

    render() {
        const { portalRoot } = this.state;
        const { type, category } = this.props;

        return portalRoot ? (
            <Portal portalRoot={portalRoot}>
                <li>
                    <a href={window.bbq_react_data.wp_url}>Home</a>
                </li>
                {type === "shop" ? (
                    <li className="uk-active">Shop</li>
                ) : (
                    <Fragment>
                        <li>
                            <Link to="/shop/">Shop</Link>
                        </li>
                        {type === "category" ? (
                            <li className="uk-active">{category.name}</li>
                        ) : (
                            <li>
                                <Link to={`/meal-category/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </li>
                        )}
                    </Fragment>
                )}
            </Portal>
        ) : null;
    }
}

export default Breadcrumbs;
