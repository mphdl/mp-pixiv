<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"><router-link :to="{name:'Search'}">搜索</router-link></a-menu-item>
        <a-menu-item key="2"><router-link :to="{name:'Rank'}">排行榜</router-link></a-menu-item>
        <a-menu-item key="3"><router-link :to="{name:'Setting'}">设置</router-link></a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <keep-alive>
        <router-view />
      </keep-alive>
    </a-layout-content>
    <a-layout-footer style="text-align: center">Created by 好多梨</a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: "App",
}
</script>

<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
