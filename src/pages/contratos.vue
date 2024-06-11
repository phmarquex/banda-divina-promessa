<script setup lang="ts">
const headers = [
  { title: 'teste', value: 'name' },

  { title: 'teste', value: 'species' },
  { title: 'teste', value: 'diet' },
  { title: 'teste', value: 'habitat' },
  { title: 'actions', value: 'actions' },
]

const items = [
  {
    id: 20,
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    id: 50,
    name: 'Paulo Marques',
    species: 'Human Form',
    diet: 'Carnivore',
    habitat: 'Osasco, SP',
    actions: 1,
  },
]
</script>

<template>
  <VDataTable
    :items="items"
    :headers="headers"
  />
</template>
