import { useState, useEffect, use } from 'react'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const res = await fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
        const data = await res.json()
        setGameInfo(data)

        const creepScore = data.allPlayers[0].scores.creepScore
        console.log(creepScore)
      } catch (error) {
        console.error('fetch error', error)
      }
    }

    fetchGameInfo()
  }, [])
  return <div>test</div>
}
