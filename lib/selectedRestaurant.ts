// Deprecated helper — dynamic routing now used. Keep empty exports to avoid runtime errors if any lingering imports remain.
export const deprecated = () => {
	throw new Error('selectedRestaurant helper is deprecated; use dynamic route /restaurant/[id] instead');
};
