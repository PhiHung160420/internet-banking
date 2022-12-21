import { request } from '~/utils/Request';

export async function userSignup({ fullName, birthday, email, phoneNumber, address, password, roleCode }) {
    return request({
        method: 'POST',
        url: '/users',
        body: {
            fullName,
            birthday,
            email,
            phoneNumber,
            address,
            password,
            roleCode,
        },
    });
}

export async function userLogin({ email, password }) {
    return request({
        method: 'POST',
        url: '/auth/login',
        body: {
            email,
            password,
        },
    });
}
