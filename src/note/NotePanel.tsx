import React from 'react'
import { Note, noteSlice } from '_/slices/noteSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { useTexts } from '_/slices/langSlice'

export const NotePanel: React.FC = ({
   note,
   hideDetail = false,
}: {
   note: Note
   hideDetail?: boolean
}) => {
   const dispatch = useDispatch()
   const t = useTexts()

   // edited title
   const [title, setTitle] = React.useState(null)

   return (
      <div
         className={'panel'}
         css={`
            background-color: white;
         `}>
         <div className="panel-block is-size-5">
            {title === null ? (
               <div
                  onClick={() => {
                     if (title === null) {
                        setTitle(note.title)
                     }
                  }}>
                  {note.title}
               </div>
            ) : (
               <input
                  css={`
                     width: 100%;
                     border: 0;
                     height: 30px;
                     padding: 0;
                     &:focus {
                        border: 0;
                        outline: none;
                     }
                  `}
                  value={title}
                  autoFocus
                  onFocus={e => {
                     e.target.select()
                  }}
                  onChange={e => {
                     setTitle(e.target.value)
                  }}
                  onKeyDown={e => {
                     if (e.key === 'Enter') {
                        dispatch(noteSlice.actions.updateNote({ ...note, title }))
                        setTitle(null)
                     }
                  }}
                  onBlur={e => {
                     setTitle(null)
                  }}
               />
            )}
         </div>
         <div className="panel-block">
            <div className="buttons are-small">
               {!hideDetail && (
                  <Link to={`/note/${note.id}`}>
                     <button className="button is-white">{t`NotePanel.showDetailBtn`}</button>
                  </Link>
               )}
               <button
                  className="button is-light is-danger"
                  onClick={() => {
                     if (!confirm(t`NotePanel.deleteNoteBtn.confirm`)) return
                     dispatch(noteSlice.actions.deleteNote(note.id))
                  }}>
                  {t`NotePanel.deleteNoteBtn`}
               </button>
            </div>
         </div>
      </div>
   )
}
