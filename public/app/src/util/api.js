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

export const getReviews = async (productId) => {
    const url = `${apiUrl}/reviews/${productId}`;
    const response = await fetch(url);
    if (response.ok) {
        const body = await response.json();

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
}) => {
    const url = `${window.bbq_react_data.wp_url}/wp-comments-post.php`;
    const payload = {
        author,
        email,
        rating,
        comment,
        comment_post_ID,
        comment_parent,
    };
    const data = new FormData();
    Object.keys(payload).forEach((key) => {
        data.append(key, payload[key]);
    });

    const response = await fetch(url, {
        method: "POST",
        body: data,
    });

    console.log(response);
    if (response.ok) {
        const body = await response.json();

        return body;
    }

    return false;
};
