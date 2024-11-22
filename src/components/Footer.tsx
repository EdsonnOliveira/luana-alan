import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2A2E29;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
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
      <div>"Para que todos vejam, e saibam, e considerem, e juntamente entendam que a mão do Senhor fez isso, e o Santo de Israel o criou." -Isaías 41:20</div>
    </FooterContainer>
  );
} 