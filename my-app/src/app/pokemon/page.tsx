"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component from next/image
import "../pokemon/style/style.css"; // Link CSS

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export default function Page() {
  const [pokemonData, setPokemonData] = React.useState<
    { name: string; url: string; artworkUrl?: string }[]
  >([]);
  const [nextUrl, setNextUrl] = React.useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [loading, setLoading] = React.useState(false);

  const fetchPokemonDetail = async (url: string) => {
    const response = await fetch(url);
    const data: PokemonDetail = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  };

  const loadPokemon = React.useCallback(
    async (initial = false) => {
      if ((nextUrl && !loading) || initial) {
        setLoading(true);
        try {
          const response = await fetch(nextUrl!);
          const data: PokemonList = await response.json();

          const detailedPokemon = await Promise.all(
            data.results.map(async (pokemon) => {
              const artworkUrl = await fetchPokemonDetail(pokemon.url);
              return { ...pokemon, artworkUrl };
            })
          );

          if (initial) {
            setPokemonData(detailedPokemon);
          } else {
            const newPokemons = detailedPokemon.filter(
              (newPokemon) =>
                !pokemonData.some(
                  (existingPokemon) => existingPokemon.url === newPokemon.url
                )
            );
            setPokemonData((prevData) => [...prevData, ...newPokemons]);
          }
          setNextUrl(data.next);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    },
    [nextUrl, loading, pokemonData, fetchPokemonDetail]
  );

  React.useEffect(() => {
    loadPokemon(true);
  }, [loadPokemon]);

  const DisplayPokemonList = () => {
    return (
      <div className="pokemon-grid">
        {pokemonData.map((p, index) => (
          <div className="pokemon-card" key={index}>
            <p>{p.name}</p>
            <Link href={`/pokemon/${p.name}`}>
              <Image
                src={p.artworkUrl!}
                alt={p.name}
                width={200} // Adjust width and height as needed
                height={200}
                layout="responsive" // Or another layout that suits your needs
              />
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Pokemon Data</h1>
      <DisplayPokemonList />
      {nextUrl && !loading && (
        <button onClick={() => loadPokemon()} className="view-more-button">
          View More
        </button>
      )}
      {loading && <p>Loading...</p>}
    </>
  );
}
