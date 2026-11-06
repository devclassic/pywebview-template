<template>
  <h1>Hello World</h1>
  <button @click="test">测试</button>
</template>

<script setup>
  const test = async () => {
    alert(await pywebview.api.hello())
  }
</script>
