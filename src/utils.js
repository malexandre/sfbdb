export function getTranslatedTextFromObject(obj, lang) {
  if (!lang || !obj[lang]) {
    return obj.fr
  }

  return obj[lang]
}
