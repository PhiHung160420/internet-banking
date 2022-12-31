import axiosClient from "../axiosClient"

const url = "/auth"
export const authAPI = {
    
    refreshToken: async (data) => {
        const url = "/auth/token/refresh"
        const response = await axiosClient.post(url, data)
        return response
    }
}