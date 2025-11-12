
import nodemailer from 'nodemailer'
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  const ADMIN = process.env.ADMIN_EMAIL || 'perdonameburger@gmail.com'
  const smtpHost = process.env.SMTP_HOST
  if(!smtpHost){ console.log('SMTP not configured'); return res.status(200).end() }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT||465),
    secure: true,
    auth:{ user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  try{
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: ADMIN,
      subject: 'Nuevo pago - Perdoname Dieta Burger',
      text: 'Recibimos una notificación de pago. Revisa el panel de Mercado Pago o la API webhook para detalles.'
    })
  }catch(e){
    console.log('Error enviando mail', e)
  }
  res.status(200).end()
}
