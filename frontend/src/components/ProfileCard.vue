<template>
  <router-link :to="`/profile/${profile.id}`">
    <Card class="overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out h-full flex flex-col">
      <template #header>
        <div class="h-32 bg-gray-200 flex items-center justify-center">
          <Avatar :image="profile.foto_url" shape="circle" size="xlarge" />
        </div>
      </template>
      <template #title>
        <div class="text-center">{{ profile.nombre }} {{ profile.apellidos }}</div>
      </template>
      <template #subtitle>
        <div class="text-center text-gray-600">{{ profile.cargo }}</div>
      </template>
      <template #content>
        <p class="text-center text-sm text-gray-500">@ {{ profile.organismo }}</p>
      </template>
      <template #footer>
        <div class="flex justify-center gap-4 mt-auto">
          <a :href="profile.linkedin_url" target="_blank" @click.stop class="text-gray-500 hover:text-gray-800"><i class="pi pi-linkedin text-2xl"></i></a>
          <a :href="profile.github_url" target="_blank" @click.stop class="text-gray-500 hover:text-gray-800"><i class="pi pi-github text-2xl"></i></a>
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
