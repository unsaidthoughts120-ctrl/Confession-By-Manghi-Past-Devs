// pages/api/send.js
// Serverless endpoint that forwards confessions to Telegram using env vars


export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
try {
const body = req.body
const message = (body.message || '').toString().trim()
const receiver = (body.receiver || '').toString().trim()


if (!message) return res.status(400).json({ error: 'Message is required' })
if (message.length > 1000) return res.status(400).json({ error: 'Message too long' })


const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID


if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
return res.status(500).json({ error: 'Telegram not configured on server' })
}


// Build the message text (render receiver if provided)
const text = receiver
? `*Confession for ${escapeMarkdown(receiver)}*\n\n${escapeMarkdown(message)}`
: `*Confession*\n\n${escapeMarkdown(message)}`


const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
const payload = {
chat_id: TELEGRAM_CHAT_ID,
text,
parse_mode: 'Markdown'
}


const r = await fetch(tgUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
})


const data = await r.json()
if (!r.ok) {
return res.status(502).json({ error: data?.description || 'Telegram API error' })
}


return res.status(200).json({ ok: true, telegram: true })
} catch (err) {
return res.status(500).json({ error: err.message })
}
}


function escapeMarkdown(text) {
// Minimal escaping for Telegram Markdown (keep it small)
return text.replace(/([_\*\[\]\(\)~`>#+\-=|{}.!])/g, '\\$1')
}
