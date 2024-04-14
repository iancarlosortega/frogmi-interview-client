import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { ScrollToTopButton } from '../components/ScrollToTopButton'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='container mx-auto px-4'>
        <Outlet /> 
      </main>
      <ScrollToTopButton />
    </>
  )
}
