import React from 'react'
import Config from '../constants/config';

export const removeTags = (str) => {
    return str.replace(/(<([^>]+)>)/ig , "")
}

export const getSearchAttr = (props) => {
  let searchParam = ''

  if(props.hasOwnProperty('geofences')) {
    searchParam += `&geofence={formatted_address:"Dakar,Senegal"}`
  }

  if(props.hasOwnProperty('categories') && props.categories.length > 0) {
    searchParam += `&c=${props.categories.join(',')}`
  }

  if(props.hasOwnProperty('rtype') && props.rtype.length > 0) {
    searchParam += `&pt=${props.rtype.join(',')}`
  }

  if(props.hasOwnProperty('impact') && props.impact.length > 0) {
    searchParam += `&i=${props.impact.join(',')}`
  }

  if(props.hasOwnProperty('countries') && props.countries.length > 0) {
    searchParam += `&a=${props.countries.join(',')}`
  }

  if(props.hasOwnProperty('period') && props.period.startDate && props.period.endDate) {
    searchParam += `&ts=${props.period.startDate.format('YYYY-MM-DD')}&te=${props.period.endDate.format('YYYY-MM-DD')}`
  }

  if(props.hasOwnProperty('txt') && props.txt) {
    searchParam += `&txt=${props.txt}`
  }

  return searchParam
}

export const matchIdWithIcon = ({ id }) => {
  return Config.categories.find( x => x.ids.find( y => y === id) ) || '';
}

export const showCategoriesIcon = ({ ids }) => (
  ids.map((x, i) => {
    const icon = matchIdWithIcon({ id: x })
    return <a key={i} href={`/?c=${x}`} title={icon.human} className={`category-icon ${icon.name}`} />;
  })
);
