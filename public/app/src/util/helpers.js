export const getSiblings = (node) => {
    const siblings = [...node.parentElement.children].filter(child => (
        child.nodeType === 1 && child !== node
    ));

    return siblings;
}

export function throttle (callback, delay) {
    let isThrottled = false, args, context;

    function wrapper() {
        if (isThrottled) {
            args = arguments;
            context = this;
            return;
        }

        isThrottled = true;
        callback.apply(this, arguments);

        setTimeout(() => {
            isThrottled = false;
            if (args) {
                wrapper.apply(context, args);
                args = context = null;
            }
        }, delay)
    }

    return wrapper;
}