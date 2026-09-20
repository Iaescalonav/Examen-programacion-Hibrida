import { FormatoFechaPipe } from './formato-fecha.pipe';

describe('FormatoFechaPipe', () => {
  let pipe: FormatoFechaPipe;

  beforeEach(() => {
    pipe = new FormatoFechaPipe();
  });

  it('debería instanciar el pipe correctamente', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería formatear correctamente una fecha ISO a formato YYYY-MM-DD', () => {
    const resultado = pipe.transform('2024-01-18T10:30:00.000Z');
    expect(resultado).toBe('2024-01-18');
  });

  it('debería retornar cadena vacía cuando el valor es nulo o indefinido', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
