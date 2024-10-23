<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: '15',
      badgeClass: 'bg-error',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Menu -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Menu',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Contratos',
      icon: 'ri-file-paper-2-line',
      to: '/contratos/template',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Clientes',
      icon: 'ri-user-line',
      to: '/clientes',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Eventos',
      icon: 'ri-calendar-event-fill',
      to: '/eventos/calendario',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Análises',
      icon: 'mdi-magnify',
      to: '/analises',
    }"
  />

  <!-- 👉 Ferramentas -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Ferramentas',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Emails',
      icon: 'ri-mail-line',
      to: '/emails',
    }"
  />
</template>
