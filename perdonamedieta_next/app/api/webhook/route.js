
import nodemailer from 'nodemailer'
export async function POST(req){
  const ADMIN = process.env.ADMIN_EMAIL || 'perdonameburger@gmail.com'
  const smtpHost = process.env.SMTP_HOST
  if(!smtpHost){ console.log('SMTP not configured'); return new Response(null,{status:200}) }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT||465),
    secure: true,
    auth:{ user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  try{
    await transporter.sendMail({ from: process.env.SMTP_USER, to: ADMIN, subject: 'Nuevo pago - Perdoname Dieta', text: 'Recibimos una notificación de pago. Revisa Mercado Pago.' })
  }catch(e){
    console.log('Error sending mail', e)
  }
  return new Response(null,{status:200})
}
