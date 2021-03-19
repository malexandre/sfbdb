import PropTypes from 'prop-types'

export const SearchDataType = PropTypes.shape({
  i18n: PropTypes.string,
  en: PropTypes.string,
  fr: PropTypes.string
})

export const CardType = PropTypes.shape({
  number: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  movement: PropTypes.number,
  range: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    direct: PropTypes.bool
  }),
  aoe: PropTypes.number,
  strength: PropTypes.number,
  defense: PropTypes.number,
  name: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string
  }),
  text: PropTypes.shape({
    en: PropTypes.arrayOf(PropTypes.string),
    fr: PropTypes.arrayOf(PropTypes.string)
  }),
  metadata: PropTypes.shape({
    control: PropTypes.bool,
    attack: PropTypes.bool,
    deckManagement: PropTypes.bool,
    withoutMove: PropTypes.bool,
    reaction: PropTypes.bool,
    textDamages: PropTypes.bool,
    buff: PropTypes.bool,
    defense: PropTypes.bool,
    textMovement: PropTypes.bool,
    selfHeal: PropTypes.bool,
    heal: PropTypes.bool,
    antiDefense: PropTypes.bool,
    search: SearchDataType
  })
})

const ChampionMetadataType = PropTypes.shape({
  control: PropTypes.number,
  attack: PropTypes.number,
  deckManagement: PropTypes.number,
  withoutMove: PropTypes.number,
  textDamages: PropTypes.number,
  buff: PropTypes.number,
  textMovement: PropTypes.number,
  antiDefense: PropTypes.number,
  selfHeal: PropTypes.number,
  heal: PropTypes.number,
  reaction: PropTypes.shape({
    movement: PropTypes.number,
    damage: PropTypes.number,
    control: PropTypes.number,
    defense: PropTypes.number,
    heal: PropTypes.number
  })
})

export const ChampionType = PropTypes.shape({
  id: PropTypes.string,
  hp: PropTypes.number,
  defense: PropTypes.number,
  name: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string
  }),
  levelUp: PropTypes.shape({
    hp: PropTypes.number,
    defense: PropTypes.number,
    en: PropTypes.string,
    fr: PropTypes.string
  }),
  metadata: PropTypes.shape({
    total: ChampionMetadataType,
    red: ChampionMetadataType,
    blue: ChampionMetadataType,
    yellow: ChampionMetadataType,
    searchData: SearchDataType,
    reactionColor: PropTypes.string
  }),
  cards: PropTypes.arrayOf(CardType)
})
