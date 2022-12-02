// Este codigo opcional se usa para registrar un trabajador de servicio.
// register() no es llamado por defecto.

// Esto hace que la app fucione mas rapido en posteriores visitas en produccion y ademas tiene compatibilidades offline
// Sin embargo, esto significa que desarrolladores y usuarios solo podran 
// desplegar sus actualizaciones en posteriores visitas a la pagina, despues de que todas las pestañas sean cerradas,
// desde que se almacenaron previamente en caché los recursos se actualizaran en segundo plano 

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] es la direccion IPv6 de localhost.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 esta considerado localhost para IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // El constructor URL esta disponible para todos los buscadores que soporten SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Esta corriendo en localhost. Comprobamos si un trabajador existe o no.
        checkValidServiceWorker(swUrl, config);

        // Añade un registro adicional a localhost Add some additional logging to localhost.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // No es localhost. Solo registra un trabajador
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // En este punto, se ha buscado el contenido acualizado, pero el trabajador anterior
              // seguira entregando contenido hasta que se cierren todas las pestañas del cliente.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Comprueba si el trabajador puede ser encontrado. Si no se puede, recarga la página.
  fetch(swUrl)
    .then(response => {
      // Aseguramos que el trabajador existe, y que realmente tiene un archivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No se encuentra el trabajador, por tanto hay que recargar la página.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
