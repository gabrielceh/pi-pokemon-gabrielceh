const NumbersDescending = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={44}
		height={44}
		fill='none'
		stroke='#2c3e50'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth={1.5}
		className='icon icon-tabler icon-tabler-sort-descending-numbers'
		viewBox='0 0 24 24'
		{...props}>
		<path
			stroke='none'
			d='M0 0h24v24H0z'
		/>
		<path d='m4 15 3 3 3-3M7 6v12M17 14a2 2 0 0 1 2 2v3a2 2 0 1 1-4 0v-3a2 2 0 0 1 2-2zM15 5a2 2 0 1 0 4 0 2 2 0 1 0-4 0' />
		<path d='M19 5v3a2 2 0 0 1-2 2h-1.5' />
	</svg>
);
export default NumbersDescending;
