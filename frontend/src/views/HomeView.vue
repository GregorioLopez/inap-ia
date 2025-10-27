<template>
  <div class="space-y-6">
    <div class="glass p-4 rounded-lg">
      <div class="flex justify-between items-center gap-4">
        <div class="flex-1">
          <span class="p-input-icon-left w-full">
            <InputText id="searchInput" v-model="profileStore.searchTerm"
              placeholder="Buscar por nombre, organismo, cargo..." class="w-full"
              aria-label="Campo de búsqueda de perfiles" />
          </span>
        </div>
        <Button label="Limpiar" icon="pi pi-times" @click="clearSearch" class="p-button-text"
          :disabled="!profileStore.searchTerm" aria-label="Limpiar búsqueda" />
        <fieldset class="flex space-x-2">
          <legend class="sr-only">Cambiar vista de perfiles</legend>
          <button @click="viewMode = 'table'"
            :class="{ 'bg-gray-800 text-white': viewMode === 'table', 'bg-gray-400 text-gray-800': viewMode !== 'table' }"
            class="p-2 rounded-md hover:cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            :aria-pressed="viewMode === 'table'" aria-label="Vista de tabla">
            <i class="pi pi-table" aria-hidden="true"></i>
          </button>
          <button @click="viewMode = 'card'"
            :class="{ 'bg-gray-800 text-white': viewMode === 'card', 'bg-gray-400 text-gray-800': viewMode !== 'card' }"
            class="p-2 rounded-md hover:cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            :aria-pressed="viewMode === 'card'" aria-label="Vista de tarjetas">
            <i class="pi pi-id-card" aria-hidden="true"></i>
          </button>
          <button @click="viewMode = 'carousel'"
            :class="{ 'bg-gray-800 text-white': viewMode === 'carousel', 'bg-gray-400 text-gray-800': viewMode !== 'carousel' }"
            class="p-2 rounded-md hover:cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            :aria-pressed="viewMode === 'carousel'" aria-label="Vista de carousel">
            <i class="pi pi-images" aria-hidden="true"></i>
          </button>
        </fieldset>
      </div>
    </div>

    <div v-if="viewMode === 'table'">
      <ProfileDataTable :key="`table-${rowsPerPage}`" :profiles="profileStore.filteredProfiles"
        :loading="profileStore.loading" :rows="rowsPerPage" :first="firstRow" :sortField="sortField"
        :sortOrder="sortOrder" @page-change="onPageChange" @rows-per-page-change="onRowsPerPageChange" @sort="onSort" />
    </div>
    <div v-else-if="viewMode === 'card'">
      <ProfileCardView :profiles="profileStore.filteredProfiles" :loading="profileStore.loading" />
    </div>
    <div v-else-if="viewMode === 'carousel'">
      <ProfileCarouselView :profiles="profileStore.filteredProfiles" :hasFilter="!!profileStore.searchTerm" />
    </div>

    <div v-if="profileStore.error" class="text-red-500 text-center">
      <p>Error al cargar los perfiles: {{ profileStore.error.message }}</p>
    </div>

    <!-- Botón flotante para ir arriba -->
    <Transition name="fade">
      <button v-if="showScrollToTop" @click="scrollToTop"
        class="fixed bottom-8 right-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        aria-label="Ir al inicio de la página">
        <i class="pi pi-arrow-up" aria-hidden="true"></i>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useProfileStore } from '../stores/profiles';
import ProfileDataTable from '../components/ProfileDataTable.vue';
import ProfileCardView from '../components/ProfileCardView.vue';
import ProfileCarouselView from '../components/ProfileCarouselView.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const profileStore = useProfileStore();
const viewMode = ref('table'); // 'table', 'card' or 'carousel'
const rowsPerPage = ref(5);
const firstRow = ref(0);
const sortField = ref(null);
const sortOrder = ref(null);
const showScrollToTop = ref(false);
let isRestoring = false; // Flag para evitar guardar durante la restauración

// Clave para localStorage
const STORAGE_KEY = 'homeViewState';

// Función para guardar el estado en localStorage
const saveViewState = () => {
  if (isRestoring) return; // No guardar mientras se restaura
  const state = {
    viewMode: viewMode.value,
    searchTerm: profileStore.searchTerm,
    rowsPerPage: rowsPerPage.value,
    firstRow: firstRow.value,
    sortField: sortField.value,
    sortOrder: sortOrder.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Función para restaurar el estado desde localStorage
const restoreViewState = () => {
  isRestoring = true;
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      viewMode.value = state.viewMode || 'table';
      profileStore.searchTerm = state.searchTerm || '';
      rowsPerPage.value = state.rowsPerPage || 5;
      firstRow.value = state.firstRow || 0;
      sortField.value = state.sortField || null;
      sortOrder.value = state.sortOrder || null;
    } catch (e) {
      console.error('Error al restaurar el estado:', e);
    }
  }
  isRestoring = false;
};

// Manejadores de eventos de paginación
const onPageChange = (first) => {
  firstRow.value = first;
  saveViewState();
};

const onRowsPerPageChange = (rows) => {
  rowsPerPage.value = rows;
  firstRow.value = 0; // Resetear a la primera página al cambiar el número de filas
  saveViewState();
};

// Manejador de eventos de ordenación
const onSort = (event) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
  saveViewState();
};

// Función para limpiar el buscador
const clearSearch = () => {
  profileStore.searchTerm = '';
  saveViewState();
};

// Función para ir al inicio de la página
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Función para manejar el scroll
const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 300;
};

// Observar cambios en viewMode y searchTerm para guardar el estado
watch([viewMode, () => profileStore.searchTerm], () => {
  saveViewState();
});

onMounted(() => {
  restoreViewState();
  profileStore.fetchProfiles();
  window.addEventListener('scroll', handleScroll);
});

// Limpiar el listener al desmontar
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
