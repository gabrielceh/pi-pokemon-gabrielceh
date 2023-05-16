const VerticalDots = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={44}
		height={44}
		fill='none'
		stroke='#2c3e50'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth={1.5}
		className='icon icon-tabler icon-tabler-dots-vertical'
		viewBox='0 0 24 24'
		{...props}>
		<path
			stroke='none'
			d='M0 0h24v24H0z'
		/>
		<path d='M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0' />
	</svg>
);
export default VerticalDots;
