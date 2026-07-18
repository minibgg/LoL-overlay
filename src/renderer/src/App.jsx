import { useState, useEffect, use } from 'react'
import './index.css'
import { riotApi } from './components/Api'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)
  const [activePlayerInfo, setActivePlayerInfo] = useState(null)
  const [creepScore, setCreepScore] = useState(null)

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const activePlayerName = await riotApi.activePlayerName()
        const playersInfo = await riotApi.playersInfo()
        setActivePlayerInfo(playersInfo.allPlayers.filter((p) => p.riotId === activePlayerName))
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
      setCreepScore(activePlayerInfo[0].scores.creepScore)
    }
  }, [gameInfo, activePlayerInfo])

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
        <div className="main-info">ur creep score: {activePlayerInfo[0].scores.creepScore}</div>
      </div>
    )
  }
}
