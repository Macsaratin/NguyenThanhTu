import httpAxios from "./HTTPaxios";

const ProductService = {
    getList: async () => {
        return await httpAxios.get('/product', { timeout: 10000, });
    },
    getDetail: async (id) => {
        const response = await httpAxios.get(`/products/${id}`);

        return response.data; // Adjust according to your API response structure
    },
}
export default ProductService;