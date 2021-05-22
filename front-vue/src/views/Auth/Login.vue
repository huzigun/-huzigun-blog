<template>
  <div id="login_wrap">
    <div class="login_box">
      <form @submit.prevent="login">
        <div class="">
          <input type="text" v-model.trim="email" />
        </div>
        <div class="">
          <input type="text" v-model.trim="password" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Login-page',
  setup() {
    return {};
  },
  data() {
    return {
      userid: '',
      password: '',
      email: '',
    };
  },
  methods: {
    login() {
      axios
        .post('/auth/login', {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
});
</script>

<style scoped lang="scss">
#login_wrap {
  height: 100vh;
  .login_box {
    width: 327px;
  }
}
</style>
