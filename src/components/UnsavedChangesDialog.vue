<!-- components/UnsavedChangesDialog.vue -->
<template>
    <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Overlay de fondo -->
      <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>
  
      <!-- Contenedor del diálogo -->
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-lg font-semibold leading-6 text-gray-900">
                Cambios no guardados
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Hay cambios no guardados. Si sales ahora, perderás todos los cambios realizados.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
              @click="$emit('discard')"
            >
              Salir sin guardar
            </button>
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark sm:w-auto"
              @click="$emit('save')"
            >
              Guardar y salir
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              @click="$emit('update:modelValue', false)"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UnsavedChangesDialog',
    props: {
      modelValue: {
        type: Boolean,
        required: true
      }
    },
    emits: ['update:modelValue', 'save', 'discard']
  }
  </script>