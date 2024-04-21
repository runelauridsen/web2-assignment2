import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export async function pokemonDetailsLoader({ params }) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + params.name);
    let pokemon = await response.json();
    return { pokemon };
}

export function PokemonDetalis(props) {
    let { pokemon } = useLoaderData();

    // Did we fetch the data yet?
    if (!pokemon) {
        return (
            <div>
                <p>Loading details...</p>
            </div>
        )
    }
    // Abilities
    let abilityElems = [];
    for (let it of pokemon.abilities) {
        abilityElems.push(<p key={it.ability.name}>{it.ability.name}</p>);
    }

    // Moves
    let moveElems = [];
    for (let it of pokemon.moves) {
        moveElems.push(<p key={it.move.name}>{it.move.name}</p>);
    }

    // Build details div
    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} />
            <p><a href='#'>Back to overview</a></p>

            <h2>Abilities</h2>
            {abilityElems}

            <h2>Moves</h2>
            {moveElems}
        </div>
    );
}

export function PokemonLister() {
    let limit = 10;

    // Reactive state
    let [offset, setOffset] = useState(0);
    let [data, setData] = useState(undefined);

    // Fetch data
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}}&offset=${offset}`)
            .then(response => response.json())
            .then(json => setData(json))
    }, [offset]);

    // Did we get the data yet?
    if (!data) {
        return (
            <div>
                <h1>Pokedex</h1>
                <p>Loading...</p>
            </div>
        )
    }

    // Links to each pokemen
    let rowElems = [];
    for (let it of data.results) {
        rowElems.push(
            <div key={it.name}>
                <a href={'#/details/' + it.name}>{it.name}</a>
            </div>
        );
    }

    // Calculate page offsets
    let totalCount = data.count;
    let totalPages = Math.ceil(totalCount / limit);
    let currentPage = Math.ceil(offset / limit);

    // Build main page div
    return (
        <div>
            <h1>Pokedex</h1>

            <p>Page: {currentPage + 1} / {totalPages}</p>
            <button onClick={() => { setData(undefined); setOffset(offset - limit) }} disabled={offset - limit < 0}>
                <p>Previous</p>
            </button>
            <button onClick={() => { setData(undefined); setOffset(offset + limit) }} disabled={offset + limit >= totalCount}>
                <p>Next</p>
            </button>

            {rowElems}
        </div>
    )
}
