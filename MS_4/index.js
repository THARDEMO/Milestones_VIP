//IMPORT ALL COMPONENTS NEEDED
import { componentGames } from "./components/comp_listings/games.js";
import { componentCharacters } from "./components/comp_listings/characters.js";
import { componentCreate } from "./components/comp_create/create.js";
import { componentCompiler } from "./components/comp_compiler/compiler.js";
import { componentControls } from './components/comp_create/controls.js'

const components = [componentGames, componentCharacters, componentCreate, componentControls, componentCompiler];
components.forEach( component => component.preRender());