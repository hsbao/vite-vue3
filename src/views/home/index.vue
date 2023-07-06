<script setup lang="ts"></script>

<template>
  <div class="home-page">
    <img src="@/assets/images/home-img.png" alt="" />
    <span>页面建设中敬请期待…</span>
  </div>
</template>

<style lang="scss" scoped>
  .home-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 8px;

    img {
      width: 200px;
      height: 200px;
    }

    span {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: rgb(51 51 51 / 60%);
    }
  }
</style>
