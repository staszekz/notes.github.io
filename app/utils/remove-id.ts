export function removeId<T extends { id: string }>(data: T): Omit<T, 'id'> {
  const { id, ...rest } = data;
  return rest;
}