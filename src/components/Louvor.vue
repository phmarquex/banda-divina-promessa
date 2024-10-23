<script setup lang="ts">
import { useFirestore } from 'vuefire'
import { collection, getDocs, query, where } from 'firebase/firestore'

const props = defineProps<{ entity: string }>()

const louvores = ref([])

if (onMounted) {
  onMounted(async () => {
    const db = useFirestore()

    // Correctly reference the subcollection 'grupo-de-louvor'
    const louvoresRef = collection(db, '/louvores')
    const q = query(louvoresRef, where(props.entity, '==', true))
    const s = await getDocs(q)

    s.forEach(group => {
      // Get document data and the document ID
      louvores.value.push(group.data())
    })
  })
}

const cifras = (cifra, teclado = false) => {
  let link = `https://www.cifraclub.com.br/${cifra}`

  if (teclado)
    link += '/#tabs=false&instrument=keyboard'

  window.open(link, '_blank')
}

const youtube = video => {
  const link = `https://youtu.be/watch?v=${video}`

  window.open(link, '_blank')
}

const groupNames = group => {
  const names = {
    jovens: 'Ministério Ecoar',
    irmas: 'Filhas da Promessa',
    grupo_louvor: 'Grupo de Louvor',
  }

  return names[group]
}
</script>

<template>
  <VCard
    class="mt-3"
    :title="groupNames(entity)"
    flat="true"
  >
    <VRow
      v-for="louvor in louvores"
      :key="louvor.louvor"
      class="rounded-be-pill ma-3 pa-3"
    >
      <VCol>
        <div class="d-flex flex-column">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex flex-column">
              <span class="text-default">{{ louvor.louvor }}</span>
              <span class="text-subtitle-1">{{ louvor.grupo }}</span>
            </div>

            <VChip
              :text="`${louvor.tom}(Orig: ${louvor.tom_original})/${louvor.tempo} BPM`"
              color="#222"
              size="x-large"
            />
          </div>

          <div class="mt-3">
            <div class="d-flex flex-column">
              <span class="text-default">Versão</span>
              <span class="text-subtitle-1">{{ louvor.versao }}</span>
              <span class="text-default mt-3">Primeira Estrofe</span>
              <span class="text-subtitle-1">{{ louvor.estrofe || '--' }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex justify-space-between flex-wrap mt-5">
          <VRow class="">
            <VCol
              cols="12"
              md="4"
            >
              <VBtn
                class="teste"
                color="warning"
                block="true"
                @click="cifras(louvor.cifras)"
              >
                <template #prepend>
                  <VIcon icon="mdi-guitar-pick" />
                </template>

                Cifrasclub - Violão/Guitara
              </VBtn>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <VBtn
                class="teste"
                color="warning"
                block="true"
                @click="cifras(louvor.cifras, true)"
              >
                <template #prepend>
                  <VIcon
                    icon="mdi-piano"
                    size="25px"
                  />
                </template>

                Cifrasclub - Teclado
              </VBtn>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <VBtn
                color="primary"
                block="true"
                @click="youtube(louvor.youtube)"
              >
                <template #prepend>
                  <VIcon
                    icon="line-md-youtube-filled"
                    size="25px"
                  />
                </template>

                Ver no YouTube
              </VBtn>
            </VCol>
          </VRow>
        </div>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss">
.teste {
  color: rgb(var(--v-theme-on-warning-darken-1)) !important
}
</style>
