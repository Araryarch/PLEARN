import api from './api'

type Method = 'get' | 'post' | 'patch'

interface RequestOptions {
  endpoint: string
  method: Method
  data?: Record<string, unknown>
  params?: Record<string, unknown>
}

export const apiRequest = async <T>({
  endpoint,
  method,
  data,
  params,
}: RequestOptions): Promise<T> => {
  const response = await api.request<T>({
    url: endpoint,
    method,
    data,
    params,
  })

  return response.data
}
