<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="glass rounded-lg p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Acceso Administrativo</h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <Password v-model="password" id="password" :feedback="false" toggleMask placeholder="Introduce la contraseña"
            class="w-full" :class="{ 'p-invalid': error }" @keyup.enter="handleLogin" aria-label="Campo de contraseña"
            :aria-describedby="error ? 'password-error' : undefined" />
          <small v-if="error" id="password-error" class="text-red-500 mt-1 block" role="alert">
            {{ error }}
          </small>
        </div>

        <Button type="submit" label="Iniciar Sesión" icon="pi pi-sign-in" class="w-full" :loading="loading"
          aria-label="Botón para iniciar sesión" />
      </form>

      <div class="mt-6 text-center">
        <router-link to="/"
          class="text-gray-600 hover:text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1 inline-block">
          <i class="pi pi-arrow-left mr-1" aria-hidden="true"></i>
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Password from 'primevue/password';
import Button from 'primevue/button';

const router = useRouter();
const authStore = useAuthStore();

const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  // Simular un pequeño delay para mejor UX
  await new Promise(resolve => setTimeout(resolve, 500));

  const success = authStore.login(password.value);

  if (success) {
    router.push('/maintenance');
  } else {
    error.value = 'Contraseña incorrecta';
    password.value = '';
  }

  loading.value = false;
};
</script>

<style scoped></style>
