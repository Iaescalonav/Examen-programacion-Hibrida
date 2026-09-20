import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publicacion } from '../../models/publicacion.interface';

/**
 * Componente hijo responsable de renderizar una publicación individual en la lista.
 * Implementa @Input para recibir los datos de la publicación y @Output para emitir
 * la acción de eliminación hacia el componente contenedor padre.
 */
@Component({
  selector: 'app-publicacion-item',
  templateUrl: './publicacion-item.component.html',
  styleUrls: ['./publicacion-item.component.scss'],
  standalone: false
})
export class PublicacionItemComponent {
  /** Publicación recibida desde el componente padre */
  @Input() publicacion!: Publicacion;

  /** Evento emitido al presionar el botón de eliminación */
  @Output() eliminarClick = new EventEmitter<Publicacion>();

  /**
   * Dispara el evento de eliminación hacia el componente padre con los datos del aviso actual.
   */
  onEliminar(): void {
    if (this.publicacion) {
      this.eliminarClick.emit(this.publicacion);
    }
  }
}
