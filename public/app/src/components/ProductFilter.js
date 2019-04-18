import React, { Component } from "react";
import "./ProductFilter.css";

class ProductFilter extends Component {
    state = {
        visible: false,
        filters: {},
    };

    componentDidMount() {
        // Initialise filters with already existing selection
        const filters = {};
        this.props.filters.forEach(filter => {
            filters[filter] = 1;
        });

        this.setState({
            filters
        });
    }

    toggleSelect = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    handleFilterCheck = (id) => {
        const { filters } = this.state;
        const filtersClone = { ...filters };

        if (filtersClone[id]) {
            delete filtersClone[id];
        } else {
            filtersClone[id] = 1;
        }

        this.setState({
            filters: filtersClone,
        });
    };

    filtersUnchanged = (prev, next) => {
        return (
            next.length === prev.length &&
            next.every((value, index) => value === prev[index])
        );
    };

    componentDidUpdate(prevProps, prevState) {
        const nextFilters = Object.keys(this.state.filters);
        const prevFilters = Object.keys(prevState.filters);

        if (!this.filtersUnchanged(prevFilters, nextFilters)) {
            // Trigger update
            this.props.handleUpdate(nextFilters);
        }
    }

    render() {
        const { visible, filters } = this.state;

        const validCategories = [];
        Object.keys(this.props.categories).forEach((key) => {
            const category = this.props.categories[key];

            if (category.parent !== 0) {
                validCategories.push(category);
            }
        });

        return (
            <div className="mulitselect uk-margin-bottom">
                <div className="selectBox" onClick={this.toggleSelect}>
                    <select>
                        <option>Product Filters{Object.keys(filters).length ? `  (${Object.keys(filters).length} selected)` : ''}</option>
                    </select>
                    <div className="overSelect" />
                </div>
                {visible && (
                    <div className="checkboxes-container">
                        <div className="checkboxes">
                            <div className="checkboxes-inner">
                                {validCategories.length && (
                                    <div>
                                        <span className="filter-heading">
                                            Categories
                                        </span>
                                        {validCategories.map((category) => (
                                            <label
                                                htmlFor={category.id}
                                                key={category.id}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={category.id}
                                                    onChange={() =>
                                                        this.handleFilterCheck(
                                                            category.id
                                                        )
                                                    }
                                                    checked={
                                                        filters[category.id]
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <span className="filter-name">
                                                    {category.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                <div>
                                    <span className="filter-heading">
                                        Ingredients
                                    </span>
                                    <label htmlFor="three">
                                        <input type="checkbox" id="three" />
                                        <span> First checkbox</span>
                                    </label>
                                    <label htmlFor="four">
                                        <input type="checkbox" id="four" />
                                        <span> Second checkbox</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ProductFilter;
