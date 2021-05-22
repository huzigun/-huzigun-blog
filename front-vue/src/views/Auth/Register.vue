<template>
  <div class="register_wrap">
    <h1 class="title">회원 가입하기</h1>
    <form class="register_form">
      <div class="register_box">
        <CustomInput v-model="email" label="이메일" id="emilInput" />
        <CustomInput label="닉네임" id="nicknameInput" />
        <CustomInput label="패스워드" type="password" id="passwordInput" />
        <button type="button" class="register_btn">다음으로</button>
      </div>
    </form>
    <div class="back_login">
      <span>이미 계정이 있으세요?</span>
      <router-link to="/auth/login">로그인</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomInput from '@/components/Entry/CustomInput.vue';

export default defineComponent({
  name: 'register-page',
  setup() {
    return {};
  },
  components: {
    CustomInput,
  },
  data() {
    return {
      email: '',
    };
  },
});
</script>

<style lang="scss" scoped>
.register_wrap {
  .title {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .register_desc {
    font-size: 13px;
    color: #606167;
  }
}
</style>
