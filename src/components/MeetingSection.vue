<!-- src/components/MeetingSection.vue -->
<template>
    <div class="my-8 overflow-hidden">
      <!-- Tarjeta con borde gradiente y sombra -->
      <div class="relative rounded-xl border border-gray-200 shadow-lg bg-white overflow-hidden">
        <!-- Borde superior con gradiente -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
        
        <!-- Cabecera con fondo -->
        <div class="bg-gradient-to-br from-primary-lighter to-white px-6 py-6 sm:flex sm:items-center sm:justify-between relative">
          <!-- Elementos decorativos de fondo -->
          <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
            <CircleUserRound class="text-primary w-full h-full" />
          </div>
          
          <!-- Título e info -->
          <div class="z-10">
            <div class="flex items-center space-x-3">
              <Calendar class="h-6 w-6 text-accent" />
              <h2 class="text-xl font-bold text-primary-dark">Reunión informativa vecinal</h2>
            </div>
            <div class="mt-2 flex flex-wrap items-center text-primary">
              <div class="flex items-center mr-4 mt-1">
                <CalendarDays class="h-4 w-4 mr-1" />
                <span class="text-sm font-medium">6 de marzo</span>
              </div>
              <div class="flex items-center mr-4 mt-1">
                <Clock class="h-4 w-4 mr-1" />
                <span class="text-sm font-medium">19:30</span>
              </div>
              <div class="flex items-center mt-1">
                <MapPin class="h-4 w-4 mr-1" />
                <span class="text-sm font-medium">Centro Cívico El Campillo</span>
              </div>
            </div>
          </div>
          
          <!-- Botón de presentación para desktop -->
          <div class="mt-4 sm:mt-0 hidden sm:block">
            <a 
              href="/esperanzakalea/aurkezpena/20250306.html" 
              target="_blank" 
              class="group inline-flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Presentation class="w-5 h-5" />
              <span>Ver presentación</span>
              <ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        
        <!-- Contenido principal -->
        <div class="px-0">
          <div class="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <!-- Columna 1: Orden del día -->
            <div class="p-6">
              <div class="flex items-center space-x-2 mb-4">
                <ListChecks class="h-5 w-5 text-primary" />
                <h3 class="font-semibold text-primary-dark">Orden del día</h3>
              </div>
              <ul class="space-y-3 pl-7">
                <li class="flex items-start">
                  <div class="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <CircleCheck class="h-5 w-5 text-accent" />
                  </div>
                  <span class="ml-3 text-primary">Compartir las acciones realizadas hasta la fecha</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <CircleCheck class="h-5 w-5 text-accent" />
                  </div>
                  <span class="ml-3 text-primary">Explicar la propuesta municipal y sus implicaciones</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <CircleCheck class="h-5 w-5 text-accent" />
                  </div>
                  <span class="ml-3 text-primary">Escuchar perspectivas y preocupaciones de los vecinos</span>
                </li>
              </ul>
            </div>
            
            <!-- Columna 2: Presentación y contacto -->
            <div class="p-6">
              <!-- Presentación -->
              <div class="mb-6">
                <div class="flex items-center space-x-2 mb-4">
                  <Presentation class="h-5 w-5 text-primary" />
                  <h3 class="font-semibold text-primary-dark">Presentación</h3>
                </div>
                <div class="bg-primary-lighter bg-opacity-40 rounded-lg p-4 flex items-center">
                  <img src="/logo.svg" alt="Logo" class="h-10 w-10 mr-3" />
                  <span class="text-primary">Informe sobre el cambio de sentido de la Calle La Esperanza</span>
                </div>
                
                <!-- Botón móvil -->
                <div class="mt-4 sm:hidden">
                  <a 
                    href="/esperanzakalea/aurkezpena/20250306.html" 
                    target="_blank" 
                    class="group w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent text-white rounded-md hover:bg-accent-dark transition-all duration-300"
                  >
                    <Presentation class="w-5 h-5" />
                    <span>Ver presentación</span>
                    <ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              
              <!-- Contacto -->
              <div>
                <div class="flex items-center space-x-2 mb-3">
                  <AtSign class="h-5 w-5 text-primary" />
                  <h3 class="font-semibold text-primary-dark">Contacto</h3>
                </div>
                <a 
                  href="mailto:calle.esperanza.kalea@gmail.com" 
                  class="inline-flex items-center text-primary hover:text-primary-dark group"
                >
                  <Mail class="h-4 w-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                  <span class="border-b border-primary border-dashed">calle.esperanza.kalea@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pie con llamada a la participación -->
        <div class="bg-primary-lighter bg-opacity-30 px-6 py-4 border-t border-gray-200">
          <div class="flex items-center">
            <Users class="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <p class="text-primary text-sm">
              <span class="font-medium">¡Participa!</span> Es importante contar con representación de los diferentes portales de la calle.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { 
    Calendar, 
    CalendarDays, 
    Clock, 
    MapPin, 
    ListChecks,
    CircleCheck,
    Presentation,
    ArrowRight,
    Mail,
    AtSign,
    Users,
    CircleUserRound
  } from 'lucide-vue-next';
  </script>
  
  <style scoped>
  /* Añadir efectos sutiles */
  .rounded-xl {
    transition: transform 0.3s ease;
  }
  .rounded-xl:hover {
    transform: translateY(-2px);
  }
  </style>