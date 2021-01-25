import {GoogleSpreadsheet} from 'google-spreadsheet'

const fromBase64 = (value) => {
    const buff = Buffer.from(value, 'base64')
    return buff.toString('ascii')
}

const doc = new GoogleSpreadsheet(process.env.PLANILHA_ID)

export default async (req, res) => {

    try {

        
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: fromBase64(process.env.PRIVATE_KEY),
        })
        await doc.loadInfo()
        
        const sheet = doc.sheetsByIndex[0]
        const rows = await sheet.getRows()
        const rowsFilter = rows.map(item => {
            return {servico: item.servico, minAtendimento: item.minutosAtendimento}
        })
        
        res.send(JSON.stringify(rowsFilter))
    }catch(err) {
        console.log(err)

        res.send(JSON.stringify([{servico: 'massagem'}]))
    }
}