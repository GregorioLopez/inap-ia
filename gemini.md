# Plan de Implementación: Aplicación de Perfiles Profesionales

## 1. Resumen del Proyecto

- **Objetivo**: Crear una Prueba de Concepto (PoC) de una aplicación web para mantener y presentar perfiles profesionales.
- **Principios Clave**: Completamente accesible, diseño responsive, moderno y minimalista. Coste de hosting y recursos debe ser cero (uso de tiers gratuitos).

## 2. Arquitectura (Opción 1 - BaaS)

- **Modelo**: Backend-as-a-Service (BaaS) para máxima velocidad de desarrollo.
- **Backend**: **Supabase**.
  - **Base de Datos**: PostgreSQL gestionada por Supabase.
  - **API**: Se utilizará la API RESTful generada automáticamente por Supabase para el CRUD de la tabla `personas`.
  - **Administración de Datos**: La gestión de datos (añadir, editar, borrar personas) se realizará directamente desde el panel de control web de Supabase.
- **Frontend**: **Vue.js**.
  - **Estilos**: **Tailwind CSS** para un diseño utility-first.
  - **Componentes**: Se usará una librería de componentes moderna compatible con Vue y Tailwind, como **PrimeVue**, para acelerar el desarrollo de la UI.
  - **Hosting**: **Netlify**.
- **Seguridad**:
  - El acceso a la API de Supabase desde el frontend se protegerá con un token de API (anon key) que se almacenará como una variable de entorno en Netlify.

## 3. Estructura de la Tabla `personas` en Supabase

- `id` (uuid, primary key)
- `created_at` (timestamp)
- `nombre` (text)
- `apellidos` (text)
- `foto_url` (text)
- `organismo` (text)
- `cargo` (text)
- `cv` (text)
- `linkedin_url` (text)
- `github_url` (text)
- `twitter_url` (text)
- `instagram_url` (text)
- `facebook_url` (text)
- `web_personal_url` (text)

## 4. Flujo de Desarrollo

1.  **Configuración de Supabase**: Crear el proyecto y la tabla `personas`.
2.  **Inicialización del Frontend**: Configurar un nuevo proyecto Vue.js con Vite, instalar Tailwind CSS y la librería de componentes.
3.  **Servicio de API**: Crear un servicio en Vue (`services/supabase.js`) para encapsular las llamadas a la API de Supabase.
4.  **Desarrollo de Vistas y Componentes**:
    - `HomeView`: Contendrá el listado principal, buscador, etc.
    - `PersonDetailView`: Mostrará la ficha completa de una persona.
    - `PersonCard`: Componente para la vista de listado/carousel.
    - `Carousel`: Componente para la navegación entre fichas.
    - `Navbar` / `Footer`: Componentes de layout.
5.  **Integración y Pruebas**: Conectar los componentes a los datos de Supabase.
6.  **Despliegue**: Publicar en Netlify, configurando las variables de entorno.
