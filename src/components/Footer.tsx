import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2A2E29;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 30px 20px;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <div>© 2024 Luana & Allan - Todos os direitos reservados</div>
    </FooterContainer>
  );
} 