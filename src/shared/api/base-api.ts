import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { TOKEN } from "shared/constants/env"


const clientApi = axios.create({
	baseURL: "https://orzumedbackend-production.up.railway.app",
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
