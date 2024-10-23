<script setup lang="ts">
import Louvor from '@/components/Louvor.vue'
</script>

<template>
  <VCard
    class="mx-auto"
    subtitle="Banda Divina Promessa"
    align="center"
  >
    <template #title>
      <span class="font-weight-black">Louvores da Semana</span>
    </template>

    <VCardText class="bg-surface-light pt-4">
      Louvores da semana para estudo da banda
    </VCardText>
  </VCard>

  <Louvor entity="jovens" />
  <Louvor entity="irmas" />
  <Louvor entity="grupo_louvor" />
</template>
