const pagination = (dataFilter, data = [], offset = 0, limit = 12) => {
	const count = data.length;
	const maxPage = Math.ceil(count / 12);
	const currentPage = offset / limit + 1;
	const nextOffset = offset + limit;
	const prevOffset = offset - limit;

	const dataList = dataFilter(data, +offset, +limit);

	return { count, nextOffset, prevOffset, dataList, maxPage, currentPage };
};

module.exports = { pagination };
