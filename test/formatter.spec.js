import {
  currency,
  rating,
  dateTime,
  year,
  inv,
  capitalize,
  relativeTime,
} from '~/utils/formatter'

// Currency
describe('Currency', () => {
  test('Currency', () => {
    expect(currency(5000000)).toBe('Rp 5.000.000')
  })
})

// Rating
describe('Rating', () => {
  test('Rating', () => {
    expect(rating(3.6666666666666665)).toBe(3.5)
  })
})

// DateTime
describe('DateTime', () => {
  test('DateTime', () => {
    expect(dateTime('2022-05-14T01:03:39.385245+00:00')).toBe(
      'Sat, May 14, 2022 08:03 AM'
    )
  })
})

// Year
describe('Year', () => {
  test('Year', () => {
    expect(year('2022-05-12T02:00:54.934837+00:00')).toBe('May 12, 2022')
  })
})

// INV
describe('INV', () => {
  test('INV', () => {
    expect(inv('2022-05-14T01:03:39.385245+00:00', 346)).toBe(
      'INV/5/14/2022/346'
    )
  })
})

// Capitalize
describe('Capitalize', () => {
  test('Capitalize', () => {
    expect(capitalize('electronic')).toBe('Electronic')
  })
})

// RelativeTime
describe('RelativeTime', () => {
  test('RelativeTime', () => {
    expect(relativeTime('2022-05-03T05:38:39.231992+00:00')).toBe('12 days ago')
  })
})
