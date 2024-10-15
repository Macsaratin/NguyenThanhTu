import httpAxios from "./HTTPaxios";

const BannerService = {
    getList: async () => {
        return await httpAxios.get('/banner');
    },
}

export default BannerService;