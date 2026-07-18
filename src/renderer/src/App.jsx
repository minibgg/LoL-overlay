import { useState, useEffect, use } from 'react'
import './index.css'
import { riotApi } from './components/Api'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)
  const [activePlayerInfo, setActivePlayerInfo] = useState(null)
  const [goldPerMinute, setGoldPerMinute] = useState('')
  const [creepScorePerMinute, setCreepScorePerMinute] = useState('')
  const [killDeathAssist, setKillDeathAssist] = useState('')

  function getScoreClass(value) {
    const num = Number(value)
    if (num >= 9) return 'good-score'
    if (num >= 7) return 'normal-score'
    return 'bad-score'
  }

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const gameEvents = await riotApi.gameEvents()
        const playersInfo = await riotApi.playersInfo()
        setActivePlayerInfo(
          playersInfo.allPlayers.filter((p) => p.riotId === playersInfo.activePlayer.riotId)
        )
        setGameInfo(playersInfo)
      } catch (error) {
        console.error('fetch error', error)
      }
    }

    const intervalId = setInterval(fetchGameInfo, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (activePlayerInfo === null || gameInfo === null) return
    setGoldPerMinute(
      (gameInfo?.activePlayer?.currentGold / (gameInfo?.gameData?.gameTime / 60)).toFixed(2)
    )
    setCreepScorePerMinute(
      (activePlayerInfo[0]?.scores?.creepScore / (gameInfo?.gameData?.gameTime / 60)).toFixed(2)
    )
    const kda =
      (activePlayerInfo[0]?.scores?.kills + activePlayerInfo[0]?.scores?.assists) /
      activePlayerInfo[0]?.scores?.deaths

    setKillDeathAssist(Number.isNaN(kda) ? '0' : kda.toFixed(2))
  }, [activePlayerInfo, gameInfo])

  if (gameInfo == null) {
    return (
      <div>
        <div Id="drag-region" style={{ height: 30, width: '100%' }}></div>
        <div className="main-info">ожидание игры</div>
      </div>
    )
  } else {
    return (
      <div>
        <div id="drag-region" style={{ height: 30, width: '100%' }}></div>
        <div className={getScoreClass(creepScorePerMinute)}>CS: {creepScorePerMinute}</div>
        <div className={getScoreClass(goldPerMinute)}>GPM: {goldPerMinute}</div>
        <div>KDA: {killDeathAssist}</div>
      </div>
    )
  }
}
