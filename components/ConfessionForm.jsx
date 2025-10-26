import { useState } from 'react'


export default function ConfessionForm() {
const [message, setMessage] = useState('')
const [receiver, setReceiver] = useState('')
const [sending, setSending] = useState(false)
const [result, setResult] = useState(null)


async function handleSubmit(e) {
e.preventDefault()
if (!message.trim()) return setResult({ ok: false, message: 'Please write a message.' })
setSending(true)
setResult(null)


try {
const res = await fetch('/api/send', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ message, receiver })
})
const data = await res.json()
if (res.ok) {
setMessage('')
setReceiver('')
setResult({ ok: true, message: 'Message sent. Thank you ❤️' })
} else {
setResult({ ok: false, message: data?.error || 'Failed to send message.' })
}
} catch (err) {
setResult({ ok: false, message: err.message || 'Network error' })
} finally {
setSending(false)
}
}


return (
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="text-sm block mb-1">Your message</label>
<textarea
value={message}
onChange={(e) => setMessage(e.target.value)}
rows={5}
maxLength={1000}
placeholder="Write your confession here..."
className="w-full rounded-lg p-3 text-black"
/>
<div className="text-xs opacity-70 mt-1">Max 1000 characters</div>
</div>


<div>
<label className="text-sm block mb-1">Receiver (optional)</label>
<input
value={receiver}
onChange={(e) => setReceiver(e.target.value)}
placeholder="E.g. Jane, or leave blank to send to page inbox"
className="w-full rounded-lg p-3 text-black"
/>
</div>


<div className="flex items-center gap-3">
<button
type="submit"
disabled={sending}
className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-semibold disabled:opacity-60"
>
{sending ? 'Sending...' : 'Send anonymously'}
</button>


<div className="text-sm opacity-90">Messages are forwarded to admins privately.</div>
}
