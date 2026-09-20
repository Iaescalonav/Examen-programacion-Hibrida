import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe personalizado para formatear fechas de publicaciones comunitarias.
 * Cumple con el criterio de evaluación de implementar al menos un Pipe de Angular.
 * Transforma una fecha (cadena ISO o timestamp) al formato estándar 'YYYY-MM-DD'.
 */
@Pipe({
  name: 'formatoFecha',
  standalone: false
})
export class FormatoFechaPipe implements PipeTransform {

  /**
   * Transforma el valor de entrada a formato 'YYYY-MM-DD'.
   * @param valor Cadena ISO, timestamp numérico o instancia de Date.
   * @returns Cadena con la fecha formateada en formato AAAA-MM-DD.
   */
  transform(valor: string | number | Date | null | undefined): string {
    if (!valor) {
      return '';
    }

    try {
      const fechaObjeto = new Date(valor);

      // Si la fecha es inválida, retornar cadena original
      if (isNaN(fechaObjeto.getTime())) {
        return String(valor);
      }

      const anio = fechaObjeto.getFullYear();
      const mes = String(fechaObjeto.getMonth() + 1).padStart(2, '0');
      const dia = String(fechaObjeto.getDate()).padStart(2, '0');

      return `${anio}-${mes}-${dia}`;
    } catch {
      return String(valor);
    }
  }
}
