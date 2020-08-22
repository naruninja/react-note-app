import React from 'react'
import { Note, noteSlice, selNoteDb, selNoteList } from '_/slices/noteSlice'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Route, Switch, Link } from 'react-router-dom'

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
         <nav
            className="breadcrumb is-size-5"
            css={`
               & a,
               & li.is-active a,
               &.breadcrumb li + li::before {
                  color: white;
                  &:hover {
                     color: white;
                  }
               }
            `}>
            <ul>
               <li>
                  <Link to={'/'}>Notes</Link>
               </li>
               <li className="is-active">
                  <Link to={'/'}>Note {note.id}</Link>
               </li>
            </ul>
         </nav>

         <NotePanel note={note} hideDetail />
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

const NotePanel: React.FC = ({
   note,
   hideDetail = false,
}: {
   note: Note
   hideDetail?: boolean
}) => {
   const dispatch = useDispatch()
   return (
      <div
         className={'panel'}
         css={`
            background-color: white;
         `}>
         <div className="panel-block is-size-5">{note.title}</div>
         <div className="panel-block">
            <div className="buttons are-small">
               {!hideDetail && (
                  <Link to={`/note/${note.id}`}>
                     <button className="button is-white">Detail</button>
                  </Link>
               )}
               <button
                  className="button is-light is-danger"
                  onClick={() => dispatch(noteSlice.actions.deleteNote(note.id))}>
                  Delete
               </button>
               <button className="button is-light is-warning">Edit</button>
            </div>
         </div>
      </div>
   )
}
