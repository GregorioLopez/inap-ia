<template>
  <div class="space-y-6">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Filtros y Vista</h2>
      <div class="flex justify-between items-center">
        <div class="w-1/2">
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search" />
            <InputText v-model="profileStore.searchTerm" placeholder="Buscar por nombre, organismo, cargo..." class="w-full" />
          </span>
        </div>
        <div class="flex space-x-2">
          <button @click="viewMode = 'table'" :class="{ 'bg-gray-800 text-white': viewMode === 'table', 'bg-gray-200': viewMode !== 'table' }" class="p-2 rounded-md"><i class="pi pi-table"></i></button>
          <button @click="viewMode = 'card'" :class="{ 'bg-gray-800 text-white': viewMode === 'card', 'bg-gray-200': viewMode !== 'card' }" class="p-2 rounded-md"><i class="pi pi-id-card"></i></button>
        </div>
      </div>
    </div>

    <div v-if="viewMode === 'table'">
      <ProfileDataTable :profiles="profileStore.filteredProfiles" :loading="profileStore.loading" />
    </div>
    <div v-else-if="viewMode === 'card'">
      <ProfileCardView :profiles="profileStore.filteredProfiles" :loading="profileStore.loading" />
    </div>

     <div v-if="profileStore.error" class="text-red-500 text-center">
      <p>Error al cargar los perfiles: {{ profileStore.error.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProfileStore } from '../stores/profiles';
import ProfileDataTable from '../components/ProfileDataTable.vue';
import ProfileCardView from '../components/ProfileCardView.vue';
import InputText from 'primevue/inputtext';

const profileStore = useProfileStore();
const viewMode = ref('table'); // 'table' or 'card'

onMounted(() => {
  profileStore.fetchProfiles();
});
</script>
