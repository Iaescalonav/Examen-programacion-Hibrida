import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/lazy';

/**
 * Componente modal para confirmar la eliminación de una publicación comunitaria.
 * Cumple con el indicador de logro: "Utiliza una ventana modal para confirmar la eliminación de una publicación".
 */
@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
  standalone: false
})
export class ConfirmDeleteModalComponent {
  /** Título de la publicación a eliminar recibido como parámetro de entrada */
  @Input() publicacionTitulo: string = '';

  constructor(private modalController: ModalController) {}

  /**
   * Cierra el modal cancelando la operación de borrado.
   */
  cancelar(): void {
    this.modalController.dismiss(false);
  }

  /**
   * Cierra el modal confirmando la eliminación.
   */
  confirmar(): void {
    this.modalController.dismiss(true);
  }
}
