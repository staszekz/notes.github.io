export function formOption<T extends string>(value: T, label?: T) {
  const newLabel = label || value[0] + value.slice(1)?.toLowerCase() as T

  return ({
    value,
    label: newLabel,
  })
}