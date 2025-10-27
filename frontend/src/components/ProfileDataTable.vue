<template>
  <div class="card">
    <DataTable :value="profiles" :loading="loading" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" dataKey="id" class="p-datatable-customers">
      
      <Column header="Nombre completo" :sortable="true" sortField="apellidos">
         <template #body="{ data }">
            <div class="flex items-center gap-4">
              <Avatar :image="data.foto_url" shape="circle" size="large" />
              <span>{{ data.nombre }} {{ data.apellidos }}</span>
            </div>
        </template>
      </Column>

      <Column field="organismo" header="Organismo" :sortable="true"></Column>

      <Column field="cargo" header="Cargo" :sortable="true"></Column>

      <Column header="Acciones">
        <template #body="{ data }">
          <router-link :to="`/profile/${data.id}`">
            <Button icon="pi pi-search" class="p-button-rounded p-button-text"></Button>
          </router-link>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

defineProps({
  profiles: Array,
  loading: Boolean,
});
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>