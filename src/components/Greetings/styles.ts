import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

export const Hour = styled.h1`
  font-size: 30vh
  
`

export const Text = styled.p`
  margin-top: 24px;
  font-size: 18px;
`
export const ContainerButton = styled.div`
  display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 24px;


`