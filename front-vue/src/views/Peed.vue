<template>
  <AppLayout>
    <div class="peed">
      <h1>This is an peed page</h1>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';

export default defineComponent({
  name: 'peed-page',
  components: {
    AppLayout,
  },
});
</script>
