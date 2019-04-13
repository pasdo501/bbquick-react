// TODO: Replace this with a variable from somewhere else
const API_URL_BASE = 'http://leon.local/wp-json/custom/v1'

export const HOMEPAGE_IMAGES = `${API_URL_BASE}/homepage_images`;


export function getInitialData() {
    return fetch(HOMEPAGE_IMAGES).then((response) => {
        return response.json().then((data) => {
            return data;
        });
    });
}