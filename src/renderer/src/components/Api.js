export const riotApi = {
  async playersInfo() {
    const res = await fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
    const data = await res.json()
    return data
  },
  async gameEvents() {
    const res = await fetch('https://127.0.0.1:2999/liveclientdata/eventdata')
    const data = await res.json()
    return data
  }
}
