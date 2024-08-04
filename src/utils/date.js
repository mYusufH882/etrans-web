export function formatDate(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  return new Intl.DateTimeFormat('id-ID', options).format(date).replace(/\./g, '')
}
