<script lang='ts' setup>
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useFirestore } from 'vuefire'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { required } from '@vuelidate/validators'

const props = defineProps<{ id?: string }>()

const router = useRouter()

interface StateInterface {
  cifras: string
  grupo: string
  louvor: string
  tempo: string | number
  tom: string
  tom_original: string
  versao: string
  youtube: string
  estrofe: string
}

// eslint-disable-next-line vue/no-dupe-keys
const id = ref()

const initialState = {
  grupo: '',
  cifras: '',
  louvor: '',
  tempo: '',
  tom: '',
  tom_original: '',
  versao: '',
  youtube: '',
  estrofe: '',
}

const state = reactive<StateInterface>({
  ...initialState,
})

const rules = {
  grupo: { required },
  louvor: { required },
  versao: { required },
  cifras: { required },
  youtube: { required },
}

const v$ = useVuelidate(rules, state)

// Methods

if (onMounted) {
  onMounted(async () => {
    if (props.id) {
      const db = useFirestore()
      const docRef = doc(db, 'louvores', props.id)
      const data = await getDoc(docRef)

      Object.assign(state, data.data())
      id.value = props.id
    }
  })
}

const create = async () => {
  try {
    const db = useFirestore()

    // Reference the document inside the 'louvores' collection
    const docRef = doc(db, 'louvores', id.value)

    state.tempo = Math.round(state.tempo)

    // Create or update the document
    await setDoc(docRef, state)

    toast.success('Louvor criado!')

    await router.push('/louvores/selecao-semana')
  }
  catch (error) {
    toast.error('Ops! Aconteceu um erro inesperado.')
  }
}

const resetForm = () => {
  Object.assign(state, initialState)
}

if (watch) {
  watch(state, () => {
    if (!props.id)
      id.value = `${state.grupo.replace(/[^a-zA-Z0-9]+/g, '-')}-${state.louvor.replace(/[^a-zA-Z0-9]+/g, '-')}`
  })
}
</script>

<template>
  <VCardTitle>
    <RouterLink to="/louvores/selecao-semana">
      <VBtn variant="text">
        <template #append>
          <VIcon icon="ri-arrow-go-back-fill" />
        </template>
      </VBtn>
    </RouterLink>
    {{ props.id ? 'Editar Louvor' : 'Novo Louvor' }}
  </VCardTitle>
  <VCardText>
    <!-- 👉 Form -->
    <VForm class="mt-6">
      <VRow>
        <!-- 👉 Id -->
        <VCol
          cols="12"
          md="12"
        >
          <VTextField
            v-model="id"
            disabled
            handle-change
            label="ID"
            placeholder="ID"
          />
        </VCol>

        <!-- 👉 Grupo -->
        <VCol
          cols="12"
          md="12"
        >
          <VTextField
            v-model="state.grupo"
            :error-messages="v$.grupo.$errors.map(e => e.$message)"
            handle-change
            label="Grupo/Banda"
            placeholder="Grupo/Banda"
            @blur="v$.grupo.$touch"
            @input="v$.grupo.$touch"
          />
        </VCol>

        <!-- 👉 Louvor -->
        <VCol
          cols="12"
          md="12"
        >
          <VTextField
            v-model="state.louvor"
            :error-messages="v$.louvor.$errors.map(e => e.$message)"
            handle-change
            label="Louvor"
            placeholder="Louvor"
            @blur="v$.louvor.$touch"
            @input="v$.louvor.$touch"
          />
        </VCol>

        <!-- 👉 Tom -->
        <VCol
          cols="12"
          md="6"
          sm="6"
        >
          <VSelect
            v-model="state.tom"
            :items="['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb',
                     'B', 'CM', 'C#M', 'DbM', 'DM', 'D#M', 'EbM', 'EM', 'FM', 'F#M', 'GbM', 'GM', 'G#M', 'AbM',
                     'AM', 'A#M', 'BbM', 'BM', 'Cm', 'C#m', 'Dbm', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gbm',
                     'Gm', 'G#m', 'Abm', 'Am', 'A#m', 'Bbm', 'Bm']"
            label="Tom"
            placeholder="Selecione o tom"
          />
        </VCol>

        <!-- 👉 Tom Original -->
        <VCol
          cols="12"
          md="6"
          sm="6"
        >
          <VSelect
            v-model="state.tom_original"
            :items="['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb',
                     'B', 'CM', 'C#M', 'DbM', 'DM', 'D#M', 'EbM', 'EM', 'FM', 'F#M', 'GbM', 'GM', 'G#M', 'AbM',
                     'AM', 'A#M', 'BbM', 'BM', 'Cm', 'C#m', 'Dbm', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gbm',
                     'Gm', 'G#m', 'Abm', 'Am', 'A#m', 'Bbm', 'Bm']"
            label="Tom Original"
            placeholder="Selecione o tom original"
          />
        </VCol>

        <!-- 👉 Tempo -->
        <VCol
          cols="12"
          md="12"
          sm="12"
        >
          <VSlider
            v-model="state.tempo"
            label="Tempo"
            max="200"
            min="0"
            placeholder="Selecione o tempo"
          >
            <template #prepend>
              <span>{{ Math.round(state.tempo) }}</span>
            </template>
          </VSlider>
        </VCol>

        <!-- 👉 Versão -->
        <VCol
          cols="12"
          md="12"
        >
          <VTextField
            v-model="state.versao"
            :error-messages="v$.versao.$errors.map(e => e.$message)"
            handle-change
            label="Versão"
            placeholder="Versão"
            @blur="v$.versao.$touch"
            @input="v$.versao.$touch"
          />
        </VCol>

        <!-- 👉 CifrasClube -->
        <VCol
          cols="12"
          md="12"
        >
          <VTextField
            v-model="state.cifras"
            :error-messages="v$.cifras.$errors.map(e => e.$message)"
            handle-change
            label="Cifrasclub"
            placeholder="Cifrasclub"
            @blur="v$.cifras.$touch"
            @input="v$.cifras.$touch"
          >
            <template #prepend>
              <VTextField
                disabled
                style="width: 159px"
              >
                cifraclub.com.br/
              </VTextField>
            </template>
          </VTextField>
        </VCol>

        <!-- 👉 Youtube -->
        <VCol
          cols="12"
          md="12"
        >
          <VTextField
            v-model="state.youtube"
            :error-messages="v$.youtube.$errors.map(e => e.$message)"
            handle-change
            label="Youtube"
            placeholder="Youtube"
            @blur="v$.youtube.$touch"
            @input="v$.youtube.$touch"
          >
            <template #prepend>
              <VTextField
                disabled
                style="width: 159px"
              >
                yt.com/watch?v=
              </VTextField>
            </template>
          </VTextField>
        </VCol>

        <!-- 👉 Youtube -->
        <VCol
          cols="12"
          md="12"
        >
          <VTextField
            v-model="state.estrofe"
            handle-change
            label="Estrofe"
            placeholder="Estrofe"
          />
        </VCol>

        <!-- 👉 Form Actions -->
        <VCol
          class="d-flex flex-wrap gap-4"
          cols="12"
        >
          <VBtn
            :disabled="v$.$invalid"
            @click="create"
          >
            Salvar Cliente
          </VBtn>

          <VBtn
            color="secondary"
            type="reset"
            variant="outlined"
            @click.prevent="resetForm"
          >
            Limpar
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>
