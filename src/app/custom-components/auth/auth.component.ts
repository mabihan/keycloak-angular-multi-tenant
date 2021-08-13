import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomKeycloakService } from "../../services/custom-keycloak.service";

interface Panel {
    active: boolean,
    disabled: boolean,
    rotation: number
}

export interface Realm {
    displayName: string | null,
    clientId: string,
    name: string
}

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    @Output() onLoginEvent: EventEmitter<Realm>
    @Output() onRegistrationEvent: EventEmitter<Realm>

    loginPanel: Panel
    registrationPanel: Panel

    loginRealm: any;
    registrationRealm: any;

    realmList: Realm[];

    constructor() {

        this.onLoginEvent = new EventEmitter<Realm>()
        this.onRegistrationEvent = new EventEmitter<Realm>()

        this.loginPanel =
            {
                active: false,
                disabled: false,
                rotation: 0
            }

        this.registrationPanel =
            {
                active: false,
                disabled: false,
                rotation: 0
            }

        this.realmList = [
            {
                clientId: "angular-client-riri",
                name: "riri",
                displayName: "Riri's realm"
            },
            {
                clientId: "angular-client-fifi",
                name: "fifi",
                displayName: "Fifi's realm"
            },
            {
                clientId: "angular-client-loulou",
                name: "loulou",
                displayName: "Loulou's realm"
            }
        ]
    }

    ngOnInit(): void {
    }

    toggleLoginPanel() {

        if (this.loginPanel.active) {
            this.loginPanel.active = false
            this.loginPanel.rotation = 0
        } else {
            this.loginPanel.active = true
            this.loginPanel.rotation = 90

            this.registrationPanel.active = false
            this.registrationPanel.rotation = 0
        }
    }

    toggleRegistrationPanel() {

        if (this.registrationPanel.active) {
            this.registrationPanel.active = false
            this.registrationPanel.rotation = 0
        } else {
            this.loginPanel.active = false
            this.loginPanel.rotation = 0

            this.registrationPanel.active = true
            this.registrationPanel.rotation = 90
        }
    }

    login() {
        this.onLoginEvent.emit(this.realmList.filter(s => s.name === this.loginRealm)[0])
    }

    register() {
        this.onRegistrationEvent.emit(this.realmList.filter(s => s.name === this.registrationRealm)[0])
    }
}
