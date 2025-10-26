import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '../services/supabaseClient';

export const useProfileStore = defineStore('profiles', () => {
  // --- STATE ---
  const profiles = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchTerm = ref('');

  // --- ACTIONS ---
  async function fetchProfiles() {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: supabaseError } = await supabase.from('personas').select('*');
      if (supabaseError) throw supabaseError;
      profiles.value = data;
    } catch (e) {
      error.value = e;
      console.error("Error fetching profiles:", e.message);
    } finally {
      loading.value = false;
    }
  }

  async function fetchProfileById(id) {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: supabaseError } = await supabase.from('personas').select('*').eq('id', id).single();
      if (supabaseError) throw supabaseError;
      return data;
    } catch (e) {
      error.value = e;
      console.error(`Error fetching profile with id ${id}:`, e.message);
    } finally {
      loading.value = false;
    }
  }

  // --- GETTERS ---
  const filteredProfiles = computed(() => {
    if (!searchTerm.value) {
      return profiles.value;
    }
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    return profiles.value.filter(profile => {
      return (
        profile.nombre.toLowerCase().includes(lowerCaseSearch) ||
        profile.apellidos.toLowerCase().includes(lowerCaseSearch) ||
        profile.organismo.toLowerCase().includes(lowerCaseSearch) ||
        profile.cargo.toLowerCase().includes(lowerCaseSearch)
      );
    });
  });

  const profileCount = computed(() => profiles.value.length);

  return { profiles, loading, error, searchTerm, fetchProfiles, fetchProfileById, filteredProfiles, profileCount };
});
