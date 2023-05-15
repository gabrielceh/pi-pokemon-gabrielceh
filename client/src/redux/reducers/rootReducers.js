import { combineReducers } from 'redux';
import { errorReducer } from './apiError.reducer';
import { loaderReducer } from './loading.reducer';
import { userReducer } from './user.reducer';
import { typesReducer } from './types.reducer';
import { pokemonUserReducer } from './pokemonUser.reducer';

const rootReducer = combineReducers({
	loading: loaderReducer,
	apiError: errorReducer,
	user: userReducer,
	typesPokemon: typesReducer,
	pokemonUser: pokemonUserReducer,
});

export { rootReducer };
