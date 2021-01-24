
const { google } = require('googleapis')
const { addWeeks } = require('date-fns')

const fromBase64 = (value) => {
  const buff = Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: fromBase64(process.env.PRIVATE_KEY)
}

export default async (req, res) => {
  try {
    const client = await google.auth.getClient({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
      subject: process.env.CLIENT_EMAIL,
    })
  
    const calendarId = process.env.AGENDA_ID
    const calendar = google.calendar({ version: "v3", auth: client })
  
    const options = {
      calendarId,
      timeMin: new Date().toISOString(),
      timeMax: addWeeks(new Date(), 4).toISOString(), // Let's get events for four weeks
      singleEvents: true,
      orderBy: "startTime",
    }
  
    const callback = (error, result) => {
      if (error) {
        console.log(`The API returned an error: ${error}`)
        res.send(error.message)
      }
  
      const appointments = result.data.items.map((appointment) => ({
        start: appointment.start.dateTime || appointment.start.date,
        end: appointment.end.dateTime || appointment.end.date,
        id: appointment.id,
        description: appointment.description,
      }))
      res.send(appointments)
    }
  
    await calendar.events.list(options, callback)
  }catch (err) {
    console.log(err)
  }
}


