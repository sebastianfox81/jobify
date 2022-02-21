import { useGlobalContext } from '../context/appContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useGlobalContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  }) // returns an array of pages [1,2,3,4...]

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    changePage(newPage)
  }
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    changePage(newPage)
  }
  return (
    <section>
      <button className='prev-btn' onClick={prevPage}>
      <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </section>
  )
}

export default PageBtnContainer