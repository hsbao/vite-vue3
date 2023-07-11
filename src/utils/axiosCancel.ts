import type { AxiosRequestConfig } from 'axios'

// 用于存储每个请求的标识和取消函数
const pendingMap = new Map<string, AbortController>()

const getPendingKey = (config: AxiosRequestConfig): string => {
  const { params } = config
  return [params.function, params.method].join('&')
}

export class AxiosCanceler {
  /**
   * 添加请求
   * @param config 请求配置
   */
  public addPending(config: AxiosRequestConfig): void {
    this.removePending(config)
    const key = getPendingKey(config)
    const controller = new AbortController()
    config.signal = config.signal || controller.signal
    // 如果请求接口不一样且当前请求不在等待中，将其添加到等待中
    if (!pendingMap.has(key)) {
      pendingMap.set(key, controller)
    }
  }

  /**
   * 清除所有等待中的请求
   */
  public removeAllPending(): void {
    pendingMap.forEach((abortController) => {
      if (abortController) {
        abortController.abort()
      }
    })
    this.reset()
  }

  /**
   * 移除请求
   * @param config 请求配置
   */
  public removePending(config: AxiosRequestConfig): void {
    const key = getPendingKey(config)
    if (pendingMap.has(key)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const abortController = pendingMap.get(key)
      if (abortController) {
        abortController.abort(key)
      }
      pendingMap.delete(key)
    }
  }

  /**
   * 重置
   */
  public reset(): void {
    pendingMap.clear()
  }
}
