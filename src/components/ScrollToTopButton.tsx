export const ScrollToTopButton = () => {

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button onClick={handleClick} className='rounded-full p-4 bg-green-800 text-white shadow-sm fixed right-3 bottom-3'>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M18 11l-6 -6" /><path d="M6 11l6 -6" />
      </svg>
    </button>
  )
}
