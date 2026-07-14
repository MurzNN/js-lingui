import { setupI18n, type I18n } from "@lingui/core"
import { messages as en } from "./locale/en/messages.mjs"
import { messages as cs } from "./locale/cs/messages.mjs"
import { messages as pseudo } from "./locale/pseudo/messages.mjs"
import { generateMessageId } from '@lingui/message-utils/generateMessageId'

const i18nPerLang: Record<string, I18nWithTs> = {}

type TranslateStringFuction = (str: string | Record<string, any>, ...rest: any[]) => string

type I18nWithTs = I18n & {
  ts: TranslateStringFuction
}

const messages: Record<string, Record<string, string>> = {
  en,
  cs,
  pseudo,
}

function arrayWithValuesToString(strings: string[], expressions: any[]) {
  const stringParts: string[] = []
  const values: Record<string, any> = {}
  const expressionsCopy: any[] = [...expressions]
  let index = 0

  for (const part of strings) {
    stringParts.push(part)
    if (expressionsCopy.length == 0) continue;

    const expression = expressionsCopy.shift()
    if (typeof expression === 'object') {
      const key = Object.keys(expression)[0]
      stringParts.push(`{${key}}`)
      values[key] = expression[key]
    } else {
      stringParts.push(`{${index}}`)
      values[index] = expression
      index++
    }
  }

  const string = stringParts.join('')
  return { string, values }
}

function getI18nForLang(lang: string): I18nWithTs {
  if (i18nPerLang[lang]) {
    return i18nPerLang[lang]
  }
  const i18nLang = setupI18n() as I18nWithTs
  i18nLang.load({ [lang]: messages[lang as keyof typeof messages] })
  i18nLang.activate(lang)

  i18nLang.ts = (str: string | Record<string, any>, ...rest: any[]) => {
    let string: string, values: Record<string, any>
    if (typeof str === 'object' || Array.isArray(str)) {
      const result = arrayWithValuesToString(Object.values(str), rest)
      string = result.string
      values = result.values
    } else {
      string = str
      values = rest[0]
    }
    const msgId = generateMessageId(string)
    const result = i18nLang.t(msgId, values)
    if (result === msgId) {
      console.warn(
        `Missing translation for message "${string}" (id '${msgId}'). Returning original string as fallback.`,
      )
      // TODO: Reuse a Lingui API to replace values instead.
      const fallback = string.replace(/\{(\w+)\}/g, (_, key: string) =>
        values && values[key] !== undefined ? String(values[key]) : `{${key}}`,
      )
      return fallback
    }
    return result
  }
  i18nPerLang[lang] = i18nLang
  return i18nLang
}

function getTrans(lang: string): { t: TranslateStringFuction, i18n: I18nWithTs } {
  const i18nLang = getI18nForLang(lang)
  return {
    t: i18nLang.ts,
    i18n: i18nLang,
  }
}

export {
  getTrans,
}
