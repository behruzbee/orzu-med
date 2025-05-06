import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { TOKEN } from "shared/constants/env"


const clientApi = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
})

clientApi.interceptors.request.use(
	<T>(config: InternalAxiosRequestConfig<T>) => {
		const authToken = Cookies.get(TOKEN.AUTH_TOKEN)
		config.headers["authorization"] = authToken ? `Bearer ${authToken}` : null
		return config
	},
)

clientApi.interceptors.response.use(<T>(response: AxiosResponse<T>) => {
	return response
})

export default clientApi
