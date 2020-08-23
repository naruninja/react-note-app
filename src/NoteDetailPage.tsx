import React from 'react'
import { noteSlice, selNoteDb } from '_/slices/noteSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useTexts } from '_/slices/langSlice'
import { Link } from 'react-router-dom'
import { AppContainer, PageTitle } from '_/pageComponents'
import { NotePanel } from '_/note/NotePanel'

export const NoteDetailPage = ({ noteId }) => {
   const noteDb = useSelector(selNoteDb)
   const note = noteDb[noteId]
   const dispatch = useDispatch()

   React.useEffect(() => {
      if (!note) {
         dispatch(noteSlice.actions.fetchNote(noteId))
      }
   }, [])

   return note ? <NoteDetailPageContent note={noteDb[noteId]} /> : null
}

const NoteDetailPageContent = ({ note }) => {
   const t = useTexts()
   return (
      <AppContainer>
         <PageTitle>{t`NoteDetailPage.title`}</PageTitle>
         <NotePanel note={note} hideDetail />
         <Link to={'/'}>
            <div
               className={'is-size-5'}
               css={`
                  color: white;
               `}>
               {t`NoteDetailPage.backToNotes`}
            </div>
         </Link>
      </AppContainer>
   )
}
