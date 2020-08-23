import React from 'react'
import styled from 'styled-components'
import { useTexts } from '_/slices/langSlice'

export const NewNote = ({ onAddNote }) => {
   const [content, setContent] = React.useState('')
   const t = useTexts()
   return (
      <NotePanel>
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
               placeholder={t`NewNote.placeholder`}
            />
         </div>
      </NotePanel>
   )
}

const NotePanel = styled.div.attrs({ className: 'panel' })`
   background-color: white;
`
