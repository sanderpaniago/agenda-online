
const { addMinutes, parseISO } = require('date-fns')
const { google } = require('googleapis')


const fromBase64 = (value) => {
    const buff = Buffer.from(value, 'base64')
    return buff.toString('ascii')
}

export default async (req, res) => {

  const calendarId = process.env.AGENDA_ID
  const client = await google.auth.getClient({
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: fromBase64(process.env.PRIVATE_KEY)
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: process.env.CLIENT_EMAIL
  });

  const calendar = google.calendar({ version: 'v3', auth: client })

  const data = JSON.parse(req.body);
  try {
    const newEvent = {
      calendarId,
      resource: {
        start: {
          dateTime: parseISO(data.startData),
          timeZone: 'America/Campo_Grande',
        },
        end: {
          dateTime: addMinutes(parseISO(data.startData), 60),
          timeZone: 'America/Campo_Grande',
        },
        summary: `${data.name} agenda-online`,
        status: 'confirmed',
        description: `Agendado para ${data.servico}`,
      },
    }

    await calendar.events.insert(newEvent)
    res.json({ status: true })
  } catch (error) {
    console.log(err)
  }
}