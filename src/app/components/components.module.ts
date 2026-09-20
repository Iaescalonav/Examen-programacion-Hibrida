import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { PublicacionItemComponent } from './publicacion-item/publicacion-item.component';
import { PublicacionFormComponent } from './publicacion-form/publicacion-form.component';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { FormatoFechaPipe } from '../pipes/formato-fecha.pipe';

/**
 * Módulo que encapsula y exporta los componentes reutilizables y pipes
 * de la aplicación comunitaria.
 */
@NgModule({
  declarations: [
    PublicacionItemComponent,
    PublicacionFormComponent,
    ConfirmDeleteModalComponent,
    FormatoFechaPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    PublicacionItemComponent,
    PublicacionFormComponent,
    ConfirmDeleteModalComponent,
    FormatoFechaPipe
  ]
})
export class ComponentsModule {}
