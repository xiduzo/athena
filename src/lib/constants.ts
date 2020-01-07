export const LDAP_URL = 'https://oege.ie.hva.nl/~vddxx/ldapper/index.php'
export const BACKEND_URL = 'http://localhost:4000'
export const TRIBE_ENDPOINT = 'world'
export const SQUAD_ENDPOINT = 'guild'
export const ACCOUNT_ENDPOINT = 'user'
export const AGREEMENTS_ENDPOINT = 'agreements'

export const BEARER = `Basic ${btoa(`${process.env.REACT_APP_BACKEND_USER}:${process.env.REACT_APP_BACKEND_PASS}`)}`
