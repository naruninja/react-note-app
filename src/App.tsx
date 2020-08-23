import React from 'react'
import { noteSlice, selNoteDb, selNoteList } from '_/slices/noteSlice'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, Route, Switch } from 'react-router-dom'
import { NotePanel } from '_/note/NotePanel'

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

   React.useEffect(() => {
      dispatch(noteSlice.actions.fetchNotes())
   }, [])

   return (
      <AppContainer>
         <PageTitle>Your notes</PageTitle>
         <NewNote onAddNote={note => dispatch(noteSlice.actions.addNote(note))} />
         {notes.map(note => (
            <NotePanel key={note.id} note={note} />
         ))}
      </AppContainer>
   )
}

const NoteDetailPage = ({ noteId }) => {
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
   return (
      <AppContainer>
         <PageTitle>Note</PageTitle>
         <NotePanel note={note} hideDetail />
         <Link to={'/'}>
            <div
               className={'is-size-5'}
               css={`
                  color: white;
               `}>
               Back to notes
            </div>
         </Link>
      </AppContainer>
   )
}

const NewNote = ({ onAddNote }) => {
   const [content, setContent] = React.useState('')
   return (
      <div
         className={'panel'}
         css={`
            background-color: white;
         `}>
         <div className="panel-block">
            <textarea
               value={content}
               onChange={e => setContent(e.target.value.replace(/\n/g, ''))}
               onKeyDown={e => {
                  if (e.key === 'Enter') {
                     onAddNote(content)
                     setContent('')
                  }
               }}
               className="textarea"
               css={`
                  border: 0;
                  resize: none;
                  box-shadow: none;
               `}
               placeholder="e.g. Do not forget the dog at home."
            />
         </div>
      </div>
   )
}

const AppContainer = styled.section.attrs({ className: 'container' })`
   padding-top: 32px;
   @media only screen and (max-width: 1023px) {
      padding-left: 32px;
      padding-right: 32px;
   }
   @media only screen and (max-width: 500px) {
      padding-left: 16px;
      padding-right: 16px;
   }
`

const PageTitle = styled.h1.attrs({ className: 'title' })`
   color: white;
`

