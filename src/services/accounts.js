import { request } from '~/utils/Request';

export const accountRequest = {
    getList: async (params) => {
        return request({
            method: 'GET',
            url: '/accounts',
            params,
        });
    },
    create: async (body) => {
        return request({
            method: 'POST',
            url: '/users',
            body,
        });
    },
};
