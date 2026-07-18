export function filterMenuItems(items, filters = {}) {
  const { category = 'all', diet = 'all', search = '' } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category?.toLowerCase() === category.toLowerCase();
    const matchesDiet =
      diet === 'all' ||
      (diet === 'veg' && item.isVeg) ||
      (diet === 'nonveg' && !item.isVeg);
    const matchesSearch =
      normalizedSearch.length === 0 ||
      item.name?.toLowerCase().includes(normalizedSearch) ||
      item.description?.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesDiet && matchesSearch;
  });
}
