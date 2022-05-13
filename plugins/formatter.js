export default function ({ app }, inject) {
  inject('formatMoney', (money) => {
    return new Intl.NumberFormat('id-ID', {
      currency: 'IDR',
      style: 'currency',
    })
      .format(money)
      .slice(0, -3)
  })

  inject('relativeTime', (d1, d2 = new Date()) => {
    const units = {
      year: 24 * 60 * 60 * 1000 * 365,
      month: (24 * 60 * 60 * 1000 * 365) / 12,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000,
    }
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const elapsed = new Date(d1) - d2
    for (const u in units) {
      if (Math.abs(elapsed) > units[u] || u === 'second') {
        return rtf.format(Math.round(elapsed / units[u]), u)
      }
    }
  })
}
