import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from "keycloak-js";
import { KeycloakService } from "keycloak-angular";
import { CustomKeycloakService } from "../../services/custom-keycloak.service";
import { Realm } from "../../custom-components/auth/auth.component";
import { Router } from "@angular/router";

export enum ActionType {
    login       = "login",
    register    = "register",
    return    = "return",
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public isLoading = false;
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;

    constructor(
                private readonly keycloak: KeycloakService,
                private customKeycloakService: CustomKeycloakService,
                private router: Router) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.customKeycloakService.isLoggedInWithDelay()
            .then((value: boolean) => {
                this.isLoggedIn = value
                if (this.isLoggedIn) {
                    this.customKeycloakService.keycloakInstance.loadUserProfile()
                        .then((value: KeycloakProfile) => {
                            this.userProfile = value
                        })
                }
            })
            .finally(() => {
                this.isLoading = false;
            })
    }

    public logout() {
        this.customKeycloakService.keycloakInstance.logout().then()
    }

    handleLogin($event: Realm) {
        this.router.navigate(['/gateway'],
            {
                queryParams: {
                    action: ActionType.login,
                    realm: $event.name,
                    clientid: $event.clientId
                }
            }).then()
    }

    handleRegistration($event: Realm) {
        this.router.navigate(['/gateway'],
            {
                queryParams: {
                    action: ActionType.register,
                    realm: $event.name,
                    clientid: $event.clientId
                }
            }).then()
    }
}
