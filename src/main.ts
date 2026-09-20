import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';

// Inicializar elementos personalizados de PWA para permitir el uso de la cámara en entorno web
defineCustomElements(window);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
