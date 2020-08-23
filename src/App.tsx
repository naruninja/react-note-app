import React from 'react'
import { noteSlice, selNoteList } from '_/slices/noteSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { NotePanel } from '_/note/NotePanel'
import { useTexts } from '_/slices/langSlice'
import { NewNote } from '_/NewNote'
import { AppContainer, PageHeader, PageTitle } from '_/pageComponents'
import { NoteDetailPage } from '_/NoteDetailPage'

export const App = () => {
   return <PageRouting />
}

const PageRouting = () => {
   return (
      <Switch>
         <Route path={'/'} exact>
            <NoteListPage />
         </Route>
         <Route
            exact
            path={'/note/:noteId'}
            render={({ match }) => {
               return <NoteDetailPage noteId={match.params.noteId} />
            }}
         />
      </Switch>
   )
}

const NoteListPage = () => {
   const dispatch = useDispatch()
   const notes = useSelector(selNoteList)
   const t = useTexts()

   React.useEffect(() => {
      dispatch(noteSlice.actions.fetchNotes())
   }, [])

   return (
      <AppContainer>
         <PageHeader>{t`NoteListPage.title`}</PageHeader>
         <NewNote onAddNote={note => dispatch(noteSlice.actions.addNote(note))} />
         {notes.map(note => (
            <NotePanel key={note.id} note={note} />
         ))}
      </AppContainer>
   )
}
