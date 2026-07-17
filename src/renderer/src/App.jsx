import { useState, useEffect, use } from 'react'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)
  const [creepScore, setCreepScore] = useState('')

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const res = await fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
        const data = await res.json()
        setGameInfo(data)
      } catch (error) {
        console.error('fetch error', error)
      }
    }

    const intervalId = setInterval(fetchGameInfo, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (gameInfo !== null) {
      setCreepScore(gameInfo.allPlayers[0].scores.creepScore)
    }
  }, [gameInfo])

  if (gameInfo == null) {
    return <div>ожидание игры</div>
  } else {
    return <div>ur creep score: {creepScore}</div>
  }
}
