<template>
  <div id="auth">
    <div class="background_area" :style="{ backgroundImage: unsplash ? `url('${unsplash.urls?.regular}')` : '' }">
      <template v-if="unsplash">
        <div class="by_area">
          <router-link to="/" class="main_link">&lt; MAIN으로 돌아가기</router-link>
          <p class="photo_user">Photo by {{ unsplash.user.name }}</p>
        </div>
      </template>
    </div>
    <div class="form_area">
      <div class="form_wrap">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onBeforeMount, ref } from 'vue';

export default defineComponent({
  name: 'auth-layout',
  setup() {
    const unsplash = ref(null);
    const getUnsplash = () => {
      axios
        .get('https://api.unsplash.com/photos/random?orientation=portrait&query=nature', {
          withCredentials: false,
          headers: {
            Authorization: 'Client-ID IP2UpL2WAGYyn8t8IohoScc0s4OOGv6sBBP8z-nWDJ0',
          },
        })
        .then((res) => {
          unsplash.value = res.data;
        });
    };

    onBeforeMount(getUnsplash);

    return { unsplash, getUnsplash };
  },
});
</script>

<style lang="scss" scoped>
#auth {
  height: 100vh;
  display: flex;
  .background_area {
    flex: 1 0 auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba($color: #000000, $alpha: 0.6);
      z-index: 1;
    }

    .by_area {
      font-size: 11px;
      color: #fff;
      position: absolute;
      left: 5%;
      top: 20px;
      z-index: 2;
      display: flex;
    }

    .main_link {
      color: #fff;
      margin-right: 12px;
    }
  }

  .form_area {
    flex-basis: 60%;
    display: flex;
    align-items: center;
    justify-content: center;

    .form_wrap {
      width: 100%;
      max-width: 380px;
    }
  }
}
</style>
