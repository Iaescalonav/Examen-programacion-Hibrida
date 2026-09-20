import { TestBed } from '@angular/core/testing';
import { PublicacionesService } from './publicaciones.service';

describe('PublicacionesService', () => {
  let service: PublicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionesService);
  });

  it('debería ser creado e inyectado correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista inicial de publicaciones', async () => {
    const publicaciones = await service.obtenerPublicaciones();
    expect(Array.isArray(publicaciones)).toBe(true);
    expect(publicaciones.length).toBeGreaterThan(0);
  });

  it('debería guardar una nueva publicación asignando fecha e ID automáticamente', async () => {
    const nueva = await service.guardarPublicacion({
      titulo: 'Test Aviso Unitario',
      descripcion: 'Esta es una descripción de prueba para verificar persistencia.',
      foto: 'data:image/png;base64,sample'
    });

    expect(nueva.id).toBeDefined();
    expect(nueva.fecha).toBeDefined();
    expect(nueva.titulo).toBe('Test Aviso Unitario');

    const lista = await service.obtenerPublicaciones();
    const encontrada = lista.find(p => p.id === nueva.id);
    expect(encontrada).toBeDefined();

    // Limpiar eliminando la publicación creada
    await service.eliminarPublicacion(nueva.id);
  });
});
