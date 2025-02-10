<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-primary-lighter">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="flex justify-center">
        <img src="/logo.svg" alt="Calle La Esperanza Logo" class="h-[400px] w-auto"/>
        </div>
        <h1 class="text-4xl font-bold text-primary-dark sm:text-5xl md:text-6xl">
        Calle La Esperanza
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-primary sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Portal informativo sobre el proceso de modificación del sentido de circulación
        </p>
      </div>
      </div>
    </div>

    <!-- Información Principal -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="section-title">
          Recursos y Documentación
        </h2>
        <p class="section-subtitle">
          Espacio de trabajo para el seguimiento del proceso
        </p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <!-- Documentación -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Documentación Técnica</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Acceso a planos, informes técnicos y documentación oficial relacionada con la modificación.
            </dd>
          </div>

          <!-- Cronología -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Cronología del Proceso</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Línea temporal de eventos, reuniones y comunicaciones relacionadas con el cambio.
            </dd>
          </div>

          <!-- Estudios -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Estudios de Impacto</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Análisis de movilidad, mediciones de tráfico y evaluaciones ambientales.
            </dd>
          </div>

          <!-- Marco Legal -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Marco Normativo</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Normativas, ordenanzas y planes de movilidad aplicables.
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Resource Access Section -->
    <div class="bg-primary-lighter">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-primary-light sm:text-4xl">
          <span class="block">Centro de recursos</span>
          <span class="block text-primary-dark">Accede a toda la documentación</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/documents"
              class="btn btn-primary"
            >
              Repositorio de documentos
            </router-link>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <router-link
              to="/contact"
              class="btn btn-outline"
            >
              Contacto
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Section -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <NewsGrid />
    </div>
  </div>
</template>

<script>
import NewsGrid from '../components/NewsGrid.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'HomeView',
  components: {
    NewsGrid
  }
}
</script>
