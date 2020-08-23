import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { langSlice, selSelectedLanguage } from '_/slices/langSlice'

export const LanguageSwitcher = () => {
   const dispatch = useDispatch()
   const selectedLang = useSelector(selSelectedLanguage)
   return (
      <div className="select">
         <select
            value={selectedLang}
            onChange={e => {
               const lang = e.target.value
               dispatch(langSlice.actions.changeLanguage(lang))
            }}>
            <option value={'en'}>English</option>
            <option value={'cs'}>Čeština</option>
         </select>
      </div>
   )
}
