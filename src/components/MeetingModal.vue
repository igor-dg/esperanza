<!-- src/components/MeetingModal.vue -->
<template>
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Overlay con efecto de blur -->
        <div class="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity" @click="close"></div>
  
        <!-- Modal centrado con diseño moderno -->
        <div class="flex items-center justify-center min-h-screen py-4 px-4">
          <div class="relative bg-white dark:bg-gray-100 rounded-xl overflow-hidden shadow-2xl transform transition-all max-w-xl w-full my-8">
            <!-- Banner superior con gradiente -->
            <div class="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
            
            <!-- Botón de cierre -->
            <button 
              @click="close" 
              class="absolute top-3 right-3 text-gray-400 hover:text-primary focus:outline-none z-10"
              aria-label="Cerrar"
            >
              <X class="h-6 w-6" />
            </button>
            
            <!-- Contenido principal -->
            <div class="pt-8 px-6 pb-6">
              <!-- Encabezado con icono y título -->
              <div class="flex items-center space-x-3 mb-5">
                <div class="flex-shrink-0 p-2 bg-primary-lighter rounded-lg">
                  <Calendar class="h-8 w-8 text-primary" />
                </div>
                <h2 class="text-2xl font-bold text-primary-dark" id="modal-title">
                  Reunión informativa vecinal
                </h2>
              </div>
              
              <!-- Línea decorativa -->
              <div class="w-16 h-1 bg-accent mb-6"></div>
              
              <!-- Contenido informativo -->
              <div class="space-y-5">
                <p class="text-primary text-lg">
                  Te invitamos a la reunión sobre el cambio de sentido de la Calle La Esperanza:
                </p>
                
                <!-- Tarjetas de información -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="bg-primary-lighter bg-opacity-50 p-4 rounded-lg flex flex-col items-center">
                    <CalendarDays class="h-8 w-8 text-primary mb-2" />
                    <span class="font-semibold text-primary-dark">Jueves</span>
                    <span class="text-lg font-bold text-primary">6 de marzo</span>
                  </div>
                  
                  <div class="bg-primary-lighter bg-opacity-50 p-4 rounded-lg flex flex-col items-center">
                    <Clock class="h-8 w-8 text-primary mb-2" />
                    <span class="font-semibold text-primary-dark">Hora</span>
                    <span class="text-lg font-bold text-primary">19:30</span>
                  </div>
                  
                  <div class="bg-primary-lighter bg-opacity-50 p-4 rounded-lg flex flex-col items-center">
                    <MapPin class="h-8 w-8 text-primary mb-2" />
                    <span class="font-semibold text-primary-dark">Lugar</span>
                    <span class="text-lg font-bold text-primary">C.C. El Campillo</span>
                  </div>
                </div>
                
                <p class="text-primary">
                  En esta reunión compartiremos información sobre las acciones realizadas y los próximos pasos a seguir.
                </p>
                
                <!-- CTA Presentación con efectos -->
                <div class="mt-6">
                  <a 
                    href="/esperanzakalea/aurkezpena/20250306.html" 
                    target="_blank" 
                    class="presentation-button group w-full flex items-center justify-center space-x-2 p-4 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    <Presentation class="h-5 w-5 group-hover:animate-pulse" />
                    <span>Ver presentación</span>
                    <ArrowRight class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Footer con acciones -->
            <div class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse sm:justify-between space-y-3 sm:space-y-0">
              <button 
                type="button" 
                class="w-full sm:w-auto flex justify-center items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg shadow transition-colors"
                @click="close"
              >
                <Check class="h-5 w-5" />
                <span>Entendido</span>
              </button>
              
              <button 
                type="button" 
                class="w-full sm:w-auto flex justify-center items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                @click="neverShowAgain"
              >
                <EyeOff class="h-5 w-5" />
                <span>No mostrar de nuevo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { 
    X, 
    Calendar, 
    CalendarDays, 
    Clock, 
    MapPin, 
    Check, 
    EyeOff,
    Presentation,
    ArrowRight
  } from 'lucide-vue-next';
  
  const isOpen = ref(false);
  const STORAGE_KEY = 'meetingModalHidden';
  
  const close = () => {
    isOpen.value = false;
  };
  
  const neverShowAgain = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    close();
  };
  
  onMounted(() => {
    // Comprueba si el usuario ha elegido no mostrar el modal de nuevo
    const isHidden = localStorage.getItem(STORAGE_KEY);
    if (!isHidden) {
      setTimeout(() => {
        isOpen.value = true;
      }, 500); // Pequeño retraso para mejor experiencia
    }
  });
  </script>
  
  <style scoped>
  .presentation-button {
    position: relative;
    overflow: hidden;
  }
  
  .presentation-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  .presentation-button:hover::before {
    left: 100%;
  }
  </style>