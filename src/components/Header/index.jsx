import { Container, Profile } from "./styles"

export function Header() {
  return (
    <Container>
      <Profile>
        <img 
          src="https://github.com/felipegazolla.png" 
          alt="Foto do Felipe"
        />

        <div>
          <span>Bem vindo</span>
          <strong>Felipe Gazolla</strong>
        </div>
      </Profile>
    </Container>
  )
}