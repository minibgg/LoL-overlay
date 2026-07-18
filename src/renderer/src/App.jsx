import { useState, useEffect, use } from 'react'
import './index.css'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)
  const [creepScore, setCreepScore] = useState('')

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const res = await fetch('https://127.0.0.1:2999/liveclientdata/allgamedata', {
          cache: 'no-store'
        })
        const data = await res.json()
        console.log({
          time: data.gameData.gameTime,
          cs: data.allPlayers[0].scores.creepScore
        })
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
    return (
      <div>
        <div className="drag-region" style={{ height: 30, width: '100%' }}></div>
        <div className="main-info">ожидание игры</div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="drag-region" style={{ height: 30, width: '100%' }}></div>
        <div className="main-info">ur creep score: {creepScore}</div>
      </div>
    )
  }
}
