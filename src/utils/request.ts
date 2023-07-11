import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElNotification } from 'element-plus'

import { ACCESS_TOKEN } from '@/constants'

import { AxiosCanceler } from './axiosCancel'
import { EncryptAES } from './encrypt'
import { storage } from './storage'

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

interface IBaseResponse<T> {
  ret: number
  code: number
  msg: string
  message: string
  data: T
}

class HttpRequest {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.setupInterceptors()
  }

  /**
   * 获取 Axios 实例
   */
  public getAxiosInstance(): AxiosInstance {
    return this.instance
  }

  /**
   * 设置请求/响应拦截器
   */
  private setupInterceptors() {
    const axiosCanceler = new AxiosCanceler()

    /**
     * 请求拦截器
     */
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        axiosCanceler.addPending(config)

        const token = storage.getItem(ACCESS_TOKEN) || ''

        if (config?.params) {
          config.params['visitcode'] = config?.params?.visitcode || '2BVKUTFf2fKr3sjU'
        }

        if (token) {
          config.headers[ACCESS_TOKEN] = token
          if (config?.params) {
            config.params['token'] = token
          }
        }

        // 参数是否需要加密--isEncrypt:0：未加密，1：加密
        if (config?.params?.isEncrypt === 1 && config?.data) {
          config.headers['Content-Type'] = 'application/text'
          config.data = EncryptAES(JSON.stringify(config.data))
        }

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * 响应拦截
     */
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { ret, message } = response.data

        if (ret === 0) {
          ElNotification({
            title: '提示',
            message,
            type: 'error',
          })
        }

        if (ret === 9) {
          storage.removeItem(ACCESS_TOKEN)
          ElNotification({
            title: '提示',
            message,
            type: 'error',
          })
          axiosCanceler.removeAllPending()
        }

        return response
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  post<T>({
    url = '/service',
    data = {},
    params = {},
    config = {},
  }: {
    url?: string
    data?: object
    params?: object
    config?: object
  }): Promise<IBaseResponse<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, data, { ...config, params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default new HttpRequest(config)
