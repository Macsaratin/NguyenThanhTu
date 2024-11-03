import httpAxios from "./HTTPaxios";

const BannerService = {
    getList: async () => {
        return await httpAxios.get('/banner', { timeout: 1000, });
    },
}
export default BannerService;