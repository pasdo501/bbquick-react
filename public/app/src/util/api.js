import queryString from "query-string";

const apiUrl = window.bbq_react_data.rest_base;
window.bbq_react_data.rest_base = null;

export const getWcData = async () => {
    const url = `${apiUrl}/wc-data`;
    const response = await fetch(url);
    if (response.ok) {
        const body = await response.json();

        return body;
    }

    return false;
};

const formatReviews = (reviews) => {
    const topLevel = [];
    const children = [];

    [...reviews].forEach((review) => {
        if (review.parent === "0") {
            topLevel.push(review);
        } else {
            children.push(review);
        }
    });

    children.forEach((child) => {
        let parent = topLevel.find((review) => review.id === child.parent);
        if (!parent) {
            parent = children.find((review) => review.id === child.parent);
        }

        if (parent) {
            if (parent.children) {
                parent.children.push(child);
            } else {
                parent.children = [child];
            }
        }
    });

    return topLevel;
};

export const getReviews = async (productId, moderationHash = null, unapprovedId = null) => {
    let url = `${apiUrl}/reviews/${productId}`;
    if (moderationHash && unapprovedId) {
        url += `?unapproved=${unapprovedId}&moderation-hash=${moderationHash}`;
    }

    const response = await fetch(url);
    if (response.ok) {
        const body = await response.json();

        if ( body.reviews_data && body.reviews_data !== 404) {
            body.reviews_data = body.reviews_data.sort((a, b) => (
                a.timestamp - b.timestamp
            ))
            
            body.reviews_data = formatReviews(body.reviews_data);
        }

        return body;
    }

    return false;
};

export const postReview = async ({
    author,
    email,
    rating,
    comment,
    comment_post_ID,
    comment_parent,
    akismet_comment_nonce
}) => {
    const url = `${window.bbq_react_data.wp_url}/wp-comments-post.php`;
    const payload = {
        author,
        email,
        rating,
        comment,
        comment_post_ID,
        comment_parent,
        // Keep Akismet happy
        akismet_comment_nonce
    };

    const data = new FormData();
    Object.keys(payload).forEach((key) => {
        if (key === "rating" && payload[key] === "") {
            return;
        }

        data.append(key, payload[key]);
    });

    const response = await fetch(url, {
        method: "POST",
        body: data,
    });

    const {
        "moderation-hash": moderationHash,
        "unapproved": unapprovedId,
    } = queryString.parse(queryString.extract(response.url));

    const success = response.ok ? true : false;

    return {
        success,
        statusText: response.statusText,
        moderationHash,
        unapprovedId,
    };
};
