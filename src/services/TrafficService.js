export async function obtenerFlujoVehiculos(date) {
    const fechaFormateada = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    let paginaActual = 1;
    let totalPaginas;
    let sumaTotalVehiculos = 0;
  
    try {
      do {
        const url = `https://api.euskadi.eus/traffic/v1.0/flows/byDate/${fechaFormateada}/byMeter/4284?_page=${paginaActual}`;
        const respuesta = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
  
        if (!respuesta.ok) {
          throw new Error(`Error: ${respuesta.status}`);
        }
  
        const datos = await respuesta.json();
        sumaTotalVehiculos += datos.flows.reduce((suma, flujo) => suma + parseInt(flujo.totalVehicles, 10), 0);
        
        totalPaginas = datos.totalPages;
        paginaActual++;
      } while (paginaActual <= totalPaginas);
  
      return sumaTotalVehiculos;
    } catch (error) {
      throw new Error(`Error al obtener datos: ${error.message}`);
    }
  }
  
  export async function obtenerDatosTrafico() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    try {
      const [todayTraffic, yesterdayTraffic] = await Promise.all([
        obtenerFlujoVehiculos(today),
        obtenerFlujoVehiculos(yesterday)
      ]);
  
      return {
        today: todayTraffic,
        yesterday: yesterdayTraffic,
        currentTime: today.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
    } catch (error) {
      throw error;
    }
  }