import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect/src'
import { RootState } from '_/store'
import { useSelector } from 'react-redux'

type LanguageCode = 'en' | 'cs'
export type LangState = {
   selectedLangCode: LanguageCode
}

const initialState: LangState = {
   selectedLangCode: 'en',
}

export const langSlice = createSlice({
   name: 'lang',
   initialState,
   reducers: {
      changeLanguage: (
         st: LangState,
         { payload: selectedLangCode }: { payload: LanguageCode }
      ) => ({ ...st, selectedLangCode }),
   },
})

const texts = {
   en: {
      'NotePanel.showDetailBtn': 'Show detail',
      'NotePanel.deleteNoteBtn': 'Delete',
      'NotePanel.deleteNoteBtn.confirm': 'Do you really want to delete this note?',
      'NoteDetailPage.title': 'Note',
      'NoteDetailPage.backToNotes': 'Back to notes',
      'NoteListPage.title': 'Your note list',
      'NewNote.placeholder': 'e.g. Do not forget the dog at home.',
   },
   cs: {
      'NotePanel.showDetailBtn': 'Zobrazit detail',
      'NotePanel.deleteNoteBtn': 'Smazat',
      'NotePanel.deleteNoteBtn.confirm': 'Opravdu chcete smazat poznámku?',
      'NoteDetailPage.title': 'Poznámka',
      'NoteDetailPage.backToNotes': 'Zpět na seznam poznámek',
      'NoteListPage.title': 'Vaše poznámky',
      'NewNote.placeholder': 'e.g. Příště nezapomenout psa doma.',
   },
}

export const selTexts = st => {
   const langCode = st.lang.selectedLangCode
   return texts[langCode]
}
export const selSelectedLanguage = st => st.lang.selectedLangCode

export const useTexts = () => {
   const texts = useSelector(selTexts)
   return React.useMemo(() => {
      return ([textId]) => {
         return texts[textId] || `{{${textId}}}`
      }
   }, [texts])
}
