<script setup lang="ts">
import { useRoute } from 'vue-router'
import Louvores from '@/views/louvores/index.vue'
import Configuracao from '@/views/louvores/config.vue'
import Cadastro from '@/views/louvores/cadastro.vue'

const route = useRoute()

const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  { title: 'Louvores', icon: 'ri-home-line', tab: '/louvores' },
  { title: 'Seleção da Semana', icon: 'ri-settings-3-line', tab: '/louvores/selecao-semana' },
]

const counter = ref<number>(0)

const addCount = () => {
  counter.value = counter.value + 1
}
</script>

<template>
  <VTabs
    v-model="activeTab"
    height="60px"
    fixed-tabs
  >
    <VTab
      v-for="item in tabs"
      :key="item.icon"
      :value="item.tab"
      :to="item.tab"
      @click="addCount"
    >
      <VIcon
        size="20"
        start
        :icon="item.icon"
      />
      {{ item.title }}
    </VTab>
  </VTabs>

  <VWindow
    v-model="activeTab"
    class="disable-tab-transition"
    :touch="false"
    style="height: 100%; overflow: auto"
  >
    <!-- Template de Contratos -->
    <VWindowItem
      :key="counter"
      value="/louvores"
    >
      <Louvores />
    </VWindowItem>

    <!-- Tags -->
    <VWindowItem value="/louvores/selecao-semana">
      <Configuracao />
    </VWindowItem>

    <!-- Grupo de Tag -->
    <VWindowItem value="/louvores/cadastro">
      <Cadastro />
    </VWindowItem>
  </VWindow>
</template>
