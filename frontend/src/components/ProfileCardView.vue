<template>
  <div v-if="loading" class="text-center">
    <p>Cargando perfiles...</p>
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ProfileCard v-for="profile in profiles" :key="profile.id" :profile="profile" />
  </div>
</template>

<script setup>
import ProfileCard from './ProfileCard.vue';

defineProps({
  profiles: Array,
  loading: Boolean,
});
</script>
