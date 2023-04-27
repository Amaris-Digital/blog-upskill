
export default function Pagination({totalPosts, postsPerPage, setCurrentPage}) {
    let pages = []


    for ( let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i)
    }

  return (
    <div className='flex justify-between text-3xl col-span-2  '>
        {
            pages.map((page, index) => (
                <button className='bg-red-500 rounded-full py-1 px-2' key={index} onClick={() => setCurrentPage(page)}>{page}</button>
            ) )
        }
    </div>
  )
}
