import request from '@/utils/request'

/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: User.ILoginData) => {
  return request.post<User.ILoginResp>({
    data,
    params: {
      function: 'account',
      method: 'scWebUserLogin',
      isEncrypt: 1,
    },
  })
}

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return request.post({
    params: {
      function: 'account',
      method: 'scWebUserLogout',
    },
  })
}
