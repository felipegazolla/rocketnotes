import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { Note } from '../../components/Note'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const [tags, setTags] = useState([])
  const [tagSelected, setTagSelected] = useState([])
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleTagSelected(tagName) {
    if(tagName === "all") {
      return setTagSelected([])
    }

    const alreadySelected = tagSelected.includes(tagName)

    if(alreadySelected) {
      const filteredTags = tagSelected.filter(tag => tag !== tagName)
      setTagSelected(filteredTags)

    } else {
      setTagSelected(prevState => [...prevState, tagName])
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }
    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagSelected}`)
      setNotes(response.data)
    }

    fetchNotes()
  }, [tagSelected, search])

  return (
    <Container>

      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header/>

      <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            $isactive={tagSelected.length === 0} 
            onClick={() => handleTagSelected("all")}
          />
        </li>
        {
          tags && tags.map(tag => (
            <li 
              key={String(tag.id)} 
            >
              <ButtonText 
                title={tag.name} 
                $isactive={tagSelected.includes(tag.name)} 
                onClick={() => handleTagSelected(tag.name)} 
              />
            </li>
          ))
        }
      </Menu>
      <Search>
        <Input 
          placeholder="Pesquisar" 
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>
      <Content>
        <Section title="Minhas Notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  )
}