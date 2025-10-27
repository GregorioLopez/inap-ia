<template>
  <header class="bg-gray-800 text-white shadow-md">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold">
        <router-link to="/" class="hover:text-gray-300">PortfolioPRO</router-link>
      </div>
      <ul class="flex space-x-6">
        <li><router-link to="/" class="hover:text-gray-300">Inicio</router-link></li>
        <li><a href="#" class="hover:text-gray-300 cursor-not-allowed opacity-50" title="Próximamente">Acerca de</a>
        </li>
        <li><a href="#" class="hover:text-gray-300 cursor-not-allowed opacity-50" title="Próximamente">Login</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped></style>
