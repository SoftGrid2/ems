const generateId = (prefix) => {
	const randomId = Math.floor(Math.random() * 100000);
	return `${prefix}-${randomId}`;
};

module.exports = { generateId };
