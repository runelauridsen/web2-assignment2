import React from 'react';
import ReactDOM from 'react-dom/client';
import * as App from './App';

import {
    createBrowserRouter,
    RouterProvider,
    createHashRouter,
} from "react-router-dom";


// https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages
const router = createHashRouter([
    {
        path: "/",
        element: <App.PokemonLister />
    },
    {
        path: "details/:name",
        element: <App.PokemonDetalis />,
        loader: App.pokemonDetailsLoader,
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
