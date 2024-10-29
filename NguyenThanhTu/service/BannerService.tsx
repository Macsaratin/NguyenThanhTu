import httpAxios from "./HTTPaxios";

const BannerService = {
    getList: async () => {
        return await httpAxios.get('/banner', { timeout: 10000, });
    },
}

export default BannerService;