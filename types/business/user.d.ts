/**
 * 用户模块相关的ts
 */
declare namespace User {
  /** 登录 */
  interface ILoginData {
    /** 手机号码 */
    phone: string
    /** 密码 */
    ppwd: string
    /** 角色id */
    roleId?: number
  }

  /** 登录成功参数 */
  interface ILoginResp {
    /** 添加时间 */
    addTime: string
    /** 用户认证状态，0：未认证。1：认证成功 */
    authState: number
    /** 生日 */
    birthday: string
    /** 头像信息，存URL */
    headImgPath: string
    /** 登录次数 */
    loginAmount: number
    /** 后台登录用户UID */
    manageUid: number
    /** 姓名 */
    name: string
    /** 用户应用CID，移动应用消息push使用 */
    orgUserCid: string
    /** 手机号码，AES 加解密  */
    phone: string
    /** 手机号码登录密码，SHA1 单向加密 */
    ppwd: string
    /** 物业公司唯一编号 */
    propertyCompanyUid: number
    /** 角色列表 */
    roleList: RoleList[]
    /** 评价得分 */
    score: string
    /** 性别 */
    sex: number
    /** 状态，1-正常。9：锁定（禁用）。0：删除 */
    state: number
    /** token */
    token: string
    /** 最后更新时间 */
    updateTime: string
    /** 手机号码登录密码，SHA1 单向加密，手机号码登录密码，SHA1 单向加密 */
    userType: number
    /** 工号 */
    workId: string
    /**
     * 店铺权限列表
     */
    shopAuthList: ShopAuthList[]
  }
}
