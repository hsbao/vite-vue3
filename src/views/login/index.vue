<script setup lang="ts" name="Login">
  import { Unlock, User } from '@element-plus/icons-vue'

  import { ACCESS_TOKEN } from '@/constants'
  import storage from '@/utils/storage'

  const formLabelAlign = reactive({
    account: '',
    password: '',
  })

  const router = useRouter()
  const onClickLogin = () => {
    storage.setItem(ACCESS_TOKEN, 'test token')
    router.replace({ path: '/' })
  }
</script>

<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left2.png" alt="login" />
      </div>

      <div class="login-form">
        <el-form
          label-position="top"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
        >
          <el-form-item label="账号">
            <el-input v-model="formLabelAlign.account" :maxlength="11" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="formLabelAlign.password"
              show-password
              :prefix-icon="Unlock"
            />
          </el-form-item>
        </el-form>

        <div class="button-wrap">
          <el-button>重置</el-button>
          <el-button type="primary" @click="onClickLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import url('./index.scss');
</style>
