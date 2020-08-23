import { noteSlice, selNoteList } from '_/slices/noteSlice'
import { rxSandbox } from 'rx-sandbox'
import { marbleAssert } from 'rx-sandbox/dist/src/assert/marbleAssert'
import { map, tap } from 'rxjs/operators'
import { noteApi } from '_/inst'

import { of, Subject } from 'rxjs'
import { rootEpic } from '_/epic'
import { ActionsObservable, Epic, StateObservable } from 'redux-observable'
import { rootReducer, RootState } from '_/store'
import { root } from 'rxjs/internal-compatibility'
import { NoteApi } from '_/noteApi'

jest.mock('_/noteApi')
const noteApiMock = noteApi as jest.Mocked<NoteApi>

const mockRouter = (routing: {
   [key: string]: (body: any, headers: { [key: string]: string }) => object
}) => (
   method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
   endpoint: string,
   body?: object,
   headers = {}
) => {
   const handlerKey = method + endpoint
   const handler = routing[handlerKey]
   if (!handler) throw new Error(`Mock route for ${handlerKey} not defined.`)
   const res = handler(body, headers)
   return of(res)
}

type Action<T extends string, P> = {
   type: T
   payload: P
}

// inspired by https://blog.krawaller.se/posts/unit-testing-redux-observable-epics/

export const testEpicImp = <A extends Action<string, any>, D>(
   epic: Epic<A, A, RootState, D>, // A, S, D will be inferred from here
   state = rootReducer(undefined, { type: 'n/a' })
) => {
   const actionSubject = new Subject<A>()
   const action$ = new ActionsObservable(actionSubject)
   const emitAction = actionSubject.next.bind(actionSubject)

   const stateSubject = new Subject<RootState>()
   const state$ = new StateObservable(stateSubject, state)
   const emitState = stateSubject.next.bind(stateSubject)

   const epicEmissions: A[] = []
   const errors: any[] = []
   epic(action$, state$, {} as D).subscribe(
      act => {
         const nextState = rootReducer(state$.value, act)
         emitState(nextState)
         epicEmissions.push(act)
      },
      err => {
         console.error(err)
         errors.push(err)
      }
   )

   return {
      emitAction: (act: A) => {
         const nextState = rootReducer(state$.value, act)
         emitState(nextState)
         emitAction(act)
      },
      epicEmissions,
      state$,
      errors,
   }
}

describe('noteEpic', () => {
   afterEach(() => {
      jest.resetAllMocks()
   })
   describe('note api interaction', () => {
      const notes = [
         {
            id: 1,
            title: 'Walk the dog',
         },
         {
            id: 2,
            title: 'Do not feed the cat',
         },
      ]
      it('fetches notes correctly', async () => {
         const { emitAction, epicEmissions, state$ } = testEpicImp(rootEpic)
         noteApiMock.request.mockImplementation(
            mockRouter({
               'GET/': () => {
                  return notes
               },
            })
         )
         emitAction(noteSlice.actions.fetchNotes())

         const st = state$.value
         expect(epicEmissions).toHaveLength(1)
         expect(selNoteList(st)).toEqual(notes.slice().reverse())
      })

      it('fetches a note correctly', async () => {
         const { emitAction, epicEmissions, state$ } = testEpicImp(rootEpic)
         noteApiMock.request.mockImplementation(
            mockRouter({
               [`GET/${notes[0].id}`]: () => {
                  return notes[0]
               },
            })
         )
         emitAction(noteSlice.actions.fetchNote(1))

         const st = state$.value
         expect(epicEmissions).toHaveLength(1)
         expect(selNoteList(st)).toEqual([notes[0]])
      })

      it('adds a note correctly', async () => {
         const { emitAction, epicEmissions, state$ } = testEpicImp(
            rootEpic,
            rootReducer(undefined, noteSlice.actions.fetchNotes_success(notes))
         )
         const title = 'Do not feed the gorilla'
         let hasCreated = false
         noteApiMock.request.mockImplementation(
            mockRouter({
               [`POST/`]: ({ title }) => {
                  hasCreated = true
                  return { id: 300, title }
               },
            })
         )
         emitAction(noteSlice.actions.addNote(title))

         const st = state$.value
         expect(hasCreated).toBeTruthy()
         expect(epicEmissions).toHaveLength(1)
         expect(selNoteList(st)).toEqual([{ id: 300, title }, ...notes.slice().reverse()])
      })

      it('updates notes correctly', async () => {
         const { emitAction, epicEmissions, state$ } = testEpicImp(
            rootEpic,
            rootReducer(undefined, noteSlice.actions.fetchNotes_success(notes))
         )
         const title = 'Do not feed the gorilla'
         let hasUpdated = false
         noteApiMock.request.mockImplementation(
            mockRouter({
               [`PUT/2`]: note => {
                  hasUpdated = true
                  return note
               },
            })
         )
         emitAction(noteSlice.actions.updateNote({ id: 2, title }))

         const st = state$.value
         expect(hasUpdated).toBeTruthy()
         expect(epicEmissions).toHaveLength(1)
         expect(selNoteList(st)).toEqual([{ id: 2, title }, notes[0]])
      })

      it('deletes notes correctly', async () => {
         const { emitAction, epicEmissions, state$ } = testEpicImp(
            rootEpic,
            rootReducer(undefined, noteSlice.actions.fetchNotes_success(notes))
         )
         let hasDeleted = false
         noteApiMock.request.mockImplementation(
            mockRouter({
               [`DELETE/2`]: note => {
                  hasDeleted = true
                  return null
               },
            })
         )
         emitAction(noteSlice.actions.deleteNote(2))

         const st = state$.value
         expect(hasDeleted).toBeTruthy()
         expect(epicEmissions).toHaveLength(1)
         expect(selNoteList(st)).toEqual([notes[0]])
      })
   })
})
