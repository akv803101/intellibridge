import Link from 'next/link'

type Props = { active?: 'blog' }

export function BlogNav({ active }: Props) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between border-b border-white/[0.08] bg-[rgba(6,8,15,0.92)] px-[4%] py-4 backdrop-blur-[16px]">
      <Link
        href="/"
        className="font-[family-name:var(--font-syne)] text-[1.25rem] font-extrabold tracking-[-0.5px] text-white no-underline"
      >
        Intelli<span className="text-[#00e5c0]">Bridge</span>
      </Link>
      <ul className="m-0 hidden list-none gap-8 p-0 md:flex">
        <li>
          <Link href="/#programs" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
            Programs
          </Link>
        </li>
        <li>
          <Link href="/#curriculum" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
            Curriculum
          </Link>
        </li>
        <li>
          <Link href="/#mentors" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
            Mentors
          </Link>
        </li>
        <li>
          <Link href="/#pricing" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
            Pricing
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`text-[0.9rem] font-medium no-underline transition-colors ${
              active === 'blog' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Blog
          </Link>
        </li>
      </ul>
      <div>
        <Link
          href="/#apply"
          className="inline-flex items-center gap-1 rounded-md bg-gradient-to-br from-[#00e5c0] to-[#7b6cff] px-[1.4rem] py-[0.6rem] text-[0.875rem] font-bold text-black no-underline transition-all hover:opacity-90"
        >
          Apply Now →
        </Link>
      </div>
    </nav>
  )
}
