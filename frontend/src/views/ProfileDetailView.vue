<template>
  <div v-if="loading" class="text-center">Cargando perfil...</div>
  <div v-else-if="!profile" class="text-center text-red-500">Perfil no encontrado.</div>
  <div v-else>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Columna Izquierda: Foto y datos principales -->
        <div class="md:col-span-1 flex flex-col items-center text-center">
          <Avatar :image="profile.foto_url" shape="circle" size="xlarge" class="w-40 h-40 text-6xl mb-4" />
          <h1 class="text-3xl font-bold">{{ profile.nombre }} {{ profile.apellidos }}</h1>
          <h2 class="text-xl text-gray-600 mt-2">{{ profile.cargo }}</h2>
          <p class="text-gray-500 mt-1">@ {{ profile.organismo }}</p>
        </div>

        <!-- Columna Derecha: Detalles y enlaces -->
        <div class="md:col-span-2">
          <h3 class="text-2xl font-semibold border-b pb-2 mb-4">Detalles</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Extracto del CV</h4>
              <p v-if="profile.cv" class="text-gray-700 mt-1 whitespace-pre-wrap">{{ profile.cv }}</p>
              <span v-else class="text-gray-500">No disponible</span>
            </div>
            <div>
              <h4 class="font-semibold">Redes Profesionales y Personales</h4>
              <div class="flex flex-wrap gap-4 mt-2">
                <a v-if="profile.linkedin_url" :href="profile.linkedin_url" target="_blank" class="flex items-center gap-2 text-gray-700 hover:text-blue-700"><i class="pi pi-linkedin"></i> LinkedIn</a>
                <a v-if="profile.github_url" :href="profile.github_url" target="_blank" class="flex items-center gap-2 text-gray-700 hover:text-black"><i class="pi pi-github"></i> GitHub</a>
                <!-- Añadir más redes sociales aquí -->
              </div>
            </div>
             <div>
              <h4 class="font-semibold">Web Personal</h4>
              <a v-if="profile.web_personal_url" :href="profile.web_personal_url" target="_blank" class="text-blue-500 hover:underline">{{ profile.web_personal_url }}</a>
              <span v-else class="text-gray-500">No disponible</span>
            </div>
          </div>
        </div>
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
