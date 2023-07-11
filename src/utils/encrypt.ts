import CryptoJS from 'crypto-js'

const IV = '0102030405060708'
const KEY = 'szt2019123456789'

/**
 * 加密
 * @param word 需要加密的字符
 * @returns
 */
export const EncryptAES = (word: string) => {
  const keyed = CryptoJS.enc.Utf8.parse(KEY) // 加密秘钥
  const ived = CryptoJS.enc.Utf8.parse(IV) //  矢量
  const encryptResult = CryptoJS.AES.encrypt(word, keyed, {
    //  AES加密
    iv: ived,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7, // 后台用的是pad.Pkcs5,前台对应为Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encryptResult.ciphertext) // Base64加密;pt(word, key, iv)
}
