<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { formatDateTime } from '@core/utils/formatters'
import axios from '@core/axios'

const store = useStore()
const router = useRouter()
const menu = ref<boolean>(false)
const isDialogOpen = ref<boolean>(false)

interface Notification {
  id: number
  title: string
  message: string
  icon: string
  reference: string
  seen_at: string
  erased_at: string
  user_id: number
  created_at: string
}

const notifications = ref<Notification[]>([])
const countUnseen = ref<number>(0)
const badgeActive = ref<boolean>(false)

onMounted(async () => {
  const response = await axios(store, 'get', 'notifications/all')

  notifications.value = response.data
})

const handleClick = async (notification: Notification) => {
  notifications.value = notifications.value.map((n: Notification) => {
    if (n.id === notification.id)
      n.seen_at = 'seen'

    return n
  })

  await axios(store, 'put', `notifications/seen/${notification.id}`)

  if (notification.reference)
    await router.push(notification.reference)
}

const handleErase = async (notification: Notification) => {
  notifications.value = notifications.value.filter((n: Notification) => n.id !== notification.id)
  await axios(store, 'delete', `notifications/erase/${notification.id}`)
}

watch(notifications, () => {
  countUnseen.value = 0
  notifications.value.forEach((notification: Notification): void => {
    if (!notification.seen_at)
      countUnseen.value += 1
  })
  badgeActive.value = (countUnseen.value > 0)
})
</script>

<template>
  <IconBtn
    class="me-2"
    @click="menu = !menu"
  >
    <VBadge
      v-model="badgeActive"
      color="error"
      dot
    >
      <VIcon icon="ri-notification-line" />
    </VBadge>

    <VMenu
      v-model="menu"
      :close-on-content-click="false"
      class="menu-notification"
    >
      <VCard
        flat
        class="mt-2"
        style="width: 420px"
      >
        <VCardTitle class="d-flex align-center py-2">
          Notificações
          <VSpacer />
          <VChip
            v-if="countUnseen > 0"
            color="primary"
          >
            {{ countUnseen }} Nova(s)
          </VChip>
          <VIcon
            icon="line-md-email-opened"
            class="ml-2"
          />
        </VCardTitle>
        <VDivider />

        <PerfectScrollbar style="max-height: 300px">
          <TransitionGroup
            name="fade"
            tag="div"
          >
            <div
              v-if="notifications.length === 0"
              class="d-flex py-6 px-4 ga-3 border-b justify-center"
            >
              <span>Nenhuma nova notificação</span>
            </div>
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="d-flex py-3 px-4 ga-3 cursor-pointer border-b justify-space-between notification"
            >
              <div
                class="d-flex justify-center align-start"
                @click="handleClick(notification)"
              >
                <VAvatar
                  size="44"
                  color="primary"
                  variant="tonal"
                >
                  <VIcon
                    :icon="notification.icon"
                    size="30"
                  />
                </VAvatar>
              </div>
              <div
                class="d-flex flex-column"
                style="min-width: 280px;"
                @click="handleClick(notification)"
              >
                <p class="text-body-1 mb-2">
                  {{ notification.title }}
                </p>
                <span class="text-subtitle-1">{{ notification.message }}</span>
                <span class="text-subtitle-2">{{ formatDateTime(notification.created_at) }}</span>
              </div>
              <div class="d-flex flex-column align-center">
                <VIcon
                  icon="ri-checkbox-blank-circle-fill"
                  :color="notification.seen_at ? 'secondary' : 'primary'"
                  size="10"
                />
                <VIcon
                  icon="mdi-trash-can-outline"
                  size="15"
                  class="mt-3 d-none close-icon"
                  @click="handleErase(notification)"
                />
              </div>
            </div>
          </TransitionGroup>
        </PerfectScrollbar>
        <div class="d-flex align-center justify-center pa-5">
          <VBtn
            block
            text="Todas Notificações"
            @click="menu = !menu; isDialogOpen = true"
          />
        </div>
      </VCard>
    </VMenu>
  </IconBtn>

  <VDialog
    v-model="isDialogOpen"
    max-width="90%"
    max-height="500px"
  >
    <Grid
      :slot-names="['item.created_at', 'item.seen_at', 'item.erased_at', 'item.reference']"
      endpoint="notifications"
      add-new-path="/eventos/configuracoes/novo"
      header-title="Notificações"
      delete-message="A configuração foi excluída!"
      edit-path="/eventos/configuracoes"
    >
      <template #item.created_at="{ item }">
        {{ formatDateTime(item.created_at) }}
      </template>

      <template #item.seen_at="{ item }">
        {{ item.seen_at ? formatDateTime(item.seen_at) : '--' }}
      </template>

      <template #item.erased_at="{ item }">
        {{ item.erased_at ? formatDateTime(item.erased_at) : '--' }}
      </template>

      <template #item.reference="{ item }">
        <RouterLink
          :to="item.reference"
          @click="isDialogOpen = false"
        >
          <IconBtn>
            <VIcon icon="ri-external-link-line" />
          </IconBtn>
        </RouterLink>
      </template>
    </Grid>
  </VDialog>
</template>

<style lang="scss">
.notification:hover {
  background: #f5f5f5;

  .close-icon {
    display: block !important;
  }

  .close-icon:hover {
    transform: scale(1.2);
    z-index: 10;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.menu-notification {
  display: flex;
  top: 50px;
  justify-content: end;
  right: 125px;
}
</style>
