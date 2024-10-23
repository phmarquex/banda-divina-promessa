<script setup lang="ts">
interface Props {
  modelValue: string
  title: string
  totalItems: number
  path: string
  addNew?: string
  loading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const localSearch = computed(() => props.modelValue)

const updateValue = (event: string) => {
  emit('update:modelValue', event)
}
</script>

<template>
  <VCard
    flat
    style="border-radius: 6px 6px 0 0"
  >
    <VCardTitle class="d-flex align-center pe-2">
      <div class="d-flex align-center ga-3">
        <VChip
          color="on-background"
          class="d-flex justify-center align-center"
          style="min-width: 70px"
        >
          <VIcon
            v-if="loading"
            icon="line-md-loading-loop"
          /><span v-if="!loading">{{ props.totalItems }}</span>
        </VChip>
        {{ props.title }}
      </div>

      <VSpacer />
      <VSpacer />
      <VSpacer />

      <VTextField
        v-model="localSearch"
        density="compact"
        label="Filtro"
        prepend-inner-icon="ri-search-line"
        variant="solo-filled"
        flat
        hide-details
        single-line
        clearable
        @update:model-value="updateValue"
      />
      <RouterLink
        v-if="addNew"
        :to="{ path: props.path }"
      >
        <VBtn
          color="primary"
          class="ml-5"
        >
          <VIcon
            icon="ri-upload-cloud-line"
            class="d-sm-none"
          />
          <span class="d-none d-sm-block">{{ props.addNew }}</span>
        </VBtn>
      </RouterLink>
    </VCardTitle>
  </VCard>
</template>
