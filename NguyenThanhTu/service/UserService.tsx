import httpAxios from "./HTTPaxios";

const UserService = {
    getList: async () => {
        return await httpAxios.get('/product', { timeout: 2000, });
    },
}
export default UserService;