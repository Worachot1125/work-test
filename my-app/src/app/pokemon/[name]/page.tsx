"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"; // Import the Image component from next/image
import "../style/style2.css";

interface Pokemon {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ stat: { name: string }; base_stat: number }>;
}

export default function Page() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter(); // Hook for navigation

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokémon not found.</p>;

  return (
    <div className="pokemon-details">
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width={400} // Adjust width and height as needed
        height={400} // Adjust width and height as needed
        layout="responsive" // Or another layout that suits your needs
      />
      <div className="detail-style">
        <h2>Abilities</h2>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        <h2>Stats</h2>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <button onClick={() => router.back()} className="go-back-button">Go Back</button>
      </div>
    </div>
  );
}
