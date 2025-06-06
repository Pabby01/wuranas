import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY environment variable is not defined');
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { subject, description, email, name } = req.body;
  const referer = req.headers.referer;

  const content = {
    to: ['contact@bstefanski.com'],
    from: 'contact@bstefanski.com',
    subject: subject,
    text: description,
    html: `<div>
    <h1>Name: ${name}</h1>
    <h1>E-mail: ${email}</h1>
    <p>${description}</p>
    <p>Sent from: ${referer || 'Not specified or hidden'}`,
  };

  try {
    await sgMail.send(content);
    res.status(204).end();
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send({ message: error });
  }
}
