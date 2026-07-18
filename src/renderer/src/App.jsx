import { useState, useEffect, use } from 'react'
import './index.css'
import { riotApi } from './components/Api'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)
  const [creepScore, setCreepScore] = useState('')

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const activePlayerName = await riotApi.activePlayerName()
        const playersInfo = await riotApi.playersInfo()
        const activePlayerInfo = playersInfo.allPlayers.filter((p) => p.riotId === activePlayerName)
        console.log(activePlayerInfo)

        setGameInfo(playersInfo)
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
