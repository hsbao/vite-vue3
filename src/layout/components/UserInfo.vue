<script setup lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus'

  import { logout } from '@/api/user'
  import { ACCESS_TOKEN } from '@/constants'
  import { resetRouter } from '@/router'
  import storage from '@/utils/storage'

  const router = useRouter()

  const handleLogout = () => {
    ElMessageBox.confirm('您确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        logout().then(() => {
          ElMessage.success('退出登录成功')
          storage.removeItem(ACCESS_TOKEN)
          resetRouter()
          router.replace({ name: 'Login' })
        })
      })
      .catch(() => {
        console.log('cancel')
      })
  }
</script>

<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/images/avatar.png" />
      <span>admin</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon><Edit /></el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item divided @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .avatar {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
    }

    span {
      margin-left: 6px;
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
  }
</style>
