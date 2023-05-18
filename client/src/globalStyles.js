import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.30s ease-in-out;
  }

  a{
    color: ${({ theme }) => theme.text};
    transition: all 0.30s ease-in-out;

	&:hover{
		color: ${({ theme }) => theme.colors.darkBlue['300']};

	}
  }
  `;
