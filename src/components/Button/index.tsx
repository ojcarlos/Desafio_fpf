import { ReactNode, ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = {
  children: ReactNode;
  able: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (props: ButtonProps) {
  return <Container type="button" disabled={!props.able} {...props}  />
}
