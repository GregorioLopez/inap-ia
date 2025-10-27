# Auditoría de Accesibilidad - Portfolio INAP-IA

## 🔍 Problemas Encontrados (WCAG 2.1 AA)

### 1. **Contraste de Color - CRÍTICO**
- **Ubicación**: HomeView, botones de vista
- **Problema**: Botones con `bg-gray-200` sobre fondo claro tienen bajo contraste
- **Solución**: Aumentar contraste a mínimo 4.5:1 para texto pequeño

### 2. **Etiquetas de Formulario - CRÍTICO**
- **Ubicación**: HomeView, MaintenanceView, LoginView
- **Problema**: InputText sin etiquetas `<label>` asociadas
- **Solución**: Añadir `<label>` con `for` atributo

### 3. **Navegación por Teclado - IMPORTANTE**
- **Ubicación**: TheHeader, botones de vista
- **Problema**: Botones sin `aria-label` descriptivos
- **Solución**: Añadir `aria-label` a todos los botones de icono

### 4. **Indicadores de Estado - IMPORTANTE**
- **Ubicación**: HomeView, botones de vista
- **Problema**: No hay indicador visual/aria de qué vista está activa
- **Solución**: Añadir `aria-current="page"` o `aria-pressed`

### 5. **Texto Alternativo - IMPORTANTE**
- **Ubicación**: ProfileCard, ProfileCarouselView
- **Problema**: Imágenes sin `alt` text
- **Solución**: Añadir atributo `alt` descriptivo a avatares

### 6. **Estructura de Encabezados - IMPORTANTE**
- **Ubicación**: Varias vistas
- **Problema**: Falta de jerarquía de encabezados (h1, h2, h3)
- **Solución**: Usar encabezados semánticos correctamente

### 7. **Anuncios de Carga - IMPORTANTE**
- **Ubicación**: ProfileDataTable, ProfileCardView
- **Problema**: No hay anuncio de estado de carga para lectores de pantalla
- **Solución**: Añadir `aria-live="polite"` y `aria-busy`

### 8. **Botones sin Texto - IMPORTANTE**
- **Ubicación**: HomeView (botones de vista), MaintenanceView (acciones)
- **Problema**: Botones solo con iconos sin texto accesible
- **Solución**: Añadir `aria-label` o texto visible

### 9. **Diálogos Modales - IMPORTANTE**
- **Ubicación**: MaintenanceView
- **Problema**: Falta `role="dialog"` y gestión de foco
- **Solución**: Verificar que PrimeVue Dialog tiene atributos ARIA correctos

### 10. **Contraste en Efecto Glass - IMPORTANTE**
- **Ubicación**: Todas las cards
- **Problema**: Texto sobre fondo glass translúcido puede tener bajo contraste
- **Solución**: Asegurar contraste mínimo 4.5:1

### 11. **Animaciones - IMPORTANTE**
- **Ubicación**: App.vue (fondo animado)
- **Problema**: Animación continua puede causar mareos
- **Solución**: Respetar `prefers-reduced-motion`

### 12. **Errores de Validación - IMPORTANTE**
- **Ubicación**: LoginView, MaintenanceView
- **Problema**: Mensajes de error sin asociación clara con campos
- **Solución**: Usar `aria-describedby` para asociar errores

## 📊 Resumen por Severidad

- **CRÍTICO**: 2 problemas
- **IMPORTANTE**: 10 problemas
- **MENOR**: Varios

## ✅ Acciones Recomendadas

1. Añadir etiquetas ARIA a todos los elementos interactivos
2. Mejorar contraste de colores
3. Implementar navegación por teclado completa
4. Añadir texto alternativo a imágenes
5. Respetar preferencias de movimiento reducido
6. Mejorar estructura semántica HTML

