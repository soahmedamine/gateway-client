import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { KeycloakServiceService } from './keycloak-service.service';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
 
 
 