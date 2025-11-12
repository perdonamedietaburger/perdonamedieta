
import mercadopago from 'mercadopago'
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  const {items,shipping} = req.body
  const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || ''
  if(!ACCESS_TOKEN){ return res.status(200).json({error:'MERCADOPAGO_ACCESS_TOKEN not set'}) }
  mercadopago.configure({access_token:ACCESS_TOKEN})
  try{
    const mpItems = (items||[]).map(it=>({title:it.name,quantity:1,currency_id:'ARS',unit_price: parseFloat(it.price)}))
    const preference = {
      items: mpItems,
      back_urls: {success:process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000', failure: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000', pending: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'},
      notification_url: (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api/webhook'
    }
    const resp = await mercadopago.preferences.create(preference)
    return res.status(200).json(resp.body)
  }catch(e){
    return res.status(500).json({error: String(e)})
  }
}
