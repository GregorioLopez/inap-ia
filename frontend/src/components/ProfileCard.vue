<template>
  <router-link :to="`/profile/${profile.id}`">
    <Card
      class="glass overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out h-full flex flex-col">
      <template #header>
        <div class="h-32 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <Avatar :image="profile.foto_url" shape="circle" size="xlarge"
            :alt="`Foto de ${profile.nombre} ${profile.apellidos}`" />
        </div>
      </template>
      <template #title>
        <div class="text-center">
          <h3>{{ profile.nombre }} {{ profile.apellidos }}</h3>
        </div>
      </template>
      <template #subtitle>
        <div class="text-center text-gray-600">
          <p>{{ profile.cargo }}</p>
        </div>
      </template>
      <template #content>
        <p class="text-center text-sm text-gray-500">{{ profile.organismo }}</p>
      </template>
      <template #footer>
        <div class="flex justify-center gap-4 mt-auto">
          <a v-if="profile.linkedin_url" :href="profile.linkedin_url" target="_blank" @click.stop
            class="text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded p-1"
            aria-label="Perfil de LinkedIn" rel="noopener noreferrer">
            <i class="pi pi-linkedin text-2xl" aria-hidden="true"></i>
          </a>
          <a v-if="profile.github_url" :href="profile.github_url" target="_blank" @click.stop
            class="text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded p-1"
            aria-label="Perfil de GitHub" rel="noopener noreferrer">
            <i class="pi pi-github text-2xl" aria-hidden="true"></i>
          </a>
        </div>
      </template>
    </Card>
  </router-link>
</template>

<script setup>
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';

defineProps({
  profile: Object,
});
</script>
