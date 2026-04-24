import { Navbar } from './Navbar'
import { header } from '@/data/portfolio'

export function Header() {
  const { homepage, title } = header

  return (
    <header className="h-24 md:h-32 max-w-[1100px] w-[95%] mx-auto flex items-center justify-between">
      <h3 className="text-2xl">
        {homepage ? (
          <a href={homepage} className="link">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <Navbar />
    </header>
  )
}

export default Header
