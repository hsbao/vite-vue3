<script setup lang="ts" name="Login">
  import { Unlock, User } from '@element-plus/icons-vue'

  import useUserStore from '@/store/modules/user'

  const formData = reactive({
    phone: '',
    ppwd: '',
    roleId: 4,
  })

  const loading = ref(false)

  const router = useRouter()
  const onClickLogin = () => {
    const userStore = useUserStore()
    loading.value = true
    userStore
      .login(formData)
      .then(() => {
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
          :model="formData"
          style="max-width: 460px"
        >
          <el-form-item label="账号">
            <el-input v-model="formData.phone" :maxlength="11" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formData.ppwd" show-password :prefix-icon="Unlock" />
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
