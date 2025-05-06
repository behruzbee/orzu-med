import { apiKeys } from "shared/constants/api-keys"
import clientApi from "shared/api/base-api"
import { ServerResponseType } from "shared/types/response-data"
import { IUser } from "../model/types"

export const getUsersApi = async (): ServerResponseType<IUser[]> => {
	const response = await clientApi.get(`${apiKeys.getUsers}`)
	return response.data
}

export const getUserApi = async (id: number): ServerResponseType<IUser> => {
	const response = await clientApi.get(`${apiKeys.getUser}/${id}`)
	return response.data
}
export const createUserApi = async (user: Omit<IUser, 'id'>): ServerResponseType<IUser> => {
	const response = await clientApi.post(`${apiKeys.createUser}`, user)
	return response.data
}

export const updateUserApi = async (user: Partial<IUser>): ServerResponseType<IUser> => {
	const response = await clientApi.put(`${apiKeys.updateUser}/${user.id}`, user)
	return response.data
}

export const deleteUserApi = async (id: number): ServerResponseType<void> => {
	const response = await clientApi.delete(`${apiKeys.deleteUser}/${id}`)
	return response.data
}