import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <p>Welkom op de BiljartLine website, momenteel is deze website nog in ontwikkeling</p>
      <p>Als je de beschikbare functionaliteiten wilt verkennen, ga dan naar:</p>
      <Link href={`/bonden/1`}>Competetitieoverzicht</Link>
    </main>
  )
}
