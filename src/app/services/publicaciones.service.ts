import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from '../models/publicacion.interface';

/**
 * Servicio centralizado para la administración y persistencia local
 * de las publicaciones de la comunidad 'Peor es Nada'.
 * Utiliza @capacitor/preferences para garantizar compatibilidad multiplataforma
 * tanto en almacenamiento nativo móvil como en almacenamiento web (IndexedDB/LocalStorage).
 */
@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  /** Clave única de almacenamiento para las publicaciones en Preferences */
  private readonly STORAGE_KEY = 'storage_publicaciones_peor_es_nada';

  /** Caché en memoria de las publicaciones */
  private listaPublicaciones: Publicacion[] = [];

  /**
   * Promesa de inicialización que garantiza que los datos se carguen
   * exactamente una vez y que todos los métodos públicos esperen a que
   * la carga termine antes de operar sobre la lista.
   */
  private promesaInicializacion: Promise<void>;

  constructor() {
    // Almacenar la promesa para que otros métodos puedan esperarla
    this.promesaInicializacion = this.inicializarAlmacenamiento();
  }

  /**
   * Inicializa la lectura de datos desde el plugin de Preferences.
   * Si no existen datos almacenados, siembra los datos iniciales de demostración
   * correspondientes a las publicaciones de ejemplo del requerimiento.
   */
  private async inicializarAlmacenamiento(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: this.STORAGE_KEY });
      if (value) {
        const parsed = JSON.parse(value) as Publicacion[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.listaPublicaciones = parsed;
        } else {
          // El almacenamiento contenía un arreglo vacío (posible estado corrupto previo) → re-sembrar
          this.sembrarDatosIniciales();
          await this.persistirEnAlmacenamiento();
        }
      } else {
        // No hay datos almacenados → sembrar datos de demostración
        this.sembrarDatosIniciales();
        await this.persistirEnAlmacenamiento();
      }
    } catch (error) {
      console.error('Error al inicializar el almacenamiento de publicaciones:', error);
      this.listaPublicaciones = [];
    }
  }

  /**
   * Carga los datos de demostración iniciales que representan las
   * publicaciones de ejemplo del requerimiento (Figuras 1 y 2).
   */
  private sembrarDatosIniciales(): void {
    this.listaPublicaciones = [
      {
        id: 'pub-001',
        titulo: 'Mascota perdida',
        fecha: '2024-01-18T10:30:00.000Z',
        descripcion: 'Perrito salchicha perdido en esquina Manuel Montt con los Olivos. Por favor avisar a la brevedad ante cualquier avistamiento.',
        foto: 'assets/images/mascota-perdida.png'
      },
      {
        id: 'pub-002',
        titulo: 'Cédula encontrada',
        fecha: '2024-01-09T14:15:00.000Z',
        descripcion: 'Se ha encontrado cédula de identidad en las inmediaciones de la plaza comunitaria a nombre de ciudadano de la comuna.',
        foto: 'assets/images/cedula-encontrada.png'
      }
    ];
  }

  /**
   * Espera a que la inicialización del almacenamiento haya terminado.
   * Todos los métodos públicos deben llamar a este método antes de operar.
   */
  private async esperarInicializacion(): Promise<void> {
    await this.promesaInicializacion;
  }

  /**
   * Guarda el estado actual de la lista de publicaciones en el almacenamiento persistente.
   */
  private async persistirEnAlmacenamiento(): Promise<void> {
    try {
      await Preferences.set({
        key: this.STORAGE_KEY,
        value: JSON.stringify(this.listaPublicaciones)
      });
    } catch (error) {
      console.error('Error al persistir publicaciones en Preferences:', error);
      throw error;
    }
  }

  /**
   * Retorna todas las publicaciones almacenadas.
   * Espera a que la inicialización termine para garantizar datos completos.
   * @returns Promesa con la lista de publicaciones
   */
  async obtenerPublicaciones(): Promise<Publicacion[]> {
    await this.esperarInicializacion();
    // Retorna una copia para evitar mutaciones externas indeseadas
    return [...this.listaPublicaciones];
  }

  /**
   * Agrega y persiste una nueva publicación comunitaria.
   * La fecha se asigna de forma automática con la fecha y hora actual del sistema.
   * @param nuevaPublicacion Objeto con título, descripción y fotografía
   * @returns Promesa con la publicación registrada
   */
  async guardarPublicacion(
    nuevaPublicacion: Omit<Publicacion, 'id' | 'fecha'>
  ): Promise<Publicacion> {
    await this.esperarInicializacion();

    const publicacionCreada: Publicacion = {
      id: 'pub_' + Date.now().toString(),
      titulo: nuevaPublicacion.titulo.trim(),
      fecha: new Date().toISOString(),
      descripcion: nuevaPublicacion.descripcion.trim(),
      foto: nuevaPublicacion.foto
    };

    // Agregar al inicio de la lista para mostrar la más reciente primero
    this.listaPublicaciones.unshift(publicacionCreada);
    await this.persistirEnAlmacenamiento();

    return publicacionCreada;
  }

  /**
   * Elimina una publicación por su identificador único y actualiza el almacenamiento.
   * @param id Identificador de la publicación a eliminar
   * @returns Promesa booleana indicando éxito de la operación
   */
  async eliminarPublicacion(id: string): Promise<boolean> {
    await this.esperarInicializacion();

    const indice = this.listaPublicaciones.findIndex(p => p.id === id);
    if (indice !== -1) {
      this.listaPublicaciones.splice(indice, 1);
      await this.persistirEnAlmacenamiento();
      return true;
    }

    return false;
  }
}
