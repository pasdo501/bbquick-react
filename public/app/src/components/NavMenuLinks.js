import React, { Component, Fragment, createRef } from "react";
import { Link } from "react-router-dom";
import Portal from "./Portal";

class NavMenuLinks extends Component {
    state = {
        portals: [],
        menuParents: null,
    };

    static getDerivedStateFromProps(props, state) {
        if (state.portals.length) {
            return null;
        }
        // Change ID to have mobile / normal differentiation
        const menuItems = document.querySelectorAll("[id^=js-menu-replace-]");

        const portals = [];
        const menuParents = [];

        if (menuItems) {
            menuItems.forEach((item, key) => {
                const parentEl = item.parentElement;
                menuParents.push(parentEl);
                parentEl.removeChild(item);

                // Strip any beans output HTML
                const linkTextClean = item.innerHTML.replace(/<!--.*?-->/g, "");
                // Strip leading domain stuff (get rid of http(s):// everything up to first slash)
                const link = "/" + item.href.replace(/http[s]?:\/\/.*?\//, "");

                portals.push(
                    <Portal key={`portal-${key}`} portalRoot={parentEl}>
                        <Link to={link}>{linkTextClean}</Link>
                    </Portal>
                );
            });
            return {
                portals,
                menuParents,
            };
        }
    }

    componentDidUpdate() {
        const { location } = this.props;
        const { menuParents } = this.state;

        menuParents.forEach((item) => {
            const { firstChild } = item;
            if (firstChild) {
                if (
                    location.pathname === firstChild.attributes.href.nodeValue
                ) {
                    item.classList.add("current-menu-item", "uk-active");
                } else {
                    item.classList.remove("current-menu-item", "uk-active");
                }
            }
        });
    }

    render() {
        const { portals } = this.state;
        return (
            <Fragment>{portals && portals.map((portal) => portal)}</Fragment>
        );
    }
}

export default NavMenuLinks;
