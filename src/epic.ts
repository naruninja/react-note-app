import { combineEpics } from 'redux-observable'
import { noteEpic } from '_/noteEpic'

export const rootEpic = combineEpics(noteEpic)
