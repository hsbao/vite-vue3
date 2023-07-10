<script setup lang="ts" name="Login">
  import { Unlock, User } from '@element-plus/icons-vue'

  import { ACCESS_TOKEN } from '@/constants'
  import useUserStore from '@/store/modules/user'
  import storage from '@/utils/storage'

  const formLabelAlign = reactive({
    account: '',
    password: '',
  })

  const loading = ref(false)

  const router = useRouter()
  const onClickLogin = () => {
    const userStore = useUserStore()
    loading.value = true
    userStore
      .login()
      .then(() => {
        storage.setItem(ACCESS_TOKEN, 'test token')
        router.replace('/')
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<template>
  <div class="login-container flx-center">
    <div class="login-box">
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
          <el-button type="primary" :loading="loading" @click="onClickLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import url('./index.scss');
</style>
