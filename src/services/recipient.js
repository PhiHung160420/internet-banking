import { request } from '~/utils/Request';

export async function createRecipientAccount(account, name) {
    return request({
        method: 'POST',
        url: '/recipient-accounts',
        body: {
            recipientAccountNumber: account,
            reminiscentName: name,
        },
    });
}

export async function updateRecipientAccount(id, account, name) {
  return request({
      method: 'PUT',
      url: `/recipient-accounts/${id}`,
      body: {
          recipientAccountNumber: account,
          reminiscentName: name,
      },
  });
}

export async function deleteRecipientAccount(id) {
    return request({
        method: 'DELETE',
        url: `/recipient-accounts/${id}`,
    });
  }

export async function getRecipientAccount() {
    return request({
        method: 'GET',
        url: '/recipient-accounts',
    });
}
