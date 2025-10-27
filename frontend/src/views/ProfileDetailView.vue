<template>
  <div v-if="loading" class="text-center">Cargando perfil...</div>
  <div v-else-if="!profile" class="text-center text-red-500">Perfil no encontrado.</div>
  <div v-else>
    <div class="glass rounded-lg p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Columna Izquierda: Foto y datos principales -->
        <div class="md:col-span-1 flex flex-col items-center text-center">
          <Avatar :image="profile.foto_url" shape="circle" size="xlarge" class="w-40 h-40 text-6xl mb-4"
            :alt="`Foto de ${profile.nombre} ${profile.apellidos}`" />
          <h1 class="text-3xl font-bold">{{ profile.nombre }} {{ profile.apellidos }}</h1>
          <p class="text-xl text-gray-600 mt-2">{{ profile.cargo }}</p>
          <p class="text-gray-500 mt-1">{{ profile.organismo }}</p>
        </div>

        <!-- Columna Derecha: Detalles y enlaces -->
        <div class="md:col-span-2">
          <h2 class="text-2xl font-semibold border-b pb-2 mb-4">Detalles</h2>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Extracto del CV</h4>
              <p v-if="profile.cv" class="text-gray-700 mt-1 whitespace-pre-wrap">{{ profile.cv }}</p>
              <span v-else class="text-gray-500">No disponible</span>
            </div>
            <div>
              <h3 class="font-semibold">Redes Profesionales y Personales</h3>
              <div class="flex flex-wrap gap-4 mt-2">
                <a v-if="profile.linkedin_url" :href="profile.linkedin_url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-2 text-gray-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1">
                  <i class="pi pi-linkedin" aria-hidden="true"></i>
                  LinkedIn
                </a>
                <a v-if="profile.github_url" :href="profile.github_url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-2 text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1">
                  <i class="pi pi-github" aria-hidden="true"></i>
                  GitHub
                </a>
              </div>
            </div>
            <div>
              <h3 class="font-semibold">Web Personal</h3>
              <a v-if="profile.web_personal_url" :href="profile.web_personal_url" target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded px-2 py-1">
                {{ profile.web_personal_url }}
              </a>
              <span v-else class="text-gray-500">No disponible</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón para volver al inicio -->
      <div class="mt-8 flex gap-4">
        <router-link to="/"
          class="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
          <i class="pi pi-arrow-left" aria-hidden="true"></i>
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProfileStore } from '../stores/profiles';
import Avatar from 'primevue/avatar';

const route = useRoute();
const store = useProfileStore();

const profileId = route.params.id;
const profile = ref(null);
// Usamos el estado de carga global del store
const loading = computed(() => store.loading);

onMounted(async () => {
  profile.value = await store.fetchProfileById(profileId);
});
</script>
