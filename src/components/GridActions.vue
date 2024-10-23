<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  slotNamesActions?: string[]
  onAgree: (item: number | string) => Promise<void>
  id: number | string
  path: string
}>()

const isDialogOpen = ref<boolean>(false)

const handleAgree = () => {
  if (isDialogOpen.value) {
    isDialogOpen.value = false
    props.onAgree(props.id)
  }
}
</script>

<template>
  <div class="d-flex justify-end gap-2">
    <div>
      <IconBtn @click="isDialogOpen = true">
        <VIcon icon="ri-delete-bin-line" />
      </IconBtn>

      <div>
        <VDialog
          v-model="isDialogOpen"
          max-width="400"
          persistent
        >
          <VCard
            prepend-icon="ri-delete-bin-5-fill"
            text="Deseja realmente excluir o item selecionado?"
            title="Excluir item"
          >
            <template #actions>
              <VSpacer />

              <VBtn
                color="error"
                @click="isDialogOpen = false"
              >
                Cancelar
              </VBtn>

              <VBtn @click="handleAgree">
                Confirmar
              </VBtn>
            </template>
          </VCard>
        </VDialog>
      </div>
    </div>
    <RouterLink
      :to="{ path }"
      class="no-color"
    >
      <IconBtn>
        <VIcon icon="line-md-pencil" />
      </IconBtn>
    </RouterLink>
    <slot name="custom-actions" />
  </div>
</template>

<style scoped>
.no-color {
  color: inherit; /* Inherit the color from the parent element */
  text-decoration: none; /* Remove underline if any */
}

/* Additional style to ensure no color change on hover or active state */
.no-color:hover,
.no-color:active,
.no-color:focus {
  color: inherit;
  text-decoration: none;
}
</style>
