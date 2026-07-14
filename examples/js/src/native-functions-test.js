import { getTrans } from './native-functions'

const { t } = getTrans('en')
const { t: tCs } = getTrans('cs')
const { t: tP } = getTrans('pseudo')

// Define a phrase that will be used as variable to translate.
const phrase = /** i18n-s */ 'nice to meet you'

// Strings with variables still require manual definitions too.
const dynamicStringDefinition = /** i18n-s */ 'Hello {firstName} {lastName}, {0}!'

console.log(t(/** i18n-s */ 'Hello {name}!', { name: 'John' }))
console.log(tCs(/** i18n-s */ 'Hello {name}!', { name: 'John' }))
console.log(tP(/** i18n-s */ 'Hello {name}!', { name: 'John' }))
console.log(t`Hello ${{name:'John'}}!`)
console.log(tCs`Hello ${{name:'John'}}!`)
console.log(tP`Hello ${{name:'John'}}!`)
console.log(t`Hello ${{firstName:'John'}} ${{lastName:'Smith'}}, ${t(phrase)}!`)
console.log(tCs`Hello ${{firstName:'John'}} ${{lastName:'Smith'}}, ${t(phrase)}!`)
console.log(tP`Hello ${{firstName:'John'}} ${{lastName:'Smith'}}, ${t(phrase)}!`)
