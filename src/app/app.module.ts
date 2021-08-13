import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomKeycloakService } from './services/custom-keycloak.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSpinModule } from "ng-zorro-antd/spin";
import { CustomComponentsModule } from "./custom-components/custom-components.module";
import { NzButtonModule } from "ng-zorro-antd/button";
import { PagesModule } from './pages/pages.module';
import { NzLayoutModule } from "ng-zorro-antd/layout";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        KeycloakAngularModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzSpinModule,
        CustomComponentsModule,
        NzButtonModule,
        PagesModule,
        NzLayoutModule,
    ],
  providers: [
    CustomKeycloakService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
