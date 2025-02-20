<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-primary-lighter">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex justify-center">
            <img src="/logo.svg" alt="Calle La Esperanza Logo" class="h-96 w-auto"/>
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

    <!-- Situación Actual -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl">
          Situación Actual
        </h2>
        <p class="mt-4 max-w-2xl text-xl text-primary lg:mx-auto">
          El cambio de sentido está generando problemas significativos que requieren una solución urgente
        </p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <!-- Congestión -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Aumento del tráfico</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              La Calle Francia ha experimentado un aumento del 23% en el tráfico durante los dos últimos años, alcanzando 3.710.206 vehículos en 2024.
            </dd>
          </div>

          <!-- Seguridad -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Riesgos de seguridad</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              Se han generado puntos conflictivos para peatones y conductores, especialmente en la zona peatonal cercana al Artium.
            </dd>
          </div>

          <!-- Impacto ZBE -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Impacto en la ZBE</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              La medida contradice el Real Decreto 1052/2022 sobre Zonas de Bajas Emisiones, que busca evitar la concentración de tráfico en áreas adyacentes.
            </dd>
          </div>

          <!-- Participación -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Falta de participación</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              No hubo un proceso de participación ciudadana efectivo, y muchos vecinos se enteraron del cambio tras su implementación.
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Documentación Section -->
    <div class="bg-primary-lighter">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-primary-light sm:text-4xl">
          <span class="block">Documentación completa</span>
          <span class="block text-primary-dark">Accede a toda la información del proceso</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/documents"
              class="btn btn-primary"
            >
              Ver documentación
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