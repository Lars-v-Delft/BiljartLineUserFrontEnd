import Link from 'next/link'
import ChatComponent from './components/ChatComponent'
import Chatbox from './components/Chatbox'
import MyChatbox from './components/MyChatbox'

export default function Home() {
  return (
    <main>
      <Link href={`/bonden/1`}>Ga naar competetitieoverzicht</Link>
      {/* <Chatbox /> */}
      {/* <ChatComponent /> */}
      {/* <MyChatbox /> */}
    </main>
  )
}
