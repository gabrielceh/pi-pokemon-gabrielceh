/* eslint-disable react/prop-types */
import pokemonMissing from '../../assets/img/pokemon-unknown.png';
import { typesIcons } from '../../utils/pokemonTypesImages';
import {
	ContainerDetail,
	Divider,
	DividerH,
	GridInfo,
	ImageType,
	ImageTypeCont,
	ImagesTypesCont,
	ImgContainer,
	InfoArticle,
	InfoSection,
	LabelArticle,
	PokemonName,
	TypeName,
	UserPok,
} from './DetailComponent.styled';
import LabelInfo from './LabelInfo';

function DetailComponent({ pokemon }) {
	const user = pokemon && pokemon.Users && pokemon.Users[0].userName;

	return (
		<>
			{pokemon && (
				<ContainerDetail>
					<ImgContainer type={pokemon.Types[0].name}>
						{pokemon.image ? (
							<img
								src={pokemon.image}
								alt={pokemon.name}
							/>
						) : (
							<img
								src={pokemonMissing}
								alt={pokemon.name}
							/>
						)}
					</ImgContainer>

					<InfoSection type={pokemon.Types[0].name}>
						<PokemonName type={pokemon.Types[0].name}>
							#{pokemon.id} {pokemon?.name.toUpperCase()}{' '}
							{user && <UserPok type={pokemon.Types[0].name}>by {user}</UserPok>}
						</PokemonName>
						<DividerH type={pokemon.Types[0].name}></DividerH>
						<GridInfo>
							<InfoArticle>
								<LabelArticle type={pokemon.Types[0].name}>TYPES</LabelArticle>
								<ImagesTypesCont>
									{pokemon?.Types.map((type) => (
										<ImageTypeCont key={type.id}>
											<ImageType
												src={typesIcons(type.name)}
												alt={type.name}
											/>
											<TypeName type={type.name}>{type.name.toUpperCase()}</TypeName>
										</ImageTypeCont>
									))}
								</ImagesTypesCont>
							</InfoArticle>

							<Divider type={pokemon.Types[0].name}></Divider>

							<InfoArticle>
								<LabelArticle type={pokemon.Types[0].name}>STATS</LabelArticle>
								<div>
									<LabelInfo
										label='HP:'
										text={pokemon.hp}
										type={pokemon.Types[0].name}
									/>
									<LabelInfo
										label='ATTACK:'
										text={pokemon.attack}
										type={pokemon.Types[0].name}
									/>
									<LabelInfo
										label='DEFENSE:'
										text={pokemon.defense}
										type={pokemon.Types[0].name}
									/>
									<LabelInfo
										label='SP. ATTACK:'
										text={pokemon.special_attack}
										type={pokemon.Types[0].name}
									/>
									<LabelInfo
										label='SP DEFENSE:'
										text={pokemon.special_defense}
										type={pokemon.Types[0].name}
									/>
									<LabelInfo
										label='SPEED:'
										text={pokemon.speed}
										type={pokemon.Types[0].name}
									/>
								</div>
							</InfoArticle>

							<Divider type={pokemon.Types[0].name}></Divider>

							<InfoArticle>
								<LabelArticle type={pokemon.Types[0].name}>MORE</LabelArticle>
								<div>
									<LabelInfo
										label='HEIGHT:'
										text={pokemon?.height || 'unknown'}
										type={pokemon.Types[0].name}
									/>

									<LabelInfo
										label='WEIGHT:'
										text={pokemon?.weight || 'unknown'}
										type={pokemon.Types[0].name}
									/>
								</div>
							</InfoArticle>
						</GridInfo>
					</InfoSection>
				</ContainerDetail>
			)}
		</>
	);
}

export default DetailComponent;
