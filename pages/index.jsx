import Head from 'next/head'
import dynamic from 'next/dynamic'
import ConfessionForm from '../components/ConfessionForm'


export default function Home() {
return (
<>
<Head>
<title>Confess — Anonymous messages</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
{/* Tailwind CDN for quick styling */}
<script src="https://cdn.tailwindcss.com"></script>
</Head>


<main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white flex items-center justify-center p-6">
<div className="max-w-3xl w-full bg-white/5 rounded-2xl backdrop-blur-md p-8 shadow-2xl">
<header className="mb-6">
<h1 className="text-3xl font-extrabold">Confess</h1>
<p className="mt-2 text-sm opacity-80">Write an anonymous message to your crush — we’ll deliver it privately.</p>
</header>


<section className="mb-6">
<div className="bg-white/6 p-4 rounded-lg">
<h2 className="font-semibold">Instructions</h2>
<ol className="list-decimal list-inside mt-2 text-sm opacity-90">
<li>Type a short message (no spam, threats, or illegal content).</li>
<li>Optionally put the receiver's name.<br/>(If left blank we'll forward to the page inbox.)</li>
<li>Press <strong>Send</strong>. Your message will be forwarded to our Telegram inbox.</li>
</ol>
</div>
</section>


<ConfessionForm />


<footer className="mt-6 text-xs opacity-80">Your IP is not stored by this demo. Admins can see messages sent to the Telegram chat.</footer>
</div>
</main>
</>
)
}
