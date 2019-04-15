export const getSiblings = (node) => {
    const siblings = [...node.parentElement.children].filter(child => (
        child.nodeType === 1 && child !== node
    ));

    return siblings;
}