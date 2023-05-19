import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPokemon } from '../../redux/actions/pokemonUser.action';
import Cards from '../../components/Cards/Cards';
import { ContainerPage } from '../../styled/Container.styled';
import LoadingPage from '../../components/Loading/LoadingPage';

function Profile() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const pokemonUser = useSelector((state) => state.pokemonUser);
	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		if (!pokemonUser.results.length) {
			dispatch(getUserPokemon(user.user.userId));
		}
	}, []);

	return (
		<ContainerPage>
			<h2>{user.user.userName}</h2>
			{loading && <LoadingPage />}
			{pokemonUser.results.length && <Cards data={pokemonUser.results} />}
			{!pokemonUser.results.length && <h2>No Pokemon yet</h2>}
		</ContainerPage>
	);
}

export default Profile;
