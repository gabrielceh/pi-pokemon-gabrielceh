import bugImg from '../assets/img/types/Pokemon_Type_Icon_Bug.svg';
import darkImg from '../assets/img/types/Pokemon_Type_Icon_Dark.svg';
import dragonImg from '../assets/img/types/Pokemon_Type_Icon_Dragon.svg';
import electricImg from '../assets/img/types/Pokemon_Type_Icon_Electric.svg';
import fairyImg from '../assets/img/types/Pokemon_Type_Icon_Fairy.svg';
import fightingImg from '../assets/img/types/Pokemon_Type_Icon_Fighting.svg';
import fireImg from '../assets/img/types/Pokemon_Type_Icon_Fire.svg';
import flyingImg from '../assets/img/types/Pokemon_Type_Icon_Flying.svg';
import ghostImg from '../assets/img/types/Pokemon_Type_Icon_Ghost.svg';
import grassImg from '../assets/img/types/Pokemon_Type_Icon_Grass.svg';
import groundImg from '../assets/img/types/Pokemon_Type_Icon_Ground.svg';
import idceImg from '../assets/img/types/Pokemon_Type_Icon_Ice.svg';
import normalImg from '../assets/img/types/Pokemon_Type_Icon_Normal.svg';
import poisonImg from '../assets/img/types/Pokemon_Type_Icon_Poison.svg';
import psychicImg from '../assets/img/types/Pokemon_Type_Icon_Psychic.svg';
import rockImg from '../assets/img/types/Pokemon_Type_Icon_Rock.svg';
import steelImg from '../assets/img/types/Pokemon_Type_Icon_Steel.svg';
import waterImg from '../assets/img/types/Pokemon_Type_Icon_Water.svg';
import unknown from '../assets/img/pokemon-unknown.png';

export const typesIcons = (type) => {
	const typesPokemon = {
		bug: bugImg,
		dark: darkImg,
		dragon: dragonImg,
		electric: electricImg,
		fairy: fairyImg,
		fighting: fightingImg,
		fire: fireImg,
		flying: flyingImg,
		ghost: ghostImg,
		grass: grassImg,
		ground: groundImg,
		ice: idceImg,
		normal: normalImg,
		poison: poisonImg,
		psychic: psychicImg,
		rock: rockImg,
		steel: steelImg,
		water: waterImg,
	};

	return Object.hasOwnProperty.call(typesPokemon, type) ? typesPokemon[type] : unknown;
};
