const apiUrl = window.bbq_react_data.rest_base;
window.bbq_react_data = null;

export const getWcData = async () => {
    const url = `${apiUrl}/wc-data`;
    const response = await fetch(url);
    if (response.ok) {
        const body = await response.json();

        return body;
    }

    return false;
}