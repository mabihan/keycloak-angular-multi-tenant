import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthComponent } from './auth/auth.component';
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzTableModule } from "ng-zorro-antd/table";

@NgModule({
  declarations: [
    UserDetailsComponent,
    AuthComponent
  ],
  exports: [
    AuthComponent,
    UserDetailsComponent
  ],
    imports: [
        CommonModule,
        NzCollapseModule,
        NzCardModule,
        NzIconModule,
        NzRadioModule,
        FormsModule,
        NzButtonModule,
        NzAvatarModule,
        NzToolTipModule,
        NzTableModule,
    ]
})
export class CustomComponentsModule { }
