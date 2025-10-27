<template>
  <div class="card">
    <DataTable :value="profiles" :loading="loading" paginator :rows="rows" :first="first"
      :rowsPerPageOptions="[5, 10, 20]" dataKey="id" class="p-datatable-customers" @page="onPageChange"
      @rows-change="onRowsPerPageChange" :sortField="sortField" :sortOrder="sortOrder" @sort="onSort">

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
            <Button icon="pi pi-arrow-right" class="p-button-rounded p-button-text"></Button>
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

const props = defineProps({
  profiles: Array,
  loading: Boolean,
  rows: {
    type: Number,
    default: 5,
  },
  first: {
    type: Number,
    default: 0,
  },
  sortField: {
    type: String,
    default: null,
  },
  sortOrder: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['page-change', 'rows-per-page-change', 'sort']);

const onPageChange = (event) => {
  emit('page-change', event.first);
};

const onRowsPerPageChange = (event) => {
  emit('rows-per-page-change', event.rows);
};

const onSort = (event) => {
  emit('sort', {
    sortField: event.sortField,
    sortOrder: event.sortOrder,
  });
};
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>