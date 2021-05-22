<template>
  <AppLayout>
    <div class="inquery">
      <h1>This is an inquery page</h1>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';

export default defineComponent({
  name: 'inquery-page',
  components: {
    AppLayout,
  },
});
</script>
