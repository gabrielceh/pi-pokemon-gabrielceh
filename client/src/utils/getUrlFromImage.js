export const getUrlFromImage = async (base64Image) => {
	try {
		const formData = new FormData();
		formData.append('image', base64Image.split(',')[1]);

		const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMBB_KEY}`, {
			method: 'POST',
			body: formData,
		});
		const data = await res.json();
		return data.data.display_url;
	} catch (error) {
		console.log(error);
	}
};
