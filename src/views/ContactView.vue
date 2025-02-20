// ContactView.vue
<template>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-8">Contacto</h1>

    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start space-x-4">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-medium text-primary-dark mb-3">¿Quieres contactar con nosotros?</h2>
          <p class="text-primary mb-4">
            Puedes enviarnos un correo electrónico a la siguiente dirección:
          </p>
          <a 
            href="mailto:calle.esperanza.kalea@gmail.com" 
            class="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition-colors"
          >
            <span>calle.esperanza.kalea@gmail.com</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p class="mt-6 text-sm text-primary-light">
            Estamos trabajando en un formulario de contacto que estará disponible próximamente. Mientras tanto, no dudes en escribirnos directamente por correo electrónico.
          </p>
        </div>
      </div>
    </div>
    
    <!-- <form @submit.prevent="submitForm" class="max-w-lg mx-auto space-y-6">
      <div class="flex flex-col">
        <label for="name" class="text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name" 
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div class="flex flex-col">
        <label for="email" class="text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div class="flex flex-col">
        <label for="message" class="text-sm font-medium text-gray-700 mb-1">Mensaje</label>
        <textarea 
          id="message" 
          v-model="form.message" 
          required
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <button 
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Enviar
      </button>
    </form>

    <div 
      v-if="statusMessage" 
      class="mt-4 text-center text-sm font-medium"
      :class="{'text-green-600': statusMessage.includes('éxito'), 'text-red-600': !statusMessage.includes('éxito')}"
    >
      {{ statusMessage }}
    </div> -->
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ContactView',
  setup() {
    const form = ref({ name: '', email: '', message: '' })
    const statusMessage = ref('')

    const submitForm = async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.value)
        })
        if (response.ok) {
          statusMessage.value = '¡Enviado con éxito!'
          // Limpia el formulario si quieres
          form.value = { name: '', email: '', message: '' }
        } else {
          statusMessage.value = 'Hubo un problema al enviar.'
        }
      } catch (error) {
        statusMessage.value = 'Error de red o servidor.'
      }
    }

    return { form, statusMessage, submitForm }
  }
}

</script>