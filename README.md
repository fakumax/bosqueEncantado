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
| 1 | `BookCover` | Video de bosque con animación "Érase una vez…" |
| 2 | `BookMessage` | Prólogo de la historia sobre imagen del bosque |
| 3 | `BookSofia` | Nombre de Sofía animado, texto de invitación y fecha |
| 4 | `Ceremony` | Datos de la misa: iglesia, dirección, horario y link a Maps |
| 5 | `Countdown` | Temporizador de cuenta regresiva al evento |
| 6 | `EventDetails` | Fecha, hora, salón y link de cómo llegar |
| 7 | `RSVP` | Confirmación de asistencia por WhatsApp |
| 8 | `DressCode` | Dress code (Formal y Elegante) + datos de mesa de regalos |
| 9 | `ThankYou` | Mensaje de cierre con destellos |
| 10 | *(inline en App.tsx)* | Página final con imagen de cierre |

## Imágenes

Las imágenes de fondo de cada página están en `public/img/` organizadas por número de sección:

```
public/img/
  1-video/
  2-cuento/
  3-invitacion/
  4-ceremonia/
  5-cuenta-regresiva/
  6-detalles/
  7-confirmacion/
  8-vestimentaRegalo/   ← dress code + regalos en una sola página
  9-despedida/
  10-final/
```
