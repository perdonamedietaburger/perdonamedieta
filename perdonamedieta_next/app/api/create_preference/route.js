
import mercadopago from 'mercadopago'

export async function POST(req) {
  const body = await req.json()
  const { items } = body
  const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || ''
  if(!ACCESS_TOKEN) return new Response(JSON.stringify({error:'MERCADOPAGO_ACCESS_TOKEN not set'}), { status:200 })
  mercadopago.configure({ access_token: ACCESS_TOKEN })
  try{
    const mpItems = (items||[]).map(it=>({ title: it.name, quantity:1, currency_id:'ARS', unit_price: parseFloat(it.price) }))
    const preference = {
      items: mpItems,
      back_urls: { success: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000', failure: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' },
      notification_url: (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api/webhook'
    }
    const resp = await mercadopago.preferences.create(preference)
    return new Response(JSON.stringify(resp.body), { status:200 })
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status:500 })
  }
}
