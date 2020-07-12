const { base32 } = require('rfc4648')

const data = require("./data.json")

function convertTeamToString(draftMode, teams) {
  let result = [1, parseInt(draftMode)]

  for (const team of teams) {
    result = result.concat(team.map((member) => member.id).sort())
  }

  return result
}

function parseTeam(arr) {
  const team = []

  for (const id of arr) {
    const member = data[id]

    if (!member) {
      console.error(`Member ${id} not found`)
      continue
    }

    team.push(member)
  }

  return team
}

function convertTeamFromArray(arr) {
  const teams = []
  const draftMode = arr[1]

  if (draftMode === 2) {
    teams.push(parseTeam(arr.slice(2, 7)))
    teams.push(parseTeam(arr.slice(7)))
  }
  else {
    teams.push(parseTeam(arr.slice(2)))
  }

  return teams
}


export function buildDeckCode(draftMode, teams) {
  return base32.stringify(convertTeamToString(parseInt(draftMode), teams), { pad: false })
}

export function parseDeckCode(code) {
  const decodedDeckCode = base32.parse(code, { out: Array, loose: true })
  return {
    draftMode: `${decodedDeckCode[1]}`,
    teams: convertTeamFromArray(decodedDeckCode)
  }
}
