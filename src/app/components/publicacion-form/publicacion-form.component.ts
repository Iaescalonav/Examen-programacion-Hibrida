import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamaraService } from '../../services/camara.service';
import { Publicacion } from '../../models/publicacion.interface';
import { LoadingController, ToastController } from '@ionic/angular/lazy';

/**
 * Componente que encapsula el formulario reactivo de registro de publicaciones.
 * Controla las validaciones de campos obligatorios, longitud mínima de título y descripción,
 * y la integración con el plugin de la cámara para la captura de fotografías.
 */
@Component({
  selector: 'app-publicacion-form',
  templateUrl: './publicacion-form.component.html',
  styleUrls: ['./publicacion-form.component.scss'],
  standalone: false
})
export class PublicacionFormComponent implements OnInit {
  /** Evento que emite los datos validados de la publicación al componente contenedor */
  @Output() formularioGuardado = new EventEmitter<Omit<Publicacion, 'id' | 'fecha'>>();

  /** Formulario reactivo para la publicación */
  formPublicacion!: FormGroup;

  /** Bandera que indica si se intentó enviar el formulario */
  intentoGuardar: boolean = false;

  /** Vista previa de la fotografía capturada */
  fotoPreview: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private camaraService: CamaraService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con sus respectivas validaciones formales:
   * - Título: Obligatorio, mínimo 5 caracteres.
   * - Descripción: Obligatorio, mínimo 20 caracteres.
   * - Foto: Obligatorio (captura mediante cámara).
   */
  private inicializarFormulario(): void {
    this.formPublicacion = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      foto: ['', [Validators.required]]
    });
  }

  /**
   * Activa el plugin de la cámara para capturar una fotografía.
   */
  async capturarFotografia(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Abriendo cámara...',
      duration: 3000
    });
    await loading.present();

    try {
      const dataUrl = await this.camaraService.capturarFotografia();
      await loading.dismiss();

      if (dataUrl) {
        this.fotoPreview = dataUrl;
        this.formPublicacion.patchValue({ foto: dataUrl });
        this.formPublicacion.get('foto')?.markAsTouched();
        this.formPublicacion.get('foto')?.updateValueAndValidity();
      }
    } catch (error) {
      await loading.dismiss();
      console.warn('Captura cancelada o no disponible:', error);
    }
  }

  /**
   * Valida y procesa el envío del formulario.
   */
  async onSubmit(): Promise<void> {
    this.intentoGuardar = true;

    if (this.formPublicacion.invalid) {
      this.formPublicacion.markAllAsTouched();
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos requeridos correctamente.',
        duration: 2500,
        color: 'warning',
        position: 'bottom'
      });
      await toast.present();
      return;
    }

    const valoresFormulario = this.formPublicacion.value;
    this.formularioGuardado.emit({
      titulo: valoresFormulario.titulo,
      descripcion: valoresFormulario.descripcion,
      foto: valoresFormulario.foto
    });
  }

  /**
   * Getters auxiliares para facilitar la lectura y validación en la plantilla HTML.
   */
  get tituloValido(): boolean {
    const control = this.formPublicacion.get('titulo');
    return !!(control && control.invalid && (control.touched || this.intentoGuardar));
  }

  get descripcionValida(): boolean {
    const control = this.formPublicacion.get('descripcion');
    return !!(control && control.invalid && (control.touched || this.intentoGuardar));
  }

  get fotoValida(): boolean {
    const control = this.formPublicacion.get('foto');
    return !!(control && control.invalid && (control.touched || this.intentoGuardar));
  }
}
