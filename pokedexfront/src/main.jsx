import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

//Import Tipos
import ListaTipos from './pages/tipos/ListaTipos.jsx';
import FormTipo from './pages/tipos/FormTipo.jsx';
//Import Habilidades
import ListaHabilidades from './pages/habilidades/ListaHabilidades.jsx';
import FormHabilidad from './pages/habilidades/FormHabilidad.jsx';
//Import Pokemones
import ListaPokemones from './pages/pokemonDetalle/ListaPokemones.jsx';
import FormPokemon from './pages/pokemonDetalle/FormPokemon.jsx';
import FotoPokemon from './pages/pokemonDetalle/FotoPokemon.jsx';
import PokemonList from './pages/pokemonDetalle/PokeList.jsx';
import PokeDetail from './pages/pokemonDetalle/PokeDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  //Tipos
  {
    path: "adm/tipo",
    element: <ListaTipos />
  },
  {
    path: "adm/tipo/create",
    element: <FormTipo />
  },
  {
    path: "adm/tipo/:id",
    element: <FormTipo />
  },
  //Habilidades
  {
    path: "adm/habilidad",
    element: <ListaHabilidades />
  },
  {
    path: "adm/habilidad/create",
    element: <FormHabilidad />
  },
  {
    path: "adm/habilidad/:id",
    element: <FormHabilidad />
  },
  //Pokemones
  {
    path: "adm/pokemon",
    element: <ListaPokemones />
  },
  {
    path: "adm/pokemon/create",
    element: <FormPokemon />
  },
  {
    path: "adm/pokemon/:id",
    element: <FormPokemon />
  },
  {
    path: 'adm/pokemon/:id/foto',
    element: <FotoPokemon />
  },
  {
    path: 'pokeLista',
    element: <PokemonList />
  },
  {
    path: 'pokeDetalle/:id',
    element: <PokeDetail />
  },

  {
    path: '*',
    element: <PokemonList />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
