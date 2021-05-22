<template>
  <AppLayout>
    <div class="incruit">
      <h1>This is an incruit page</h1>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';

export default defineComponent({
  name: 'incruit-page',
  components: {
    AppLayout,
  },
});
</script>
