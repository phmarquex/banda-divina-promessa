<script setup lang='ts'>
import { useRoute } from 'vue-router'
import New from '@/views/louvores/cadastro.vue'

const route = useRoute()
const props = route.params
</script>

<template>
  <New :id="props.id" />
</template>
