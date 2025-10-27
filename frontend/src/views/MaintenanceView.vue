<template>
  <div class="space-y-6">
    <!-- Header con botón de logout y crear -->
    <div class="glass p-4 rounded-lg flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Mantenimiento de Perfiles</h1>
      <div class="flex gap-2">
        <Button label="Nuevo Perfil" icon="pi pi-plus" @click="openCreateDialog" class="p-button-success" />
        <Button label="Cerrar Sesión" icon="pi pi-sign-out" @click="handleLogout" class="p-button-secondary" />
      </div>
    </div>

    <!-- Filtro de búsqueda -->
    <div class="glass p-4 rounded-lg">
      <div class="flex gap-4 items-end">
        <div class="flex-1">
          <span class="p-input-icon-left w-full">
            <InputText v-model="searchFilter" id="searchFilter"
              placeholder="Buscar por nombre, apellidos, organismo o cargo..." class="w-full" />
          </span>
        </div>
        <Button label="Limpiar" icon="pi pi-times" @click="searchFilter = ''" class="p-button-text"
          :disabled="!searchFilter" />
      </div>
    </div>

    <!-- Tabla de perfiles -->
    <div class="glass rounded-lg">
      <DataTable :value="filteredProfiles" :loading="profileStore.loading" paginator :rows="rowsPerPage"
        :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id" class="p-datatable-customers" stripedRows
        @page="onPageChange" @rows-change="onRowsPerPageChange">
        <Column field="id" header="ID" :sortable="true" style="width: 80px"></Column>

        <Column header="Foto" style="width: 100px">
          <template #body="{ data }">
            <Avatar :image="data.foto_url" shape="circle" size="large" />
          </template>
        </Column>

        <Column field="nombre" header="Nombre" :sortable="true"></Column>
        <Column field="apellidos" header="Apellidos" :sortable="true"></Column>
        <Column field="organismo" header="Organismo" :sortable="true"></Column>
        <Column field="cargo" header="Cargo" :sortable="true"></Column>

        <Column header="Acciones" style="width: 150px">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-warning"
                @click="openEditDialog(data)" v-tooltip.top="'Editar'" />
              <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger"
                @click="confirmDelete(data)" v-tooltip.top="'Eliminar'" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Dialog para crear/editar perfil -->
    <Dialog v-model:visible="dialogVisible" :header="isEditing ? 'Editar Perfil' : 'Nuevo Perfil'" :modal="true"
      :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '640px': '95vw' }">
      <div class="space-y-4 mt-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <InputText v-model="formData.nombre" id="nombre" class="w-full" />
          </div>
          <div>
            <label for="apellidos" class="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
            <InputText v-model="formData.apellidos" id="apellidos" class="w-full" />
          </div>
        </div>

        <div>
          <label for="organismo" class="block text-sm font-medium text-gray-700 mb-1">Organismo *</label>
          <InputText v-model="formData.organismo" id="organismo" class="w-full" />
        </div>

        <div>
          <label for="cargo" class="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
          <InputText v-model="formData.cargo" id="cargo" class="w-full" />
        </div>

        <div>
          <label for="cv" class="block text-sm font-medium text-gray-700 mb-1">Extracto del CV</label>
          <Textarea v-model="formData.cv" id="cv" rows="4" class="w-full" />
        </div>

        <div>
          <label for="foto_url" class="block text-sm font-medium text-gray-700 mb-1">URL de la Foto</label>
          <InputText v-model="formData.foto_url" id="foto_url" class="w-full" placeholder="https://..." />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="linkedin_url" class="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <InputText v-model="formData.linkedin_url" id="linkedin_url" class="w-full" placeholder="https://..." />
          </div>
          <div>
            <label for="github_url" class="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <InputText v-model="formData.github_url" id="github_url" class="w-full" placeholder="https://..." />
          </div>
        </div>

        <div>
          <label for="web_personal_url" class="block text-sm font-medium text-gray-700 mb-1">Web Personal URL</label>
          <InputText v-model="formData.web_personal_url" id="web_personal_url" class="w-full"
            placeholder="https://..." />
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="dialogVisible = false" class="p-button-text" />
        <Button :label="isEditing ? 'Actualizar' : 'Crear'" icon="pi pi-check" @click="handleSave" :loading="saving" />
      </template>
    </Dialog>

    <!-- Dialog de confirmación de eliminación -->
    <Dialog v-model:visible="deleteDialogVisible" header="Confirmar Eliminación" :modal="true"
      :style="{ width: '450px' }">
      <div class="flex items-center gap-3">
        <i class="pi pi-exclamation-triangle text-4xl text-red-500"></i>
        <span v-if="profileToDelete">
          ¿Estás seguro de que deseas eliminar el perfil de
          <strong>{{ profileToDelete.nombre }} {{ profileToDelete.apellidos }}</strong>?
        </span>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="deleteDialogVisible = false" class="p-button-text" />
        <Button label="Eliminar" icon="pi pi-trash" @click="handleDelete" class="p-button-danger" :loading="deleting" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '../stores/profiles';
import { useAuthStore } from '../stores/auth';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Avatar from 'primevue/avatar';

const router = useRouter();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const toast = useToast();

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditing = ref(false);
const saving = ref(false);
const deleting = ref(false);
const profileToDelete = ref(null);
const searchFilter = ref('');
const rowsPerPage = ref(10);
const currentPage = ref(0);

// Clave para localStorage
const STORAGE_KEY = 'maintenanceViewState';

// Función para guardar el estado en localStorage
const saveViewState = () => {
  const state = {
    searchFilter: searchFilter.value,
    rowsPerPage: rowsPerPage.value,
    currentPage: currentPage.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Función para restaurar el estado desde localStorage
const restoreViewState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      searchFilter.value = state.searchFilter || '';
      rowsPerPage.value = state.rowsPerPage || 10;
      currentPage.value = state.currentPage || 0;
    } catch (e) {
      console.error('Error al restaurar el estado:', e);
    }
  }
};

// Observar cambios para guardar el estado
watch([searchFilter, rowsPerPage, currentPage], () => {
  saveViewState();
});

// Manejadores de eventos de la tabla
const onPageChange = (event) => {
  currentPage.value = event.page;
};

const onRowsPerPageChange = (event) => {
  rowsPerPage.value = event.rows;
};

const formData = ref({
  nombre: '',
  apellidos: '',
  organismo: '',
  cargo: '',
  cv: '',
  foto_url: '',
  linkedin_url: '',
  github_url: '',
  web_personal_url: '',
});

// Computed para filtrar perfiles
const filteredProfiles = computed(() => {
  if (!searchFilter.value) {
    return profileStore.profiles;
  }
  const lowerCaseSearch = searchFilter.value.toLowerCase();
  return profileStore.profiles.filter(profile => {
    return (
      profile.nombre.toLowerCase().includes(lowerCaseSearch) ||
      profile.apellidos.toLowerCase().includes(lowerCaseSearch) ||
      profile.organismo.toLowerCase().includes(lowerCaseSearch) ||
      profile.cargo.toLowerCase().includes(lowerCaseSearch)
    );
  });
});

const resetForm = () => {
  formData.value = {
    nombre: '',
    apellidos: '',
    organismo: '',
    cargo: '',
    cv: '',
    foto_url: '',
    linkedin_url: '',
    github_url: '',
    web_personal_url: '',
  };
};

const openCreateDialog = () => {
  resetForm();
  isEditing.value = false;
  dialogVisible.value = true;
};

const openEditDialog = (profile) => {
  formData.value = { ...profile };
  isEditing.value = true;
  dialogVisible.value = true;
};

const handleSave = async () => {
  // Validación básica
  if (!formData.value.nombre || !formData.value.apellidos || !formData.value.organismo || !formData.value.cargo) {
    toast.add({ severity: 'warn', summary: 'Campos requeridos', detail: 'Por favor completa todos los campos obligatorios', life: 3000 });
    return;
  }

  saving.value = true;
  try {
    let savedProfile;
    if (isEditing.value) {
      savedProfile = await profileStore.updateProfile(formData.value.id, formData.value);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado correctamente', life: 3000 });
    } else {
      savedProfile = await profileStore.createProfile(formData.value);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil creado correctamente', life: 3000 });
    }
    // Mantener la ficha abierta con los datos del registro guardado
    if (savedProfile) {
      formData.value = { ...savedProfile };
      isEditing.value = true;
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el perfil', life: 3000 });
  } finally {
    saving.value = false;
  }
};

const confirmDelete = (profile) => {
  profileToDelete.value = profile;
  deleteDialogVisible.value = true;
};

const handleDelete = async () => {
  deleting.value = true;
  try {
    await profileStore.deleteProfile(profileToDelete.value.id);
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil eliminado correctamente', life: 3000 });
    deleteDialogVisible.value = false;
    profileToDelete.value = null;
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el perfil', life: 3000 });
  } finally {
    deleting.value = false;
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
  toast.add({ severity: 'info', summary: 'Sesión cerrada', detail: 'Has cerrado sesión correctamente', life: 3000 });
};

onMounted(() => {
  restoreViewState();
  profileStore.fetchProfiles();
});
</script>

<style scoped></style>
