export function getMenuItemById(items, id) {
  const numericId = Number(id);
  return items.find((item) => item.id === numericId) ?? null;
}
