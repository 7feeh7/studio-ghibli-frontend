import { useState, useEffect } from 'react'

import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardGroup,
  CardTitle,
  CardFooter
} from 'reactstrap'

import PaginationPage from './Pagination'
import Button from './Button'
import Alert from './Alert'

import './styles.css'

import api from './service/api'

type Movie = {
  id: string,
  title: String,
  banner: string,
  description: String,
  director: String,
  producer: String
  count: String
}

let numberOfPages = 0

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalMovies, setTotalMovies] = useState<number>(0)
  const [visibleAlert, setVisibleAlert] = useState<boolean>(false)

  if (totalMovies % 8 === 0) {
    numberOfPages = Math.floor(totalMovies / 8);
  } else {
    numberOfPages = Math.floor(totalMovies / 8) + 1;
  }

  useEffect(() => {
    api.get(`/films?page=${currentPage}`)
      .then(response => {
        const count = response.headers["x-total-count"] || "0" 
        setTotalMovies(parseInt(count))
        setMovies(response.data)
      })
  }, [currentPage])

  function nextpage(pageNumber: any) {
    setCurrentPage(pageNumber)
  }

  function tenChange(pageNumber: any, isposOrneg: any) {
    let finalPage;
    if (isposOrneg > 0) {
      finalPage = pageNumber + 10
    } else {
      finalPage = pageNumber - 10
    }
    setCurrentPage(finalPage)
  }

  function hundreadChange(pageNumber: any, isposOrneg: any) {
    let finalPage;
    if (isposOrneg > 0) {
      finalPage = pageNumber + 100
    } else {
      finalPage = pageNumber - 100
    }
    setCurrentPage(finalPage)
  }

  return (
    <div className='container'>
      <Alert visibleAlert={visibleAlert} />
      
      <Button setVisibleAlert={setVisibleAlert}/>

      <CardGroup className='movie-group'>
        {movies?.map(movie => {
          return (
            <Card key={movie.id} className='my-2'>
              <CardImg src={movie.banner} />
              <CardBody>
                <CardTitle tag="h5">
                  {movie.title}
                </CardTitle>
                <CardText className='movie-description'>
                  {movie.description}
                </CardText>
              </CardBody>
              <CardFooter>
                <strong>Direção: </strong>{movie.director} /
                <strong> Produção: </strong>{movie.producer}
              </CardFooter>
            </Card>
          )
        })}
      </CardGroup>

      {totalMovies > 10 &&
        <PaginationPage
          pages={numberOfPages}
          nextPage={nextpage}
          currentPage={currentPage}
          hundreadChange={hundreadChange}
          tenChange={tenChange}
        />}
    </div>
  )
}

export default App
