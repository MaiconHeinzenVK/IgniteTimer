import { HeaderContainer } from './styles'

import LogoIgnite from '../../assets/logoIgnite.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={20} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
