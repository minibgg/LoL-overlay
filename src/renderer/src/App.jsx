import { useState } from 'react'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)
  try {
    async function fetchGameInfo() {
      const res = await fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
      const data = await res.json
      setGameInfo(data)
    }
  } catch (error) {
    console.error('fetch error', error)
  }

  return <div>123123123123</div>
}
