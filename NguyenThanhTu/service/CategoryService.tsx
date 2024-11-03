import httpAxios from "./HTTPaxios";

const CategoryService = {
    getList: async () => {
        return await httpAxios.get('/category', { timeout: 1000, });
    },

}
export default CategoryService;