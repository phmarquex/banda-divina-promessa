<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { formatDateShort } from '@core/utils/formatters'

interface Event {
  id: number
  title: string
  dt: string
  extendedProps: object
}

interface Props {
  modelValue: boolean
  event: Event
  infoTarget: [x: number, y: number]
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
const localMenu = computed(() => props.modelValue)

const updateValue = (event: boolean) => {
  emit('update:modelValue', event)
}
</script>

<template>
  <VMenu
    v-model="localMenu"
    location-strategy="connected"
    :target="infoTarget"
    @update:model-value="updateValue"
  >
    <PerfectScrollbar
      style="height: 250px"
      :options="{ wheelPropagation: false, swipeEasing: true, scrollingThreshold: 1 }"
    >
      <VCard
        class="pa-5"
        style="width: 350px"
        :color="event.color"
      >
        <VRow>
          <VTable>
            <thead>
              <tr>
                <th colspan="2">
                  <RouterLink :to="`/eventos/${event.id}`">
                    <h5 class="text-h5 text-primary">
                      {{ event.title }}
                    </h5>
                  </RouterLink>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Enviar p/ cliente?</td>
                <td>
                  <VCheckbox
                    v-model="event.extendedProps.send_to_client"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>Recorrência</td>
                <td>
                  <span>Reenviar em {{ event.extendedProps.recurrence }} dia(s)</span>
                </td>
              </tr>
              <tr>
                <td>Inicio</td>
                <td>{{ formatDateShort(event.start) }}</td>
              </tr>
              <tr>
                <td>Fim</td>
                <td>{{ formatDateShort(event.end) }}</td>
              </tr>
              <tr>
                <td>Agentes</td>
                <td>
                  <span
                    v-for="(agent, key) in event.extendedProps.agents"
                    :key="key"
                    class="pr-2"
                  >
                    {{ agent }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Descrição</td>
                <td>
                  <span>{{ event.extendedProps.description }}</span>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VRow>
      </VCard>
    </PerfectScrollbar>
  </VMenu>
</template>
