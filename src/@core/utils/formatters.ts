import { isToday } from './helpers'

export const avatarText = (value: string) => {
  if (!value)
    return ''
  const nameArray = value.split(' ')

  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

// TODO: Try to implement this: https://twitter.com/fireship_dev/status/1565424801216311297
export const kFormatter = (num: number) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g

  return Math.abs(num) > 9999 ? `${Math.sign(num) * +((Math.abs(num) / 1000).toFixed(1))}k` : Math.abs(num).toFixed(0).replace(regex, ',')
}

/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {string} value date to format
 * @param {Intl.DateTimeFormatOptions} formatting Intl object to format with
 */
export const formatDate = (value: Date | string | undefined, formatting: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) => {
  if (!value)
    return value

  return new Intl.DateTimeFormat('pt-BR', formatting).format(new Date(value))
}

export const formatDateDB = (value: Date | string | undefined): string | undefined => {
  if (!value)
    return value

  const date = new Date(value)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {string} value date to format
 * @param {Intl.DateTimeFormatOptions} formatting Intl object to format with
 */
export const formatDateShort = (value: Date | object | string | undefined, formatting: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }) => {
  if (!value)
    return value

  return new Intl.DateTimeFormat('pt-BR', formatting).format(new Date(value))
}

/**
 * Return short human friendly month representation of date
 * Can also convert date to only time if date is of today (Better UX)
 * @param {string} value date to format
 * @param {boolean} toTimeForCurrentDay Shall convert to time if day is today/current
 */
export const formatDateToMonthShort = (value: string, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting: Record<string, string> = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date))
    formatting = { hour: 'numeric', minute: 'numeric' }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

export const prefixWithPlus = (value: number) => value > 0 ? `+${value}` : value

export const formatDateTime = datetimeString => {
  const now = new Date()
  const inputDate = new Date(datetimeString)
  const diffInSeconds = Math.floor((now - inputDate) / 1000)

  if (diffInSeconds < 60)
    return `${diffInSeconds}s atrás`

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60)
    return `${diffInMinutes}m atrás`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24)
    return `${diffInHours}h atrás`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 10)
    return `${diffInHours}h ${diffInMinutes % 60}m atrás`

  const options = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }

  return inputDate.toLocaleString('en-US', options)
}
