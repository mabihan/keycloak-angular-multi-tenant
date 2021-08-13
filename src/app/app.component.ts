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

        let action = this.getActionFromUrl(window.location.href)
        let realm = this.getRealmFromUrl(window.location.href)
        let clientId = this.getClientIdFromUrl(window.location.href)

        console.log("Bootstrapping application")

        if (action && clientId && realm) {

            console.log("Initializing Keycloak with URL parameters :")
            console.log("action : " + action)
            console.log("clientId : " + clientId)
            console.log("realm : " + realm)

            if (action === ActionType.login || action === ActionType.register) {
                this.customKeycloakService.initializeKeycloak({ name: realm, clientId: clientId, displayName: null })
                    .then( () => {
                        console.log("sending user to keycloak login page")
                        this.customKeycloakService.keycloakInstance.login(
                            {
                                redirectUri: `http://localhost:4200/gateway?action=return&clientid=${clientId}&realm=${realm}`
                            }
                        ).then()
                    })
            }
            else if (action === ActionType.return) {
                this.customKeycloakService.initializeKeycloak({ name: realm, clientId: clientId, displayName: null })
                    .then( () => {
                        // this.router.navigate(["home"]).then()
                    })
            }
        }

        this.router.navigate(["home"]).then()
    }

    ngOnInit(): void {
    }

    getActionFromUrl(url: string) {
        let re = /action=([a-z0-9\-]+)\&?/
        let results = re.exec(url)
        if (results) {
            return results[1]
        } else {
            return ""
        }
    }

    getRealmFromUrl(url: string) {
        let re = /realm=([a-z0-9\-]+)\&?/
        let results = re.exec(url)
        if (results) {
            return results[1]
        } else {
            return ""
        }
    }

    getClientIdFromUrl(url: string) {
        let re = /clientid=([a-z0-9\-]+)\&?/
        let results = re.exec(url)
        if (results) {
            return results[1]
        } else {
            return ""
        }
    }
}
