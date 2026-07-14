import { setupI18n } from "@lingui/core"
import { messages as en } from "./locale/en/messages.mjs"
import { messages as cs } from "./locale/cs/messages.mjs"
import { messages as pseudo } from "./locale/pseudo/messages.mjs"

import { msg, setupI18nWithTransString } from '@lingui/core/runtime-macro'

const messages: Record<string, Record<string, string>> = {
    en,
    cs,
    pseudo,
  }

const lang = 'cs'

const name='John'

// Baseline approach
const i18n = setupI18n() 
i18n.load({ [lang]: messages[lang as keyof typeof messages] })
i18n.activate(lang)
console.log('Baseline approach:')
console.log(i18n.t(msg`Hello ${{name}}`))

// Approach with translateString
const i18nTS = setupI18nWithTransString() 
i18nTS.load({ [lang]: messages[lang as keyof typeof messages] })
i18nTS.activate(lang)
const t = i18nTS.translateString

console.log('Approach with translateString:')
console.log(t`Hello ${{name}}`)

