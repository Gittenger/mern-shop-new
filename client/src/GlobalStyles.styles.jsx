import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: inherit;
	}

	html {
		box-sizing: border-box;
		font-size: 62.5%;
		width: 100%;
	}

	body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;

  		background-color: #282c34;
  		color: white;
		font-size: 1.8rem;
		padding-top: 2rem;
	}
`

export default GlobalStyles
