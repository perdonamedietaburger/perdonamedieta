
import './globals.css'
export const metadata = { title: 'Perdoname Dieta' }
export default function RootLayout({ children }){
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen">
          <header className="header p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/assets/logo.png" alt="Perdoname Dieta" style={{height:64}}/>
              <div>
                <h1 className="text-2xl font-extrabold">Perdoname Dieta</h1>
                <p className="text-sm">Mancol 8480, Argüello — Retiro / Delivery</p>
              </div>
            </div>
            <div>
              <a href="/cart" className="btn-red">Carrito</a>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
