import WooCommerceAPI from "woocommerce-api";

const api = new WooCommerceAPI({
    url: 'http://bbquick.local',
    consumerKey: 'ck_7055f7b3cef11dbc488acdb02457727a6215e86c',
    consumerSecret: 'cs_1cf278cdbe83bdbd5245ce808ec1eefa664ebb87',
    wpAPI: true,
    version: 'wc/v3'
});

export const getProducts = async () => {
    const response = await api.getAsync('products?per_page=100');

    return JSON.parse(response.body);
}

export const getCategories = async () => {
    const response = await api.getAsync('products/categories?per_page=100');
    
    return JSON.parse(response.body);
}