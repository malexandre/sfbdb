const fs = require("fs")

const data = require("./data.json")

const SEARCH_I18N = {
  yellow: "yellow jaune creation",
  blue: "blue bleu bleue manipulation",
  red: "red rouge destruction",
  attack: "attack attaque",
  skill: "skill competence",
  reaction: "reaction"
}

const SEARCH_FR = {
  yellow: "jaune creation",
  blue: "bleu bleue manipulation",
  red: "rouge destruction",
  attack: "attaque",
  skill: "competence",
  reaction: "reaction"
}
const SEARCH_EN = {
  yellow: "yellow creation",
  blue: "blue manipulation",
  red: "red destruction",
  attack: "attack",
  skill: "skill",
  reaction: "reaction"
}

function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,/#!$%^&*;:{}=\-_'"`~()]/g, " ")
    .replace(/\s{2,}/g, " ")
    .toLowerCase()
    .trim()
}

function computeCardSearchData(championName, card) {
  return {
    i18n: [
      normalizeString(championName),
      normalizeString(card.number),
      SEARCH_I18N[card.color],
      SEARCH_I18N[card.type],
      normalizeString(card.name.en),
      normalizeString(card.name.fr),
      ...card.text.en.map((str) => normalizeString(str)),
      ...card.text.fr.map((str) => normalizeString(str))
    ].join(" "),
    en: [
      normalizeString(championName),
      normalizeString(card.number),
      SEARCH_EN[card.color],
      SEARCH_EN[card.type],
      normalizeString(card.name.en),
      ...card.text.en.map((str) => normalizeString(str))
    ].join(" "),
    fr: [
      normalizeString(championName),
      normalizeString(card.number),
      SEARCH_FR[card.color],
      SEARCH_FR[card.type],
      normalizeString(card.name.fr),
      ...card.text.fr.map((str) => normalizeString(str))
    ].join(" ")
  }
}

function computeChampionSearchData(champion) {  return {
  i18n: [
    normalizeString(champion.name),
    normalizeString(champion.levelUp.en),
    normalizeString(champion.levelUp.fr)
  ].join(" "),
  en: [
    normalizeString(champion.name),
    normalizeString(champion.levelUp.en)
  ].join(" "),
  fr: [
    normalizeString(champion.name),
    normalizeString(champion.levelUp.fr)
  ].join(" ")
}
}

function computeDataForCards(cards) {
  const result = {
    control: 0,
    attack: 0,
    deckManagement: 0,
    withoutMove: 0,
    textDamages: 0,
    buff: 0,
    textMovement: 0,
    antiDefense: 0,
    selfHeal: 0,
    heal: 0,
    reaction: {
      movement: 0,
      damage: 0,
      control: 0,
      defense: 0,
      heal: 0
    }
  }

  for (const card of cards) {
    if (card.metadata.reaction) {
      result.reaction.movement += card.metadata.textMovement ? 1 : 0
      result.reaction.damage += card.metadata.textDamages ? 1 : 0
      result.reaction.control += card.metadata.control ? 1 : 0
      result.reaction.defense += card.metadata.defense ? 1 : 0
      result.reaction.heal += card.metadata.heal || card.metadata.selfHeal ? 1 : 0
    }
    else {
      result.control += card.metadata.control ? 1 : 0
      result.attack += card.metadata.attack ? 1 : 0
      result.deckManagement += card.metadata.deckManagement ? 1 : 0
      result.withoutMove += card.metadata.withoutMove ? 1 : 0
      result.textDamages += card.metadata.textDamages ? 1 : 0
      result.buff += card.metadata.buff ? 1 : 0
      result.textMovement += card.metadata.textMovement ? 1 : 0
      result.selfHeal += card.metadata.selfHeal ? 1 : 0
      result.heal += card.metadata.heal ? 1 : 0
      result.antiDefense += card.metadata.antiDefense ? 1 : 0
    }
  }

  return result
}

function computeData() {
  const computedData = {}
  for (const [championName, champion] of Object.entries(data)) {
    champion.name = championName

    for (const card of champion.cards) {
      card.metadata.searchData = computeCardSearchData(championName, card)
      card.metadata.championName = championName
    }

    champion.metadata = {
      total: computeDataForCards(champion.cards),
      red: computeDataForCards(champion.cards.filter((card) => card.color === "red")),
      blue: computeDataForCards(champion.cards.filter((card) => card.color === "blue")),
      yellow: computeDataForCards(champion.cards.filter((card) => card.color === "yellow")),
      searchData: computeChampionSearchData(champion),
      reactionColor: champion.cards.find((card) => card.type === "reaction").color
    }

    computedData[champion.id] = champion
  }

  fs.writeFileSync("./src/data.json", JSON.stringify(computedData))
}

computeData()
