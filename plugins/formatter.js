export default function ({ app }, inject) {
  inject('currency', (money) => {
    return new Intl.NumberFormat('id-ID', {
      currency: 'IDR',
      style: 'currency',
    })
      .format(money)
      .slice(0, -3)
  })

  inject('rating', (rating) => {
    return Math.round(rating * 2) / 2
  })

  inject('dateTime', (dateTime) => {
    const dateOption = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const timeOption = {
      hour: '2-digit',
      minute: '2-digit',
    }
    return `${new Date(dateTime).toLocaleDateString(
      'en-US',
      dateOption
    )} ${new Date(dateTime).toLocaleTimeString('en-US', timeOption)}`
  })

  inject('year', (date) => {
    const dateOption = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(date).toLocaleDateString('en-US', dateOption)
  })

  inject('inv', (orderDate, orderId) => {
    return `INV/${new Date(orderDate)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
      .replace('-', '/')
      .split('T')[0]
      .replace('-', '/')}/${orderId}`
  })

  inject('capitalize', (text) => {
    const eachWord = text.split(' ')
    for (let i = 0; i < eachWord.length; i++) {
      eachWord[i] = eachWord[i][0].toUpperCase() + eachWord[i].substr(1)
    }
    return eachWord.join(' ')
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
