import { exhaustMap, filter, map, mergeAll, startWith, tap, withLatestFrom } from 'rxjs/operators'
import { combineEpics, ofType, StateObservable } from 'redux-observable'
import { noteApi } from '_/inst'
import { Note, noteSlice } from '_/slices/noteSlice'
import { RootState } from '_/store'
import { push } from 'connected-react-router'

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
            .pipe(map(note => noteSlice.actions.addNote_success({ ...note, title })))
      )
   )

export const updateNoteEpic = action$ =>
   action$.pipe(
      ofType('note/updateNote'),
      exhaustMap(({ payload: note }: { payload: Note }) =>
         noteApi
            .request<Note>('PUT', `/${note.id}`, note)
            .pipe(map(note => noteSlice.actions.updateNote_success(note)))
      )
   )

export const deleteNoteEpic = (action$, state$: StateObservable<RootState>) =>
   action$.pipe(
      ofType('note/deleteNote'),
      exhaustMap(({ payload: noteId }) =>
         noteApi.request('DELETE', `/${noteId}`).pipe(
            withLatestFrom(state$),
            map(([, st]) => {
               const location = st.router.location.pathname
               const isAtDetailPage = location === `/note/${noteId}`
               return [
                  isAtDetailPage ? push('/') : null,
                  noteSlice.actions.deleteNote_success(noteId),
               ].filter(x => !!x)
            }),
            mergeAll()
         )
      )
   )

export const noteEpic = combineEpics(
   fetchNotesEpic,
   fetchNoteEpic,
   addNoteEpic,
   deleteNoteEpic,
   updateNoteEpic
)
