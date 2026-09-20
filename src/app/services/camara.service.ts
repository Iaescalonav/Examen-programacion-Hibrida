import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/**
 * Servicio encargado de la abstracción y gestión de la cámara fotográfica
 * mediante el plugin oficial @capacitor/camera.
 */
@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  /**
   * Captura una fotografía utilizando la cámara del dispositivo o selector web.
   * Utiliza CameraResultType.DataUrl para obtener directamente la cadena en formato Base64.
   * @returns Promesa que resuelve la imagen en formato DataUrl (Base64)
   */
  async capturarFotografia(): Promise<string> {
    try {
      const imagenCapturada = await Camera.getPhoto({
        quality: 85,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });

      return imagenCapturada.dataUrl || '';
    } catch (error) {
      console.warn('El usuario canceló la captura o la cámara no está disponible:', error);
      throw error;
    }
  }
}
