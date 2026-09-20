# Sistema Comunitario de Avisos "Peor es Nada" 🏘️
### Aplicación Híbrida Móvil y Web (Ionic Framework + Angular + CapacitorJS)
**Taller 4 - Examen Final | Programación Híbrida**

---

## 1. Descripción del Proyecto
Aplicación híbrida desarrollada para la comunidad de **"Peor es Nada"**, orientada a compartir y gestionar avisos vecinales de utilidad pública (mascotas perdidas, hallazgo de documentos y alertas de seguridad ciudadana).

La solución cuenta con:
- **Pantalla 1 (Listado de Publicaciones)**: Muestra avisos registrados con fotografía, título en negrita, fecha formateada mediante Pipe y botón con confirmación modal para eliminación.
- **Pantalla 2 (Formulario de Creación)**: Formulario reactivo con validaciones estrictas (obligatoriedad, título ≥ 5 caracteres, descripción ≥ 20 caracteres), integración con la cámara mediante `@capacitor/camera` y asignación automática de fecha del sistema.
- **Persistencia Local**: Almacenamiento seguro en el dispositivo y navegador mediante `@capacitor/preferences`.
- **Arquitectura Modular**: Descomposición en 3 componentes modulares (`PublicacionItemComponent`, `PublicacionFormComponent`, `ConfirmDeleteModalComponent`), servicios inyectables y pipes personalizados.

---

## 2. Requisitos Previos

Asegúrate de contar con el siguiente entorno instalado en tu sistema:
- **Node.js**: v18.x, v20.x, v22.x o v24.x (LTS recomendada).
- **NPM**: v9.x o superior.
- **Ionic CLI** (opcional para comandos globales, o se utiliza `npx @ionic/cli`):
  ```bash
  npm install -g @ionic/cli
  ```
- **Navegador Web Moderno**: Google Chrome, Microsoft Edge, Mozilla Firefox o Safari.

---

## 3. Instalación y Configuración Paso a Paso

1. Clona o descomprime el proyecto y sitúate en el directorio de la aplicación:
   ```bash
   cd peor-es-nada-app
   ```

2. Instala todas las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Las dependencias nativas de Capacitor ya se encuentran vinculadas en el `package.json`:
   - `@capacitor/core`: Núcleo de Capacitor.
   - `@capacitor/camera`: Plugin de captura de fotografías.
   - `@capacitor/preferences`: Plugin de persistencia local clave-valor.
   - `@ionic/pwa-elements`: Soporte para la interfaz de cámara en navegadores web.

---

## 4. Ejecución en Modo Web

Para iniciar el servidor de desarrollo local y abrir la aplicación en tu navegador:

```bash
# Opción 1: Mediante npm script
npm start

# Opción 2: Mediante Ionic CLI
npx ionic serve
```

La aplicación quedará disponible en:
👉 **`http://localhost:8100`** (o `http://localhost:4200`)

---

## 5. Pruebas Unitarias Automatizadas

El proyecto incluye pruebas unitarias con Vitest y herramientas de testing de Angular:

```bash
npm test -- --watch=false
```

Resultados esperados: **9 tests aprobados en 4 archivos de prueba**.

---

## 6. Estructura del Código Fuente

```
peor-es-nada-app/
├── docs/
│   ├── ARCHITECTURE.md                  # Documento de arquitectura, diagramas y contratos
│   ├── VALIDATION.md                    # Matriz de validación punto a punto (100 pts)
│   └── INFORME_TECNICO.md               # Informe formal en formato Arial 12, interlineado 1.15
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── publicacion-item/        # Componente 1: Ítem de la lista (@Input/@Output, *ngIf)
│   │   │   ├── publicacion-form/        # Componente 2: Formulario reactivo y cámara
│   │   │   ├── confirm-delete-modal/    # Componente 3: Ventana modal de confirmación
│   │   │   └── components.module.ts     # Módulo exportador de componentes y pipes
│   │   ├── models/
│   │   │   └── publicacion.interface.ts # Interfaz del modelo de datos TypeScript
│   │   ├── pages/
│   │   │   └── crear-publicacion/       # Pantalla 2: Vista del formulario
│   │   ├── pipes/
│   │   │   └── formato-fecha.pipe.ts    # Pipe personalizado para transformar fechas (YYYY-MM-DD)
│   │   ├── services/
│   │   │   ├── publicaciones.service.ts # Servicio de gestión y persistencia (Preferences)
│   │   │   └── camara.service.ts        # Servicio de integración con Capacitor Camera
│   │   ├── home/                        # Pantalla 1: Listado principal de avisos (*ngFor, FAB)
│   │   ├── app-routing.module.ts        # Configuración del enrutador
│   │   └── app.module.ts                # Módulo raíz de Angular
│   ├── assets/                          # Imágenes semilla de demostración
│   └── main.ts                          # Punto de entrada con PWA Elements
├── angular.json                         # Configuración de compilación Angular
├── capacitor.config.ts                  # Configuración de Capacitor
└── package.json                         # Dependencias y scripts del proyecto
```

---

## 7. Instrucciones para Limpieza y Entrega en ZIP

Para dar cumplimiento al **Criterio 20** de la pauta de evaluación y asegurar una entrega limpia sin archivos pesados ni temporales:

1. **Eliminar carpetas generadas automáticamente**:
   ```bash
   # En Windows PowerShell (dentro de peor-es-nada-app):
   Remove-Item -Recurse -Force node_modules, .angular, www -ErrorAction SilentlyContinue
   ```

2. **Verificar que solo queden los archivos fuente**:
   Asegúrate de que la carpeta no contenga `node_modules`, `.angular` ni `.git`.

3. **Comprimir en archivo ZIP**:
   Comprime la carpeta con el nombre exigido por la institución:
   `SuNombre_SuApellido.zip`

4. **Entregar el informe formal**:
   Adjuntar el informe generado a partir de `docs/INFORME_TECNICO.md` en formato Word (`.docx`) o PDF sin comprimir con el nombre:
   `SuNombre_SuApellido.pdf` o `SuNombre_SuApellido.docx`.

---

## 8. Cumplimiento de la Pauta de Evaluación (100 Puntos)

| Aspecto Evaluado | Detalle de Implementación | Puntaje |
|------------------|---------------------------|:-------:|
| Proyecto Ionic + Angular plantilla blank | Generado y configurado para entorno web | 5 pts |
| 3 o más componentes modulares | `PublicacionItem`, `PublicacionForm`, `ConfirmDeleteModal` | 5 pts |
| Componentes `ion-img`, `ion-list`, `ion-item`, `ion-input`, `ion-button` | Integrados en vistas y componentes | 5 pts |
| Listas en TypeScript fuertemente tipadas | `listaPublicaciones: Publicacion[]` con métodos inmutables | 5 pts |
| Evento click para borrado | Enlace `(click)="onEliminar()"` en plantilla | 5 pts |
| Formularios para recuperar datos | `ReactiveFormsModule` con `FormBuilder` | 5 pts |
| Decoradores `@Input` y `@Output` | Comunicación padre-hijo bidireccional | 5 pts |
| Servicios inyectables | `PublicacionesService` y `CamaraService` (`providedIn: 'root'`) | 5 pts |
| Directiva estructural `*ngFor` | Renderizado dinámico de la lista de publicaciones | 5 pts |
| Directiva estructural `*ngIf` | Validación de errores, estado vacío y preview de foto | 5 pts |
| Validación de formulario con mensajes explicativos | Título (min 5), Descripción (min 20) y Foto requerida | 5 pts |
| Configuración de persistencia local | `@capacitor/preferences` integrado correctamente | 5 pts |
| Persistencia efectiva de datos | Operaciones `get` y `set` con serialización JSON | 5 pts |
| Instalación del plugin de cámara | `@capacitor/camera` y `@ionic/pwa-elements` | 5 pts |
| Captura de fotografía con plugin | `Camera.getPhoto` con `DataUrl` y selector web | 5 pts |
| Renderizado correcto de la foto | Visualización mediante `ion-img` | 5 pts |
| Pipe de Angular para fecha | `FormatoFechaPipe` en formato `YYYY-MM-DD` | 5 pts |
| Ventana modal de confirmación de borrado | `ConfirmDeleteModalComponent` con `ModalController` | 5 pts |
| Código ordenado, indentación y comentarios | Nomenclatura descriptiva y tipado estricto | 4 pts |
| Código limpio para entrega en ZIP | Guía y scripts de exclusión documentados | 3 pts |
| Informe técnico formal | Redactado en `docs/INFORME_TECNICO.md` (Arial 12, 1.15) | 3 pts |
| **TOTAL** | **Calificación Máxima** | **100 pts** |
