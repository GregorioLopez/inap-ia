<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <TheHeader />
    <main class="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<style>
/* Los estilos globales están en style.css */
</style>
