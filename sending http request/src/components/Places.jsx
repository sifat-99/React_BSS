export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,
}) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">Loading...</p>}
      {!isLoading && places?.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`https://sending-http-request-5s8ezocen-sifats-projects-c0b91c2d.vercel.app/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
