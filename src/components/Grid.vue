<script setup lang="ts">
import { useFirestore } from 'vuefire'
import { collection, deleteDoc, doc, getDocs, limit, query } from 'firebase/firestore'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

interface Props {
  slotNames?: string[]
  endpoint: string
  addNew?: string
  addNewPath?: string
  headerTitle: string
  itemPerPage?: number
  deleteMessage?: string
  editPath?: string
  showExpand?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemPerPage: 30,
  deleteMessage: 'O item foi excluído!',
  showExpand: false,
})

const search = ref('')

const itemsPerPage = ref<number>(props.itemPerPage)
const serverItems = ref([])
const expanded = ref([])
const serverHeaders = ref([])
const totalItems = ref<number>(0)
const loading = ref<boolean>(true)

interface LoadItemsParams {
  _page: number
  _itemsPerPage: number
  _sortBy: string
}

interface ServerItems {
  item: Item
}

interface Item {
  id: number
  nome: string
  document: string
  birthday: string
}

const loadItems = async ({ page, itemsPerPage, sortBy }: LoadItemsParams) => {
  loading.value = true
  try {
    const db = useFirestore()

    // Reference the 'louvores' collection and limit to 5 documents
    const q = query(collection(db, 'louvores'), limit(itemsPerPage))
    const t = await getDocs(collection(db, 'louvores'))

    // Get the total number of documents
    const totalDocuments = t.size

    // Get the documents from the query
    const querySnapshot = await getDocs(q)

    // Iterate over each document
    const data = []

    querySnapshot.forEach(docu => {
      data.push(Object.assign(docu.data(), { id: docu.id }))
    })

    serverItems.value = data
    totalItems.value = totalDocuments
    serverHeaders.value = [
      { title: 'grupo', align: 'start', key: 'grupo' },
      { title: 'louvor', align: 'start', key: 'louvor' },
      { title: 'Ecoar', align: 'center', key: 'jovens' },
      { title: 'Filhas', align: 'center', key: 'irmas' },
      { title: 'Grupo de Louvor', align: 'center', key: 'grupo_louvor' },

      // { title: 'tom', align: 'start', key: 'tom' },
      // { title: 'tom_original', align: 'start', key: 'tom_original' },
      // { title: 'tempo', align: 'start', key: 'tempo' },
      // { title: 'versao', align: 'start', key: 'versao' },
      // { title: 'cifras', align: 'start', key: 'cifras' },
      // { title: 'youtube', align: 'start', key: 'youtube' },
      { title: 'actions', align: 'end', key: 'actions' },

    ]
    loading.value = false
  }
  catch (error) {
    toast.error('Ops! Aconteceu um erro inesperado.')
  }
}

const destroy = async (item: string): Promise<void> => {
  loading.value = true

  try {
    const db = useFirestore()
    const docRef = doc(db, 'louvores', item)

    await deleteDoc(docRef)

    toast.success(props.deleteMessage)

    search.value = String(Date.now())
    setTimeout(() => {
      search.value = String()
      loading.value = true
    }, 100)
  }
  catch {
    toast.error('Ops! Aconteceu um erro inesperado.')
  }
}
</script>

<template>
  <GridHeader
    v-model="search"
    :title="headerTitle"
    :total-items="totalItems"
    :path="addNewPath"
    :add-new="addNew"
    :loading="loading"
  />
  <VDataTableServer
    v-model:expanded="expanded"
    v-model:items-per-page="itemsPerPage"
    :headers="serverHeaders"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="id"
    :show-expand="showExpand"
    @update:options="loadItems"
  >
    <template
      v-for="name in slotNames"
      #[name]="slotProps"
      :key="name"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      >
        {{ slotProps.value }}
      </slot>
    </template>

    <template #item.actions="{ item }: ServerItems">
      <GridActions
        :id="item.id"
        :on-agree="destroy"
        :path="`${editPath}/${item.id}`"
      >
        <template #custom-actions>
          <slot
            name="custom-actions"
            :item="item"
          />
        </template>
      </GridActions>
    </template>
  </VDataTableServer>
</template>
