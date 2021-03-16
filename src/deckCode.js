const { base32 } = require('rfc4648')

/**
 * @typedef {Object} ConstructedTean
 * @property {number} draftMode - One of the draft mode available (0 = Casual, 1 = Competitive, 2 = Double Competitive)
 * @property {Array}  teams - Array of teams. Each team is an array of champion IDs (DUG, GOL, GWA, etc.)
 */

// const data = require("./data.json")
const idToString = {
  0: "DUG",
  1: "GOL",
  2: "GWA",
  3: "KIL",
  4: "TZU",
  5: "DER",
  6: "RAT",
  7: "MAR",
  8: "KOR",
  9: "LOR",
  10: "NEV",
  11: "TAZ",
  12: "KOL",
  13: "SUL",
  14: "AKH",
  15: "IZA",
  16: "ALK",
  17: "XIN",
  18: "JAQ",
  19: "LIL",
  20: "NIK"
};

const stringToId = Object.entries(idToString).reduce((acc, entry) => {
  const [key, value] = entry;
  acc[value] = key;
  return acc;
}, {});

/**
 * Convert the team data to integer for the base64 conversion, and put everything into one organized array.
 * @param  {number} draftMode
 *         One of the draft mode available (0 = Casual, 1 = Competitive, 2 = Double Competitive)
 * @param  {array}  teams
 *         Array of teams. Each team is an array of champion IDs (DUG, GOL, GWA, etc.)
 * @return {array}
 *         The data converted into a single array, for example : [1, 2, 0, 1, 2, 3, 4]  for [[DUG, GOL, GWA, KIL, TZU]]
 */
function convertTeamToInt(draftMode, teams) {
  let result = [1, parseInt(draftMode)]

  for (const team of teams) {
    result = result.concat(team.map((member) => stringToId[member]).sort())
  }

  return result
}

/**
 * Convert an array of integer id into string ID, ignoring those that do not match anything
 * @param  {array}  arr
 *         An array of integer
 * @return {array}
 *         The data converted into string, for example : [DUG, GOL, GWA, KIL, TZU]  for [0, 1, 2, 3, 4]
 */
function parseTeam(arr) {
  const team = []

  for (const id of arr) {
    const member = idToString[id]

    if (!member) {
      console.error(`Member ${id} not found`)
      continue
    }

    team.push(member)
  }

  return team
}

/**
 * Convert the organized array into an array of teams.
 * @param  {array}  arr
 *         The data concatenated into a single array, as parsed from the base64 deck code
 * @return {array}
 *         The data converted into teams, for example : [[DUG, GOL, GWA, KIL, TZU]] for [1, 2, 0, 1, 2, 3, 4]
 */
function convertTeamFromArray(arr) {
  const teams = []
  // const version = arr[0]
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

/**
 * Compute the deck code for the teams given.
 * @param  {number} draftMode
 *         One of the draft mode available (0 = Casual, 1 = Competitive, 2 = Double Competitive)
 * @param  {array}  teams
 *         Array of teams. Each team is an array of champion IDs (DUG, GOL, GWA, etc.)
 * @return {string}
 *         The deck code computed for the teams, for example : AEAQAAICAMCA  for [[DUG, GOL, GWA, KIL, TZU]]
 */
export function buildDeckCode(draftMode, teams) {
  return base32.stringify(convertTeamToInt(draftMode, teams), { pad: false })
}

/**
 * Parse the deck code and convert it to a Constructed Team object.
 * @param  {string} code
 *         String generated by this algorithm, for example : AEAQAAICAMCA (Dugrun, Gold'arr, Gwaien, Kilgore, Tzu Xiao)
 * @return {ConstructedTeam}
 *         The Constructed Team object parsed.
 */
export function parseDeckCode(code) {
  const decodedDeckCode = base32.parse(code, { out: Array, loose: true })
  return {
    draftMode: decodedDeckCode[1],
    teams: convertTeamFromArray(decodedDeckCode)
  }
}
