import { NextRequest, NextResponse } from 'next/server'

const fetchConversionRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY ?? ''
  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`, {
    next: { revalidate: 60 },
  })
  const data = await response.json()

  return data.conversion_rates[toCurrency]
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const fromCurrency = searchParams.get('fromCurrency')
  const toCurrency = searchParams.get('toCurrency')

  if (!fromCurrency || !toCurrency) {
    return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 })
  }

  try {
    const rate = await fetchConversionRate(fromCurrency, toCurrency)
    return NextResponse.json({ rate })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch conversion rate' }, { status: 500 })
  }
}
