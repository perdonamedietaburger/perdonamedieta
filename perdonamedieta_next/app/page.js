
import products from './data/products.json'
export default function Home(){
  return (
    <div className="p-6">
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
              <button className="btn-red" onClick={() => {
                const c = JSON.parse(localStorage.getItem('cart')||'[]');
                c.push(p); localStorage.setItem('cart', JSON.stringify(c));
                alert('Agregado al carrito');
              }}>Agregar</button>
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
    </div>
  )
}
