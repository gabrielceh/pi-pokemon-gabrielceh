import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPokemon } from '../../redux/actions/pokemonUser.action';
import Cards from '../../components/Cards/Cards';
import { ContainerPage } from '../../styled/Container.styled';

function Profile() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const pokemonUser = useSelector((state) => state.pokemonUser);

	useEffect(() => {
		if (!pokemonUser.results.length) {
			dispatch(getUserPokemon(user.user.userId));
		}
	}, []);

	return (
		<ContainerPage>
			<h2>{user.user.userName}</h2>
			<Cards data={pokemonUser.results} />
		</ContainerPage>
	);
}

export default Profile;
