# Bosque Encantado - Invitación XV Años Sofía

Invitación digital interactiva para los XV años de Sofía, con temática de bosque encantado. Funciona como un libro animado con páginas que se pasan.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 + SCSS
- shadcn/ui + Radix UI
- Phosphor Icons
- GSAP + page-flip

## Comandos

```bash
pnpm install   # instalar dependencias
pnpm dev       # servidor de desarrollo
pnpm build     # build de producción
pnpm preview   # previsualizar el build
```

## Estructura de Páginas

El libro interactivo tiene las siguientes páginas en orden. Los componentes viven en `src/components/sections/` salvo los primeros tres que están en `BookCover.tsx`.

| # | Componente | Descripción |
|---|---|---|
| 1 | `BookCover` | Portada ilustrada del libro |
| 2 | `BookMessage` | Inicio del cuento sobre imagen del bosque |
| 3 | `BookStoryContinuation` | Continuación del cuento en imagen |
| 4 | `Ceremony` | Datos de la misa: iglesia, dirección, horario y link a Maps |
| 5 | `EventDetails` | Detalles de la fiesta: fecha, hora, salón y link de cómo llegar |
| 6 | `Countdown` | Temporizador de cuenta regresiva al evento |
| 7 | `DressCode` | Dress code (Formal y Elegante) |
| 8 | `GiftRegistry` | Regalo |
| 9 | `RSVP` | Confirmación de asistencia por WhatsApp |
| 10 | `ThankYou` | Mensaje de cierre con destellos |
| 11 | `FinalPage` | Página final con imagen de cierre |

## Imágenes

Las imágenes de fondo de cada página están en `public/img/` organizadas por número de sección:

```
public/img/
  1-portada/
  2-cuento/
  3-continuacion-cuento/
  4-ceremonia/
  5-detalles/
  6-cuenta-regresiva/
  7-vestimenta/
  8-regalo/
  9-confirmacion/
  10-despedida/
  11-final/
```
