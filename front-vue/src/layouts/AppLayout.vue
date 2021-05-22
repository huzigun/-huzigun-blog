<template>
  <header id="header">
    <h1 class="logo">
      <router-link to="/">
        <img src="https://via.placeholder.com/117x24" alt="" />
      </router-link>
    </h1>
    <ul>
      <li><router-link to="/gallery">갤러리</router-link></li>
      <li><router-link to="/incruit">채용</router-link></li>
      <li><router-link to="/peed">피드</router-link></li>
      <li><router-link to="/inquery">의뢰하기</router-link></li>
    </ul>
    <ul>
      <li><router-link to="/auth/login">로그인</router-link></li>
      <li><router-link to="/auth/register">회원가입</router-link></li>
    </ul>
  </header>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'app-layout',
});
</script>

<style scoped>
.logo {
}
</style>
