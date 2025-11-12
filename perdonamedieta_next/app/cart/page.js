
'use client'
import {useEffect, useState} from 'react'
export default function CartPage(){
  const [items,setItems]=useState([])
  const [delivery,setDelivery]=useState(false)
  const DELIVERY_FEE = 1500
  useEffect(()=>{ setItems(JSON.parse(localStorage.getItem('cart')||'[]')) },[])
  const remove=(i)=>{ const c=[...items]; c.splice(i,1); setItems(c); localStorage.setItem('cart', JSON.stringify(c)) }
  const total = items.reduce((s,it)=>s+it.price,0) + (delivery?DELIVERY_FEE:0)
  return (
    <div className="p-6">
      <header className="flex items-center justify-between"><h1 className="text-2xl font-bold">Carrito</h1></header>
      <div className="mt-6">
        {items.length===0 && <p className="text-gray-300">No hay productos en el carrito.</p>}
        {items.map((it,idx)=>(
          <div key={idx} className="card mb-3 flex items-center gap-4">
            <img src={it.image} style={{width:120,height:80,objectFit:'cover'}}/>
            <div>
              <div className="font-bold">{it.name}</div>
              <div className="text-sm text-gray-300">{it.description}</div>
            </div>
            <div className="ml-auto">
              <div className="price">${it.price}</div>
              <button className="text-sm mt-2" onClick={()=>remove(idx)}>Eliminar</button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <label className="flex items-center gap-2"><input type="checkbox" onChange={e=>setDelivery(e.target.checked)}/> Delivery (Costo extra ${DELIVERY_FEE})</label>
        </div>
        <div className="mt-4 font-bold">Total: <span className="price">${total}</span></div>
        <div className="mt-4">
          <a href="/checkout" className="btn-red">Ir a pagar</a>
          <a className="ml-3 text-red-400" href={"https://wa.me/543543312785?text="+encodeURIComponent("Hola,%20quiero%20hacer%20un%20pedido%20:%20"+(items.map(it=>it.name).join(", "))) }>Pagar por WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
