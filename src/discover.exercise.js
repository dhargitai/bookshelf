/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {useEffect, useState, useRef} from 'react'
import {client} from './utils/api-client'

function DiscoverBooksScreen() {
  // idle loading success
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const isQueried = useRef(false)

  useEffect(() => {
    if (!isQueried.current || status === 'loading') {
      return
    }

    setStatus('loading')
    client(`books?query=${encodeURIComponent(query)}`).then(resultData => {
      setData(resultData)
      isQueried.current = false
      setStatus('success')
    })
  })

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  function handleSearchSubmit(event) {
    event.preventDefault()
    isQueried.current = true
    setQuery(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
