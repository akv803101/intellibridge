import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BlogNav } from '@/components/BlogNav'
import { client } from '@/lib/sanityClient'

export const metadata: Metadata = {
  title: 'Blog | Latest Insights & Articles — IntelliBridge',
  description:
    'Explore our latest blog posts, insights, and articles on software development, AI solutions, and technology trends.',
}

interface BlogPostCard {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  imageUrl?: string | null
  imageAlt?: string | null
  authorName?: string | null
  categoryTitles?: string[] | null
}

async function getPosts(): Promise<BlogPostCard[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    "imageAlt": coalesce(mainImage.alt, title),
    "authorName": author->name,
    "categoryTitles": categories[]->title
  }`
  try {
    const result = await client.fetch<BlogPostCard[] | null | undefined>(query)
    if (!Array.isArray(result)) return []
    return result.filter((p) => p && typeof p._id === 'string')
  } catch (e) {
    console.error('Error fetching blog list:', e)
    return []
  }
}

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString)
    if (Number.isNaN(d.getTime())) return dateString
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d)
  } catch {
    return dateString
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-8 pt-[max(4rem,calc(3.5rem+env(safe-area-inset-top)))] font-[family-name:var(--font-jakarta)] text-gray-900">
      <BlogNav active="blog" />

      <section className="relative overflow-hidden bg-[#050b1a] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(circle at top left, rgba(6, 182, 212, 0.22), transparent 55%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 font-[family-name:var(--font-jakarta)] text-[clamp(2.25rem,5vw,3rem)] font-black tracking-tight">
            Our Blog
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400 sm:text-xl">Insights and updates on emerging technology trends.</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-12 text-center shadow-lg">
              <div className="mb-6 text-6xl" aria-hidden>
                📝
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">No Blog Posts Yet</h2>
              <p className="text-lg text-gray-600">We&apos;re working on creating amazing content for you. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const slug = post.slug?.current
                  const href = slug ? `/blog/${slug}` : '#'
                  const cats = (post.categoryTitles || []).filter(Boolean)
                  return (
                    <article
                      key={post._id}
                      className="overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl"
                    >
                      <Link href={href} className="block">
                        <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                          {post.imageUrl ? (
                            <Image
                              src={post.imageUrl}
                              alt={post.imageAlt || post.title || ''}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 text-6xl opacity-50">
                              📝
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="p-6">
                        {cats.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {cats.map((c, i) => (
                              <span
                                key={`${post._id}-cat-${i}-${c}`}
                                className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 className="mb-3 line-clamp-2 text-xl font-bold leading-snug">
                          <Link href={href} className="text-gray-900 no-underline transition-colors hover:text-teal-600">
                            {post.title || 'Untitled'}
                          </Link>
                        </h2>
                        {post.excerpt ? <p className="mb-4 line-clamp-3 text-gray-600">{post.excerpt}</p> : null}
                        <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-4 text-sm text-gray-500">
                          <div>
                            {post.publishedAt ? formatDate(post.publishedAt) : null}
                            {post.authorName ? (
                              <>
                                {post.publishedAt ? <span aria-hidden> · </span> : null}
                                {post.authorName}
                              </>
                            ) : null}
                          </div>
                          <Link href={href} className="shrink-0 font-semibold text-teal-600 no-underline hover:text-teal-700">
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
              <p className="text-center text-gray-600">
                Showing <strong className="font-semibold text-teal-600">{posts.length}</strong> blog post{posts.length !== 1 ? 's' : ''}
              </p>
            </>
          )}
        </div>
      </section>

      <footer className="px-4 py-8 pb-12 text-center text-sm text-gray-500">
        © IntelliBridge ·{' '}
        <Link href="/" className="font-semibold text-teal-600 no-underline hover:underline">
          Back to home
        </Link>
      </footer>
    </div>
  )
}
