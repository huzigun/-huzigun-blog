<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model.trim="userid" />
      <input type="text" v-model.trim="password" />
      <button type="submit">로그인</button>
    </form>
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
    };
  },
  methods: {
    login() {
      axios
        .get('/')
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

<style scoped></style>
