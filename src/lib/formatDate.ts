export function formatDate(dateString: string | undefined | null) {
  if (!dateString || typeof dateString !== 'string') {
    return dateString || '' // Return the original value (or empty string if undefined/null) to avoid further errors, let the caller component handle the invalid date case.
  }

  let parts = dateString.split('-')
  let hasDay = parts.length > 2

  return new Date(dateString).toLocaleDateString('cs-CZ', {
    // Changed locale to 'cs-CZ' for Czech
    day: hasDay ? 'numeric' : undefined,
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Prague', // Changed timezone to 'Europe/Prague' (GMT+1 in standard time, GMT+2 in summer time)
  })
}
