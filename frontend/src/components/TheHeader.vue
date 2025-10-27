<template>
  <header class="bg-gray-800 text-white shadow-md">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center" aria-label="Navegación principal">
      <div class="text-2xl font-bold">
        <router-link to="/"
          class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1">
          Portfolio INAP-IA
        </router-link>
      </div>
      <ul class="flex space-x-6">
        <li>
          <router-link to="/"
            class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1"
            aria-current="page">
            Inicio
          </router-link>
        </li>
        <li>
          <button @click="handleAdminClick"
            class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1 bg-transparent border-none cursor-pointer text-white"
            aria-label="Ir a administración o login">
            Administración
          </button>
        </li>
        <li>
          <router-link to="/about"
            class="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1">
            Acerca de
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleAdminClick = () => {
  if (authStore.isAuthenticated) {
    router.push('/maintenance');
  } else {
    router.push('/login');
  }
};
</script>

<style scoped></style>
