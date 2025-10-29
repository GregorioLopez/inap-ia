<template>
  <header class="bg-gray-800 text-white shadow-md">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center" aria-label="Navegación principal">
      <div class="text-2xl font-bold">
        <router-link to="/"
          class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2  rounded px-2 py-1">
          Perfiles INAP-IA
        </router-link>
      </div>
      <ul class="flex space-x-6">
        <li>
          <router-link to="/"
            class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2  rounded px-2 py-2">
            Inicio
          </router-link>
        </li>
        <li>
          <router-link :to="authStore.isAuthenticated ? '/maintenance' : '/login'"
            class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2  rounded px-2 py-2">
            Administración
          </router-link>
        </li>
        <li>
          <router-link to="/about"
            class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2  rounded px-2 py-2">
            Acerca de
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<style scoped></style>
