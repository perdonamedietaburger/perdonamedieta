
import nodemailer from 'nodemailer'
export default async function handler(req,res){
  const ADMIN = process.env.ADMIN_EMAIL || 'perdonameburger@gmail.com'
  const smtpHost = process.env.SMTP_HOST
  if(!smtpHost) return res.status(400).json({error:'SMTP not configured'})
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
      subject: 'Prueba de email - Perdoname Dieta Burger',
      text: 'Este es un correo de prueba desde la app.'
    })
    res.status(200).json({ok:true})
  }catch(e){ res.status(500).json({error: String(e)}) }
}
