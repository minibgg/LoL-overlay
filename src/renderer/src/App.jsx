import { useState, useEffect, use } from 'react'
import './index.css'
import { riotApi } from './components/Api'

export default function App() {
  const [gameInfo, setGameInfo] = useState(null)
  const [activePlayerInfo, setActivePlayerInfo] = useState(null)
  const [gameEvents, setGameEvents] = useState(null)
  const [goldPerMinute, setGoldPerMinute] = useState('')
  const [creepScorePerMinute, setCreepScorePerMinute] = useState('')
  const [killDeathAssist, setKillDeathAssist] = useState('')
  const [hordeKillCount, setHordeKillCount] = useState(0)
  const [hordeKillMesage, setHordeKillMesage] = useState('')

  function getClass(value, x, z) {
    const num = Number(value)
    if (num >= x) return 'good-score'
    if (num >= z) return 'normal-score'
    return 'bad-score'
  }

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        setGameEvents(await riotApi.gameEvents())
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
  }, [activePlayerInfo, gameInfo, gameEvents])

  useEffect(() => {
    //нужна помощь
    if (gameEvents == null) return

    const hordeKills = gameEvents.Events.filter((event) => event.EventName === 'HordeKill')

    if (hordeKills.length > hordeKillCount) {
      setHordeKillMesage('Grubbie killed')
    }

    setHordeKillCount(hordeKills.length)
  }, [gameEvents])

  if (gameInfo == null) {
    return (
      <div>
        <div id="drag-region" style={{ height: 30, width: '100%' }}></div>
        <div className="main-info">ожидание игры</div>
      </div>
    )
  } else {
    return (
      <div>
        <div id="drag-region" style={{ height: 30, width: '100%' }}></div>
        <div className={getClass(creepScorePerMinute, 9, 7)}>CS: {creepScorePerMinute}</div>
        <div className={getClass(goldPerMinute, 470, 390)}>GPM: {goldPerMinute}</div>
        <div className={getClass(killDeathAssist, 2, 1)}>KDA: {killDeathAssist}</div>
        <div>{hordeKillMesage}</div>
      </div>
    )
  }
}
