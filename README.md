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


