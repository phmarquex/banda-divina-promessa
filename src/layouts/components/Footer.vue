<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon
        icon="ri-heart-line"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By <a
        href="https://instagram.com/paulohsmarquex"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Paulo Marques</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="http://lz.localhost/telescope"
        target="noopener noreferrer"
      >Telescope</a>
    </span>
  </div>
</template>
