import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Portal from "./Portal";

import { getSiblings } from "../util/helpers";

class NavMenuLinks extends Component {

    componentWillMount() {
        // Change ID to have mobile / normal differentiation
        const menuItems = document.querySelectorAll('[id^=js-menu-replace-]');

        this.portals = [];

        if (menuItems) {
            menuItems.forEach((item, key) => {
                const parentEl = item.parentElement;
                parentEl.removeChild(item);
        
                parentEl.addEventListener('click', (e) => {
                    // Switch Active Menu Item on click
                    const curr = e.currentTarget;
                    const siblings = getSiblings(curr);
        
                    curr.classList.add('current-menu-item', 'uk-active');
                    siblings.forEach(node => {
                    node.classList.remove('current-menu-item', 'uk-active');
                    })
                });
        
                // Strip any beans output HTML
                const linkTextClean = item.innerHTML.replace(/<!--.*?-->/g, '');
                // Strip leading domain stuff (get rid of http(s):// everything up to first slash)
                const link = '/' + item.href.replace(/http[s]?:\/\/.*?\//, '');
        
                this.portals.push(
                    <Portal key={`portal-${key}`} portalRoot={parentEl}>
                        <Link to={link}>
                            {linkTextClean}
                        </Link>
                    </Portal>
                );
            })
        }
    }

    render() {
        return (
            <Fragment>
                {this.portals && this.portals.map(portal => (
                    portal
                ))}
            </Fragment>
        )
    }
}

export default NavMenuLinks;