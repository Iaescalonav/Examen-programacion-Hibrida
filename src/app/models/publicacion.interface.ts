/**
 * Interfaz que define el modelo de datos para una Publicación o Aviso Comunitario
 * en la plataforma 'Peor es Nada'.
 */
export interface Publicacion {
  /** Identificador único alfanumérico de la publicación (generado por timestamp o UUID) */
  id: string;

  /** Título descriptivo del aviso (mínimo 5 caracteres) */
  titulo: string;

  /** Fecha de registro de la publicación (ISO String, asignada automáticamente) */
  fecha: string;

  /** Detalle o descripción completa del aviso (mínimo 20 caracteres) */
  descripcion: string;

  /** Fotografía capturada mediante el plugin Camera (Base64 data URL o ruta local) */
  foto: string;
}
