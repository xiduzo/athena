export const LDAP_URL = 'https://oege.ie.hva.nl/~vddxx/ldapper/index.php'
export const BACKEND_URL = 'https://back.beyond.jstur.org/api'
export const TRIBE_ENDPOINT = 'guild/newGuild'
export const SQUAD_ENDPOINT = 'class'
export const ACCOUNT_ENDPOINT = 'user'
export const AGREEMENTS_ENDPOINT = 'rules'

export const BEARER = `Basic ${btoa(
  `${process.env.REACT_APP_BACKEND_USER}:${process.env.REACT_APP_BACKEND_PASS}`
)}`
