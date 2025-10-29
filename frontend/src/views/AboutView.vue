<template>
  <div class="max-w-4xl mx-auto">
    <div class="glass rounded-lg p-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">Acerca de Perfiles INAP-IA</h1>

      <div class="space-y-6 text-gray-700">
        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-3">¿Qué es Perfiles INAP-IA?</h2>
          <p class="leading-relaxed">
            Perfiles INAP-IA es una aplicación web moderna diseñada para gestionar y visualizar
            perfiles profesionales de manera eficiente y atractiva. Desarrollada con las últimas
            tecnologías web, ofrece una experiencia de usuario fluida y responsive.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-3">Características principales</h2>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Visualización de perfiles profesionales en múltiples formatos (tabla, tarjetas, carousel)</li>
            <li>Búsqueda y filtrado avanzado de perfiles</li>
            <li>Páginas de detalle completas con información profesional</li>
            <li>Sistema de gestión y mantenimiento de datos</li>
            <li>Diseño responsive y accesible</li>
            <li>Integración con redes profesionales (LinkedIn, GitHub)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-3">Tecnologías utilizadas</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="font-semibold">Vue 3</p>
              <p class="text-sm text-gray-600">Framework Frontend</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="font-semibold">Vite</p>
              <p class="text-sm text-gray-600">Build Tool</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="font-semibold">Tailwind CSS</p>
              <p class="text-sm text-gray-600">Estilos</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="font-semibold">PrimeVue</p>
              <p class="text-sm text-gray-600">Componentes UI</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="font-semibold">Pinia</p>
              <p class="text-sm text-gray-600">State Management</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="font-semibold">Supabase</p>
              <p class="text-sm text-gray-600">Backend & Database</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-3">Prueba la Sección de Administración</h2>
          <p class="leading-relaxed mb-4">
            Perfiles INAP-IA incluye una sección administrativa completa para gestionar los perfiles profesionales.
            Puedes acceder a ella desde el enlace "Administración" en la cabecera.
          </p>
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
            <p class="font-semibold text-blue-900 mb-2">Instrucciones de acceso:</p>
            <ol class="list-decimal list-inside space-y-2 text-blue-800">
              <li>Haz clic en el enlace <strong>"Administración"</strong> en la cabecera</li>
              <li>Se abrirá la página de login</li>
              <li>Introduce la contraseña: <code
                  class="bg-white px-2 py-1 rounded font-mono text-sm border border-blue-300">xeh02PGK64$£</code></li>
              <li>¡Acceso concedido! Ahora puedes gestionar los perfiles</li>
            </ol>
          </div>
          <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p class="font-semibold text-green-900 mb-2">Funcionalidades disponibles:</p>
            <ul class="list-disc list-inside space-y-2 text-green-800">
              <li><strong>Crear</strong> nuevos perfiles profesionales</li>
              <li><strong>Editar</strong> perfiles existentes</li>
              <li><strong>Eliminar</strong> perfiles con confirmación</li>
              <li><strong>Buscar y filtrar</strong> perfiles por nombre, apellidos, organismo o cargo</li>
              <li><strong>Paginación</strong> para gestionar grandes volúmenes de datos</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-3">Contacto</h2>
          <p class="leading-relaxed">
            Para más información sobre este proyecto, por favor contacta con el equipo de desarrollo
            del INAP-IA.
          </p>
        </section>
      </div>

      <div class="mt-8 text-center">
        <router-link to="/"
          class="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped></style>
