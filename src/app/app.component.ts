import { Component, OnInit } from '@angular/core';
import { CustomKeycloakService } from "./services/custom-keycloak.service";
import { ActionType } from "./pages/home/home.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    constructor(private customKeycloakService: CustomKeycloakService, private router: Router) {

        let action = this.getParameterFromUrl("action")
        let realm = this.getParameterFromUrl("realm")
        let clientId = this.getParameterFromUrl("clientid")

        if (action && clientId && realm) {

            if (action === ActionType.login || action === ActionType.register) {
                this.customKeycloakService.initializeKeycloak({ name: realm, clientId: clientId, displayName: null })
                    .then( () => {
                        this.customKeycloakService.keycloakInstance.login(
                            {
                                action: action,
                                redirectUri: `http://localhost:4200/gateway?action=return&clientid=${clientId}&realm=${realm}`
                            }
                        ).then()
                    })
            }
            else if (action === ActionType.return) {
                this.customKeycloakService.initializeKeycloak({ name: realm, clientId: clientId, displayName: null })
                    .then( () => {
                        this.customKeycloakService.currentRealm = {
                            name: realm,
                            clientId: clientId, displayName: null
                        }
                    })
            }
        }
        this.router.navigate(["home"]).then()
    }

    ngOnInit(): void {
    }

    getParameterFromUrl(parameter: string) {
        let re = new RegExp(parameter + "=([a-z0-9\-]+)\&?")
        let results = re.exec(window.location.href)

        if (results) {
            return results[1]
        } else {
            return ""
        }
    }
}
