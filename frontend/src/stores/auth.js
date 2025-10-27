import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  // Cargar estado de autenticación desde localStorage
  const loadAuthState = () => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      isAuthenticated.value = true;
    }
  };

  // Inicializar al crear el store
  loadAuthState();

  const login = (password) => {
    if (password === adminPassword) {
      isAuthenticated.value = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem('isAuthenticated');
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
});

