<template>
  <div class="carousel-container">
    <Carousel :value="profiles" :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="5000"
      :showNavigators="hasFilter" :showIndicators="hasFilter" v-model:page="currentPage" @page="onCarouselPage">
      <template #item="slotProps">
        <div class="carousel-item-wrapper p-4">
          <div class="glass rounded-lg overflow-hidden max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
              <!-- Columna Izquierda: Foto y datos principales -->
              <div class="md:col-span-1 flex flex-col items-center text-center">
                <Avatar :image="slotProps.data.foto_url" shape="circle" size="xlarge" class="w-40 h-40 text-6xl mb-4" />
                <h2 class="text-2xl font-bold text-gray-800">
                  {{ slotProps.data.nombre }} {{ slotProps.data.apellidos }}
                </h2>
                <h3 class="text-lg text-gray-600 mt-2">{{ slotProps.data.cargo }}</h3>
                <p class="text-gray-500 mt-1">@ {{ slotProps.data.organismo }}</p>
              </div>

              <!-- Columna Derecha: Detalles -->
              <div class="md:col-span-2">
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Detalles</h3>

                <div class="space-y-4">
                  <div v-if="slotProps.data.cv">
                    <h4 class="font-semibold text-gray-700">Extracto del CV</h4>
                    <p class="text-gray-600 mt-1 line-clamp-4">{{ slotProps.data.cv }}</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-gray-700 mb-2">Redes Profesionales</h4>
                    <div class="flex flex-wrap gap-3">
                      <a v-if="slotProps.data.linkedin_url" :href="slotProps.data.linkedin_url" target="_blank"
                        class="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors">
                        <i class="pi pi-linkedin text-xl"></i>
                        <span>LinkedIn</span>
                      </a>
                      <a v-if="slotProps.data.github_url" :href="slotProps.data.github_url" target="_blank"
                        class="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
                        <i class="pi pi-github text-xl"></i>
                        <span>GitHub</span>
                      </a>
                      <a v-if="slotProps.data.web_personal_url" :href="slotProps.data.web_personal_url" target="_blank"
                        class="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors">
                        <i class="pi pi-globe text-xl"></i>
                        <span>Web Personal</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <router-link :to="`/profile/${slotProps.data.id}`"
                    class="inline-block bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    Ver perfil completo
                    <i class="pi pi-arrow-right ml-2"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>

    <!-- Botón de ficha aleatoria cuando no hay filtro -->
    <div v-if="!hasFilter && profiles.length > 0" class="flex justify-center mt-6">
      <Button label="Cargar ficha aleatoria" icon="pi pi-random" @click="loadRandomProfile" class="p-button-lg" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Carousel from 'primevue/carousel';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

const currentPage = ref(0);

const props = defineProps({
  profiles: {
    type: Array,
    required: true,
  },
  hasFilter: {
    type: Boolean,
    default: false,
  },
});

// Manejador de cambio de página del carousel
const onCarouselPage = (event) => {
  currentPage.value = event.page;
};

// Función para cargar una ficha aleatoria
const loadRandomProfile = () => {
  if (props.profiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * props.profiles.length);
    currentPage.value = randomIndex;
  }
};
</script>

<style scoped>
.carousel-container {
  min-height: 500px;
}

.carousel-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 450px;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Personalización de los controles del carousel */
:deep(.p-carousel-indicators) {
  padding: 1rem;
}

:deep(.p-carousel-indicator button) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #cbd5e0;
}

:deep(.p-carousel-indicator.p-highlight button) {
  background-color: #1f2937;
}
</style>
