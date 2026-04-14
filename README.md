# Bosque Encantado - Invitación XV Años Sofía

Invitación digital interactiva para los XV años de Sofía, con temática de bosque encantado.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- SCSS
- Radix UI + Phosphor Icons

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Estructura de Pantallas (Páginas)

El libro interactivo se compone de las siguientes pantallas en este orden cronológico (ubicadas en `src/components/sections/` y `src/App.tsx`):

1. **BookCover (Introducción)**: Video de bosque de fondo con la animación del texto "Érase una vez...".
2. **BookMessage (El Cuento)**: Imagen estática del bosque junto al prólogo de la historia ("En un reino envuelto por la bruma...").
3. **BookSofia (Portada Principal)**: Nombre de la quinceañera animado con destellos, texto de invitación temático ("Sigue el rastro de polvo de hadas...") y fecha del gran día.
4. **Ceremony (Ceremonia)**: Información de la misa: nombre de la iglesia, dirección, horario y botón de Google Maps para saber cómo llegar.
5. **Countdown (Cuenta Regresiva)**: Temporizador con los días, horas, minutos y segundos que faltan para el evento.
6. **EventDetails (Detalles y Ubicación)**: Información de fecha, hora, lugar del salón, dirección y un botón interactivo de "Cómo llegar" al salón de fiesta.
7. **RSVP (Confirmación)**: Formulario interactivo o contacto de WhatsApp donde los invitados confirman su asistencia.
8. **DressCode (Vestimenta)**: Tarjeta detallando "Formal y Elegante", resaltando que se reserva el color verde para la cumpleañera.
9. **GiftRegistry (Mesa de Regalos)**: Sección con datos bancarios o información sobre la modalidad de obsequios (lluvia de sobres).
10. **ThankYou (Despedida)**: Pantalla de cierre con destellos y un mensaje final de cariño.
