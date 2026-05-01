export function BookCover() {
  return (
    <div className="book-message">
      <img
        src="/img/1-portada/1.webp"
        alt="Portada"
        className="book-message__img"
      />
    </div>
  )
}

/** Page 2: story opening */
export function BookMessage() {
  return (
    <div className="book-message">
      <img
        src="/img/2-cuento/2.webp"
        alt="Bosque"
        className="book-message__img"
      />
    </div>
  )
}

/** Page 3: story continuation */
export function BookStoryContinuation() {
  return (
    <div className="book-message">
      <img
        src="/img/3-continuacion-cuento/3.webp"
        alt="Continuación del cuento"
        className="book-message__img"
      />
    </div>
  )
}
