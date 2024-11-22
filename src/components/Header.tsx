import styled from 'styled-components';
import { useState } from 'react';

const HeaderContainer = styled.header`
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2A2E29;
  position: fixed;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.div`
  font-family: 'Signature', cursive;
  color: white;
  font-size: 2.5rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 10px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #2A2E29;
    padding: 20px;
    gap: 20px;
    text-align: center;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>L & A</Logo>
      <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✕' : '☰'}
      </MobileMenuButton>
      <Nav isOpen={isMenuOpen}>
        <NavLink href="/">Início</NavLink>
        <NavLink href="/confirm-presence">Confirmar presença</NavLink>
        <NavLink href="/gift-list">Lista de presentes</NavLink>
        <NavLink href="/contact">Localização</NavLink>
      </Nav>
    </HeaderContainer>
  );
} 