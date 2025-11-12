
import {useEffect, useState} from 'react'
export default function Checkout(){
  const [loading,setLoading]=useState(false)
  const [msg,setMsg]=useState('')
  async function handle(){
    setLoading(true); setMsg('')
    const items = JSON.parse(localStorage.getItem('cart')||'[]')
    if(!items.length){ setMsg('Carrito vacío'); setLoading(false); return; }
    try{
      const res = await fetch('/api/create_preference',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items,shipping:{delivery:false}})})
      const data = await res.json()
      if(data.init_point) window.location.href = data.init_point
      else setMsg('Checkout no disponible. Configure sus credenciales.')
    }catch(e){ setMsg('Error al crear la preferencia'); }
    setLoading(false)
  }
  return <div className="p-6">
    <h1 className="text-2xl font-bold">Checkout</h1>
    <p className="mt-4">Al hacer clic en pagar se abrirá Mercado Pago (sandbox si no configuras keys).</p>
    <div className="mt-6">
      <button className="btn-red" onClick={handle} disabled={loading}>{loading?'...' : 'Pagar con Mercado Pago'}</button>
      {msg && <div className="mt-4 text-yellow-300">{msg}</div>}
    </div>
  </div>
}
