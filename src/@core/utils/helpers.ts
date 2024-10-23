import { formatDateDB } from '@core/utils/formatters'

// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return (Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsToday
export const isToday = (date: Date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
  )
}

// 👉 RemoveKeysBeforeUpdate
const keysToRemove: string[] = ['updated_at', 'updated_by']

export const rk = (formData: object): object => {
  for (const key in toRaw(formData)) {
    if (/dt_start|dt_end/.test(key))
      formData[key] = formatDateDB(formData[key])

    if (keysToRemove.includes(key))
      delete formData[key]
  }

  return formData
}
