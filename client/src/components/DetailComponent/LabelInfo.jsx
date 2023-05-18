/* eslint-disable react/prop-types */

import { InfoLabel } from './DetailComponent.styled';

function LabelInfo({ type, label, text }) {
	return (
		<InfoLabel type={type}>
			<span>{label}</span> <span>{text}</span>
		</InfoLabel>
	);
}

export default LabelInfo;
