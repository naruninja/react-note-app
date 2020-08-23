import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect/src'
import { RootState } from '_/store'

export type Note = {
   id: number
   title: string
}

export type NoteState = { noteDb: { [key: string]: Note } }

const initialState: NoteState = {
   noteDb: {},
}

const dbify = entities => {
   return entities.reduce((acc, ent) => {
      acc[ent.id] = ent
      return acc
   }, {})
}

export const noteSlice = createSlice({
   name: 'note',
   initialState,
   reducers: {
      fetchNotes: st => st,
      fetchNotes_success: (st: NoteState, { payload: notes }: { payload: Note[] }) => ({
         ...st,
         noteDb: dbify(notes),
      }),
      addNote: (st, { payload: noteContent }: { payload: string }) => st,
      addNote_success: (st: NoteState, { payload: note }: { payload: Note }) => ({
         ...st,
         noteDb: {
            ...st.noteDb,
            [note.id]: note,
         },
      }),
      deleteNote: (st, { payload: noteId }) => st,
      deleteNote_success: (st: NoteState, { payload: noteId }) => ({
         ...st,
         noteDb: { ...st.noteDb, [noteId]: undefined },
      }),
      fetchNote: (st: NoteState, { payload: noteId }) => st,
      fetchNote_success: (st: NoteState, { payload: note }: { payload: Note }) => ({
         ...st,
         noteDb: {
            ...st.noteDb,
            [note.id]: note,
         },
      }),
      updateNote: (st: NoteState, { payload: note }: { payload: Note }) => ({
         ...st,
         noteDb: {
            ...st.noteDb,
            [note.id]: note,
         },
      }),
      updateNote_success: (st: NoteState, { payload: note }: { payload: Note }) => st,
   },
})

export const selNoteDb = (st: RootState) => st.note.noteDb
export const selNoteList = createSelector(
   (st: RootState) => st.note.noteDb,
   noteDb =>
      Object.values(noteDb)
         .filter(x => !!x)
         .sort((p, n) => n.id - p.id)
)
