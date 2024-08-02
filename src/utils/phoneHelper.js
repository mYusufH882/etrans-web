// utils/phoneHelper.js

/**
 * Format a phone number to Indonesian format with prefix +62.
 * Example: formatPhoneNumber('08123456789') -> '+62 812 3456 789'
 *
 * @param {string} phoneNumber - The unformatted phone number
 * @return {string} - The formatted phone number
 */
export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return ''

  // Remove all non-numeric characters
  let numericPhoneNumber = phoneNumber.replace(/\D/g, '')

  // Ensure the number starts with +62
  if (numericPhoneNumber.startsWith('0')) {
    numericPhoneNumber = '62' + numericPhoneNumber.substring(1)
  } else if (!numericPhoneNumber.startsWith('62')) {
    numericPhoneNumber = '62' + numericPhoneNumber
  }

  // Format the phone number (example: +62 812 3456 789)
  const formattedPhoneNumber = numericPhoneNumber.replace(
    /(\d{2})(\d{3})(\d{4})(\d{3})/,
    '+$1 $2 $3 $4'
  )

  return formattedPhoneNumber
}

/**
 * Parse formatted phone number to a plain numeric string.
 * Example: parsePhoneNumber('+62 812 3456 789') -> '628123456789'
 *
 * @param {string} formattedPhoneNumber - The formatted phone number
 * @return {string} - The plain numeric phone number
 */
export function parsePhoneNumber(formattedPhoneNumber) {
  if (!formattedPhoneNumber) return ''

  // Remove all non-numeric characters
  return formattedPhoneNumber.replace(/\D/g, '')
}
