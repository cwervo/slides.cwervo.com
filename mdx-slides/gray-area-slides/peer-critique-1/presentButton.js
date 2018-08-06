import React from 'react'
import styled from 'styled-components'
import { space, width, fontSize, color } from 'styled-system'

const BaseButton = styled.button`
    color: white;
    background-color: black;
    border: none;
    width: 100%;
    text-align: center;
    font-size: 1em;
`

const PresentButton = () => (
    <BaseButton onClick={e => document.body.requestFullscreen()}>present</BaseButton>
)

export default PresentButton
