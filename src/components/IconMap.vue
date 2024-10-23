<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import ri from '@iconify-json/ri/icons.json'
import bxl from '@iconify-json/bxl/icons.json'
import mdi from '@iconify-json/mdi/icons.json'
import linemd from '@iconify-json/line-md/icons.json'

const props = defineProps<{
  onSelect?: (value: string) => void
  value?: string
}>()

const items: object[] = []
const packList = [ri, mdi, bxl, linemd]
for (const icons in packList) {
  for (const icon in packList[icons].icons)
    items.push({ name: `${packList[icons].prefix}-${icon}` })
}

const isDialogOpen = ref<boolean>(false)
const searchInput = ref('')

const saveToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    searchInput.value = ''
    isDialogOpen.value = false

    if (props.onSelect)
      props.onSelect(text)

    toast.success('Icone copiado!')
  }
  catch {
    toast.error('Ops! Aconteceu um erro inesperado.')
  }
}
</script>

<template>
  <VBtn @click="isDialogOpen = true">
    <VIcon
      icon="mdi-package-variant"
      class="mr-2"
      size="22"
    /> Mapa de icones
  </VBtn>
  <div>
    <VDialog
      v-model="isDialogOpen"
      max-width="800"
    >
      <VCard>
        <VCard flat>
          <VCardTitle class="d-flex align-center pe-2">
            <VIcon icon="ri-remixicon-line" /> &nbsp;
            Icones

            <VSpacer />
            <VTextField
              v-model="searchInput"
              autofocus
              clearable
              label="Pesquisar Icone"
              prepend-inner-icon="ri-search-line"
              variant="solo-filled"
              flat
              hide-details
              single-line
            />
          </VCardTitle>

          <VDivider />
        </VCard>
        <VDataIterator
          :items="items"
          :items-per-page="30"
          :search="searchInput"
        >
          <template #default="{ items }">
            <VContainer
              class="pa-2 mt-5"
              fluid
            >
              <VRow dense>
                <VCol
                  v-for="item in items"
                  :key="item.raw.name"
                  cols="auto d-flex justify-center align-center"
                  md="2"
                >
                  <VCard
                    class="pa-4"
                    @click="saveToClipboard(item.raw.name)"
                  >
                    <VIcon
                      v-bind="props"
                      :icon="item.raw.name"
                      size="35"
                    />
                  </VCard>
                </VCol>
              </VRow>
            </VContainer>
          </template>

          <template #footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <VBtn
                :disabled="page === 1"
                density="comfortable"
                icon="ri-arrow-left-line"
                variant="tonal"
                rounded
                @click="prevPage"
              />

              <div class="mx-2 text-caption">
                Page {{ page }} of {{ pageCount }}
              </div>

              <VBtn
                :disabled="page >= pageCount"
                density="comfortable"
                icon="ri-arrow-right-line"
                variant="tonal"
                rounded
                @click="nextPage"
              />
            </div>
          </template>
        </VDataIterator>
      </VCard>
    </VDialog>
  </div>
</template>
