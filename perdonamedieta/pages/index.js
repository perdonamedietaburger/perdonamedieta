
import Link from 'next/link'
import products from '../data/products.json'
import { useState } from 'react'
export default function Home(){
  const [cartCount, setCartCount] = useState(0)
  const add = (p)=>{ 
    const c = JSON.parse(localStorage.getItem('cart')||'[]')
    c.push(p); localStorage.setItem('cart', JSON.stringify(c)); setCartCount(c.length)
  }
  return (
    <div className="min-h-screen">
      <header className="header p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/assets/logo.png" alt="Perdoname Dieta Burger" style={{height:64}}/>
          <div>
            <h1 className="text-2xl font-extrabold">Perdoname Dieta Burger</h1>
            <p className="text-sm">Mancol 8480, Argüello — Retiro / Delivery</p>
          </div>
        </div>
        <div>
          <Link href="/cart"><a className="btn-red">Carrito ({cartCount})</a></Link>
        </div>
      </header>

      <main className="p-6">
        <section className="mb-8">
          <h2 className="text-3xl font-bold">La carta</h2>
          <p className="text-gray-300">Diseño fiel a tus cartas. Agregá al carrito y elegí retiro o delivery.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p=>(
            <article key={p.id} className="card">
              <img src={p.image} alt={p.name} className="w-full object-cover h-48 rounded-md"/>
              <h3 className="text-xl font-bold mt-3">{p.name}</h3>
              <p className="text-sm text-gray-300">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="price">${p.price}</div>
                <button className="btn-red" onClick={()=>{ add(p); alert('Agregado al carrito') }}>Agregar</button>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12">
          <h3 className="text-xl font-bold">Contacto</h3>
          <p>WhatsApp: <a className="text-red-500" href="https://wa.me/543543312785">+54 354 331 2785</a></p>
          <p>Instagram: <a className="text-red-500" href="https://www.instagram.com/perdonamedieta_burger/">@perdonamedieta_burger</a></p>
          <p>Dirección: Mancol 8480, Argüello — <a className="text-red-500" href="https://www.google.com/maps/search/?api=1&query=Mancol+8480+Arg%C3%BCello">Ver en Maps</a></p>
        </section>
      </main>
    </div>
  )
}
