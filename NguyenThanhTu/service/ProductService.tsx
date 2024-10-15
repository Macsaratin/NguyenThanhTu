import httpAxios from "./HTTPaxios";

const ProductService = {
    getList: async () => {
        return await httpAxios.get('/product');
    },
    getProductById: async (id: any) => {
        const response = await httpAxios.get(`/product/${id}`); // API lấy sản phẩm theo ID
        return response.data;
    },
}

export default ProductService;