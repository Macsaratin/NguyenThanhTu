import httpAxios from "./HTTPaxios";

const BrandService = {
    getList: async () => {
        return await httpAxios.get('/brand', { timeout: 2000, });
    },
}
export default BrandService;