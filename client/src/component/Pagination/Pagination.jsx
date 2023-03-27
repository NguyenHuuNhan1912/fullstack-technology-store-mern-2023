
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { clsx } from 'clsx';
import style from './pagination.module.scss';

const Pagination = ({ pagination, onPageChange, checkShow}) => {
  // Tong so item chia cho so item tren moi trang
  const handlePageChange = (newPage, type) => {
    if (onPageChange) {
      onPageChange(newPage, type);
    }
  }
  // console.log(pagination);
  console.log(checkShow);
  return (
    <>
      {
        
        (checkShow===true) ? 
        (
          <main className={clsx(style.pagination)}>
            <section className={clsx(style.pagination__head)}>
              {
                (pagination.page === 1) ? (
                  <button
                    onClick={() => handlePageChange(pagination.page + 1, 'next')}
                    style={{display: `${(checkShow===1) ? 'none' : 'block'}`}}
                  >
                    <span>
                      Trang kế tiếp
                    </span>
                    <AiOutlineArrowRight className={clsx(style.icon)}/>
                  </button>
                ) :
                  (
                    (pagination.page === pagination.totalPages) ? (
                      <button
                        onClick={() => handlePageChange(pagination.page - 1, 'prev')}
                      >
                        <AiOutlineArrowLeft className={clsx(style.icon)}/>
                      </button>
                    ) :
                      (
                        <>
                          <button
                            onClick={() => handlePageChange(pagination.page - 1, 'prev')}
                          >
                            <AiOutlineArrowLeft className={clsx(style.icon)}/>
                          </button><button
                            onClick={() => handlePageChange(pagination.page + 1, 'next')}
                          >
                            <span>Trang kế tiếp</span>
                            <AiOutlineArrowRight className={clsx(style.icon)}/>
                          </button>
                        </>
                      )
                  )
              }
            </section>
            <section className={clsx(style.pagination__body)}>
              <p>{`${pagination.page} trên ${pagination.totalPages} trang - ${pagination.length} sản phẩm`}</p>
            </section>
          </main>
        )
        :
        (
          <></>
        )
      }
    </>
  )
}

export default Pagination;