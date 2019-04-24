import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, customPostFix, children }) => (
    <Helmet>
        <title>
            {title}
            {customPostFix
                ? customPostFix
                : " - Nationwide Honest Natural Frozen Meal Delivery"}
        </title>
        {children}
    </Helmet>
);

export default SEO;
