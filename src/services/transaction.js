import { request } from '~/utils/Request';

export const transactionRequest = {
    createTransaction: (body) => {
        return request({
            method: 'POST',
            url: '/transactions',
            body: {
                ...body,
            },
        });
    },
};
