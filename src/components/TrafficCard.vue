<template>
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 rounded-md p-3" :class="iconBgColor">
            <svg class="h-6 w-6" :class="iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="iconPath"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ title }}
                <span v-if="time" class="text-gray-400">({{ time }})</span>
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">
                  {{ formattedValue }} vehículos
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TrafficCard',
    props: {
      title: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      time: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'today',
        validator: value => ['today', 'yesterday'].includes(value)
      }
    },
    computed: {
      formattedValue() {
        return new Intl.NumberFormat('es-ES').format(this.value)
      },
      iconBgColor() {
        return this.type === 'today' ? 'bg-red-100' : 'bg-blue-100'
      },
      iconColor() {
        return this.type === 'today' ? 'text-red-600' : 'text-blue-600'
      },
      iconPath() {
        return this.type === 'today' 
          ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
          : 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      }
    }
  }
  </script>