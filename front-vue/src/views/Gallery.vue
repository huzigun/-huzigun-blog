<template>
  <AppLayout>
    <div class="gallery">
      <h1>This is an gallery page</h1>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';

export default defineComponent({
  name: 'gallery-page',
  components: {
    AppLayout,
  },
});
</script>
