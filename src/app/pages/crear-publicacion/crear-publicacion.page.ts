import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/lazy';
import { Publicacion } from '../../models/publicacion.interface';
import { PublicacionesService } from '../../services/publicaciones.service';

/**
 * Controlador de la Vista 2: Creación de nuevos avisos o publicaciones.
 * Se encarga de procesar el evento emitido por el formulario hijo (PublicacionFormComponent),
 * invocar la capa de persistencia a través del servicio PublicacionesService
 * y redirigir al usuario al listado principal.
 */
@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
  standalone: false
})
export class CrearPublicacionPage {

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router,
    private toastController: ToastController
  ) {}

  /**
   * Manejador del evento emitido cuando el formulario es válido y enviado.
   * La fecha y el identificador se asignan automáticamente en el servicio.
   * @param datosFormulario Objeto con título, descripción y fotografía
   */
  async onGuardarPublicacion(
    datosFormulario: Omit<Publicacion, 'id' | 'fecha'>
  ): Promise<void> {
    try {
      const publicacionCreada = await this.publicacionesService.guardarPublicacion(datosFormulario);

      const toast = await this.toastController.create({
        message: `¡Publicación "${publicacionCreada.titulo}" creada con éxito!`,
        duration: 2500,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();

      // Redirigir de regreso al listado de publicaciones
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al guardar la publicación:', error);
      const toast = await this.toastController.create({
        message: 'Ocurrió un error al intentar guardar la publicación.',
        duration: 2500,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    }
  }
}
