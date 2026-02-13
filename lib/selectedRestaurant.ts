let selectedId: string | null = null;
export const setSelectedRestaurant = (id: string) => { selectedId = id; };
export const getSelectedRestaurant = () => selectedId;
