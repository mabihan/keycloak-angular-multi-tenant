import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeycloakProfile } from "keycloak-js";
import { Realm } from "../auth/auth.component";
import { CustomKeycloakService } from "../../services/custom-keycloak.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() userProfile: KeycloakProfile | null = null;
  @Output() onLogoutEvent: EventEmitter<any>

  tenantName: string

  constructor(private customKeycloakService: CustomKeycloakService ) {
    this.tenantName = this.customKeycloakService.currentRealm.name
    this.userProfile = {}
    this.onLogoutEvent = new EventEmitter<any>()
  }

  logout() {
    this.onLogoutEvent.emit()
  }
}
