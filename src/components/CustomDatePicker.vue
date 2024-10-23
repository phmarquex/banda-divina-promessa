<script setup lang="ts">
import { ref } from 'vue'
import { formatDateShort } from '@core/utils/formatters'

const props = defineProps<{
  modelValue: Date | string | undefined
  min?: Date | string | undefined
  label: string
}>()

const emit = defineEmits(['update:modelValue'])

const localModel = ref()
const isDialogOpen = ref<boolean>(false)

const updateValue = (event: string) => {
  emit('update:modelValue', new Date(event))
  isDialogOpen.value = false
}

const openDialog = () => {
  isDialogOpen.value = true
  localModel.value = props.modelValue
}
</script>

<template>
  <div>
    <VTextField
      dirty
      :label="label"
      :value="formatDateShort(modelValue)"
      @click="openDialog"
    />
    <div>
      <VDialog
        v-model="isDialogOpen"
        max-width="360"
      >
        <VCard>
          <VDatePicker
            v-model="localModel"
            color="primary"
            :min="min"

            @update:model-value="updateValue"
          />
          <template #actions>
            <VSpacer />

            <VBtn @click="isDialogOpen = false">
              Confirmar
            </VBtn>
          </template>
        </VCard>
      </VDialog>
    </div>
  </div>
</template>
