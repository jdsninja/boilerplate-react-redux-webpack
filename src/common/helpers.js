import moment from 'moment'

export const generateDateTs = (reports) => {
  return [...reports].map(x => {
    x.date_ts = moment(x.date_ymd, 'YYYY-MM-DD').unix()
    return x
  })
}

export const sortReportBy = (attr, reports) => {
  return [...reports].sort((a, b) => {
    if (a[attr] > b[attr]) {
      return 1
    }
    if (a[attr] < b[attr]) {
      return -1
    }
    // a must be equal to b
    return 0
  }).reverse()
}

export const neutraliseAccent = (data) => {
  return ! data ?
    '' :
    typeof data === 'string' ?
      data
        .replace( /έ/g, 'ε' )
        .replace( /[ύϋΰ]/g, 'υ' )
        .replace( /ό/g, 'ο' )
        .replace( /ώ/g, 'ω' )
        .replace( /ά/g, 'α' )
        .replace( /[ίϊΐ]/g, 'ι' )
        .replace( /ή/g, 'η' )
        .replace( /\n/g, ' ' )
        .replace( /á/g, 'a' )
        .replace( /é/g, 'e' )
        .replace( /í/g, 'i' )
        .replace( /ó/g, 'o' )
        .replace( /ú/g, 'u' )
        .replace( /ê/g, 'e' )
        .replace( /î/g, 'i' )
        .replace( /ô/g, 'o' )
        .replace( /ö/g, 'o' )
        .replace( /è/g, 'e' )
        .replace( /ï/g, 'i' )
        .replace( /ü/g, 'u' )
        .replace( /ã/g, 'a' )
        .replace( /õ/g, 'o' )
        .replace( /ç/g, 'c' )
        .replace( /ì/g, 'i' ) :
      data;
}