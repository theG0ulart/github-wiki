import { useState } from 'react';

import { Container } from './styles'


import Button from '../components/Button'
import Input from '../components/Input'
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api'

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    try {
      if(currentRepo !== ''){
        const { data } = await api.get(`https://api.github.com/repos/${currentRepo}`)

    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    } else {
    alert('Repositório não encontrado!')
    }
  } else {
    alert('Informe um repositório')
  }} catch (error) {
   alert('Repositório não encontrado!')
  }
}

  const handleRemoveRepo = id => {
    const reposFiltred = repos.filter(repo => repo.id !== id)
    setRepos(reposFiltred)
    
  }

  return (
    <Container>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo key={repo.id} handleRemoveRepo={() => handleRemoveRepo(repo.id)} repo={repo} />)}
    </Container>
  );
}

export default App;
