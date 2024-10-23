<script setup lang="ts">
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'vue3-toastify'
import { useFirestore } from 'vuefire'

const marcacao = async (id, grupo, item) => {
  const temp = !item[grupo]
  const db = useFirestore()
  const louvorRef = doc(db, 'louvores', id)
  const louvorQuery = await getDoc(louvorRef)
  const louvorData = louvorQuery.data()

  if (louvorData) {
    await updateDoc(louvorRef, { jovens: false, irmas: false, grupo_louvor: false })
    await updateDoc(louvorRef, { [grupo]: !louvorData[grupo] })
  }

  toast.success('Louvor atualizado!')
  item.jovens = item.irmas = item.grupo_louvor = false
  item[grupo] = temp
}
</script>

<template>
  <Grid
    :slot-names="['item.jovens', 'item.irmas', 'item.grupo_louvor']"
    endpoint="Louvores"
    add-new="Novo Louvor"
    add-new-path="/louvores/cadastro"
    header-title="Louvores"
    delete-message="O louvor foi excluída"
    edit-path="/louvores/cadastro"
  >
    <template #item.jovens="{ item }">
      <div class="d-flex justify-center align-center">
        <IconBtn
          :color="item.jovens ? 'error' : ''"
          @click="marcacao(item.id, 'jovens', item)"
        >
          <VIcon icon="line-md-person-filled" />
        </IconBtn>
      </div>
    </template>

    <template #item.irmas="{ item }">
      <div class="d-flex justify-center align-center">
        <IconBtn
          :color="item.irmas ? 'error' : ''"
          @click="marcacao(item.id, 'irmas', item)"
        >
          <VIcon icon="line-md-person-filled" />
        </IconBtn>
      </div>
    </template>

    <template #item.grupo_louvor="{ item }">
      <div class="d-flex justify-center align-center">
        <IconBtn
          :color="item.grupo_louvor ? 'error' : ''"
          @click="marcacao(item.id, 'grupo_louvor', item)"
        >
          <VIcon icon="line-md-person-filled" />
        </IconBtn>
      </div>
    </template>
  </Grid>
</template>
