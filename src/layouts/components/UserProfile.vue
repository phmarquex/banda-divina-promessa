<script setup lang="ts">
import { useStore } from 'vuex'
import { keycloakService } from '@/plugins/keycloak'
import { router } from '@/plugins/router'
import avatar1 from '@images/avatars/avatar-1.png'

const store = useStore()

if (!store.state.authenticated)
  router.push('/login')

const logout = async () => {
  store.commit('logout')
  await keycloakService.callLogout('https://lazymoney.34.95.140.66.sslip.io/login')
  await router.push('/login')
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ store.state.user.info.name }}
            </VListItemTitle>
            <VListItemSubtitle>{{ store.state.user.info.email }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-user-line"
                size="22"
              />
            </template>

            <RouterLink
              to="/perfil/conta"
              class="no-color"
            >
              <VListItemTitle>
                Perfil
              </vlistitemtitle>
            </RouterLink>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-settings-4-line"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-logout-box-r-line"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
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
