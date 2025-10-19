import axios, { AxiosError } from 'axios'
import { UninterceptedApiError } from '@/types/api'

const baseURL =
  process.env.NEXT_PUBLIC_RUN_MODE === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<UninterceptedApiError>) => {
    const rawMessage = error.response?.data?.message
    const message =
      typeof rawMessage === 'string'
        ? rawMessage
        : (Object.values(rawMessage ?? {})[0]?.[0] ?? 'Terjadi kesalahan')

    return Promise.reject({
      ...error,
      response: {
        ...error.response,
        data: {
          ...error.response?.data,
          message,
        },
      },
    })
  },
)

export default api
