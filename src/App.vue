<template>
  <n-config-provider>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { NDialogProvider, NConfigProvider } from 'naive-ui'
</script>
