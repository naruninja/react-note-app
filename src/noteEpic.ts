import { exhaustMap, filter, map, startWith, tap } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { noteApi } from '_/inst'
import { Note, noteSlice } from '_/slices/noteSlice'

export const fetchNotesEpic = action$ =>
   action$.pipe(
      ofType('note/fetchNotes'),
      exhaustMap(() =>
         noteApi
            .request<Note[]>('GET', '/')
            .pipe(map(notes => noteSlice.actions.fetchNotes_success(notes)))
      )
   )

export const fetchNoteEpic = action$ =>
   action$.pipe(
      ofType('note/fetchNote'),
      exhaustMap(({ payload: noteId }) =>
         noteApi
            .request<Note>('GET', `/${noteId}`)
            .pipe(map(note => noteSlice.actions.fetchNote_success({ ...note, id: noteId })))
      )
   )

export const addNoteEpic = action$ =>
   action$.pipe(
      ofType('note/addNote'),
      exhaustMap(({ payload: title }) =>
         noteApi
            .request<Note>('POST', '/', {
               title,
            })
            .pipe(map(note => noteSlice.actions.addNote_success(note)))
      )
   )

export const deleteNoteEpic = action$ =>
   action$.pipe(
      ofType('note/deleteNote'),
      exhaustMap(({ payload: noteId }) =>
         noteApi
            .request('DELETE', `/${noteId}`)
            .pipe(map(() => noteSlice.actions.deleteNote_success(noteId)))
      )
   )

export const noteEpic = combineEpics(fetchNotesEpic, fetchNoteEpic, addNoteEpic, deleteNoteEpic)
