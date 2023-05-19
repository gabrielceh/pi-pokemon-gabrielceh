import styled from 'styled-components';

export const Form = styled.form`
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	padding: 2rem;
	border: ${({ theme }) => `1px solid ${theme.colors.darkBlue['200']}`};
	border-radius: 10px;
	box-shadow: ${({ theme }) => `0px 0px 10px ${theme.colors.darkBlue['700']}`};
`;
