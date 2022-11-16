import { useFetch } from './hooks/useFetch'

type Movie = {
  id: string,
  title: String, 
  banner: string, 
  description: String, 
  director: String, 
  producer: String
}

function App() {
  const { data: movies } = useFetch<Movie[]>('https://studio-ghibli-backend.herokuapp.com/films')

  return (
    <div>
      <ul className='movies-list'>
        {movies?.map(movie => {
          return(
            <li key={movie.id}>
              <img 
                src={movie.banner} 
              />
              <p>{movie.id}</p>
              <p>{movie.title}</p>
              <p>{movie.description}</p>
              <p>{movie.director}</p>
              <p>{movie.producer}</p>
            </li>
          )
        })}
      </ul>
    
    </div>
  )
}

export default App
