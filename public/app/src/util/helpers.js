export const getSiblings = (node) => {
    const siblings = [...node.parentElement.children].filter(
        (child) => child.nodeType === 1 && child !== node
    );

    return siblings;
};

/**
 * Check if a given input is valid. Valid in this case means just if the
 * string contains characters (excluding leading / trailing whitespace).
 *
 * @param {string} input
 *
 * @return {boolean} True if valid; otherwise False
 */
export const validateText = (input) => {
    return String(input).trim().length > 0;
};

/**
 * Check if a given email address is valid, by doing a simple regex comparison.
 *
 * @param {string} input
 *
 * @return {boolean} True if valid; otherwise False
 */
export const validateEmail = (input) => {
    // HTML5 email regex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(String(input).toLowerCase());
};
