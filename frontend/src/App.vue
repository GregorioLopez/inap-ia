<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <TheHeader />
    <main class="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
      <router-view />
    </main>
    <TheFooter />
    <Toast />
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import Toast from 'primevue/toast';
</script>

<style>
/* Los estilos globales están en style.css */
</style>
