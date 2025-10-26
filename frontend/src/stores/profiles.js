import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { mockProfiles } from '../services/mockProfiles';

export const useProfileStore = defineStore('profiles', () => {
  // --- STATE ---
  const profiles = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- ACTIONS ---
  async function fetchProfiles() {
    if (profiles.value.length > 0) return; // No volver a cargar si ya tenemos datos
    loading.value = true;
    error.value = null;
    try {
      // Simulamos una llamada a API
      await new Promise(res => setTimeout(res, 500));
      profiles.value = mockProfiles;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  // --- GETTERS ---
  const profileCount = computed(() => profiles.value.length);

  const getProfileById = computed(() => {
    return (id) => profiles.value.find(p => p.id === id);
  });

  return { profiles, loading, error, fetchProfiles, profileCount, getProfileById };
});
