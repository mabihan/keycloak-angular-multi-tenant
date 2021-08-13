import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeycloakProfile } from "keycloak-js";
import { Realm } from "../auth/auth.component";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() userProfile: KeycloakProfile | null = null;
  @Output() onLogoutEvent: EventEmitter<any>

  constructor() {
    this.userProfile = {}
    this.onLogoutEvent = new EventEmitter<any>()
  }

  ngOnInit(): void {
  }

  logout() {
    this.onLogoutEvent.emit()
  }
}
