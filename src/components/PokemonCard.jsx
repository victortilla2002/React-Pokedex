// src/components/PokemonCard.jsx

import { useRef } from "react";
import PropTypes from "prop-types";
import "../styles/PokemonCard.css";

export function PokemonCard({ pokemon }) {
  const cardRef = useRef(null);

  // Función para manejar el movimiento del ratón y aplicar la animación de paralelaje
  const handleMouseMove = (event) => {
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    const x = event.clientX - cardRect.left; // Coordenada X del ratón
    const y = event.clientY - cardRect.top; // Coordenada Y del ratón
    const centerX = cardRect.width / 2; // Centro de la tarjeta en X
    const centerY = cardRect.height / 2; // Centro de la tarjeta en Y

    // Rotación inversa (para que gire en la dirección contraria)
    const rotateX = ((y - centerY) / centerY) * -30; // Invertimos el signo de rotateX
    const rotateY = ((x - centerX) / centerX) * 30; // Invertimos el signo de rotateY

    // Aplicamos la rotación
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // Función para resetear la rotación cuando el ratón salga de la tarjeta
  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; // Resetear la rotación
  };

  const capitalizeName = (name) => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div
      ref={cardRef}
      className="pokemon-card"
      style={{
        "--card-color": pokemon.types[0].color || "rgba(255, 215, 0, 0.8)", // Usamos 'color' para fondo y glow
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div id="divImg">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <h3>
        #{pokemon.id} - {capitalizeName(pokemon.name)}
      </h3>
      <div id="cardBody">
        <div className="types">
          {/* Renderizamos todos los tipos de un Pokémon */}
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="type"
              style={{ backgroundColor: type.color }}
            >
              {type.name}
            </span>
          ))}
        </div>
        <div className="stats">
          <span>HP: {pokemon.stats.hp}</span>
          <span>Attack: {pokemon.stats.attack}</span>
          <span>Defense: {pokemon.stats.defense}</span>
          <span>Speed: {pokemon.stats.speed}</span>
          <span>Special Attack: {pokemon.stats.specialAttack}</span>
          <span>Special Defense: {pokemon.stats.specialDefense}</span>
        </div>
      </div>
    </div>
  );
}

// Validación de las props con PropTypes
PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired, // Aseguramos que types sea un arreglo
    stats: PropTypes.shape({
      hp: PropTypes.number.isRequired,
      attack: PropTypes.number.isRequired,
      defense: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      specialAttack: PropTypes.number.isRequired,
      specialDefense: PropTypes.number.isRequired,
    }).isRequired,
    color: PropTypes.string, // color ahora es la propiedad única
  }).isRequired,
};
