export function formatRupiah(value) {
  if (value === null || value === undefined || isNaN(value)) return 'Rp 0'

  const numberValue = Number(value)
  if (isNaN(numberValue)) return 'Rp 0'

  return numberValue.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })
}

export function parseRupiah(value) {
  // Hapus semua karakter non-numeric kecuali tanda minus
  return value.replace(/[^\d]/g, '')
}
