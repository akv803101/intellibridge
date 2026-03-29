import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from '@portabletext/types'
import { BlogNav } from '@/components/BlogNav'
import { PostPortableText } from '@/components/PostPortableText'
import { client } from '@/lib/sanityClient'
import { urlFor } from '@/lib/sanityImageUrl'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: {
    asset?: { _id?: string; url?: string }
    alt?: string
  }
  publishedAt: string
  author?: string
  categories?: string[]
  body?: PortableTextBlock[]
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{ name },
    categories[]->{ title },
    body
  }`
  try {
    const post = await client.fetch<Record<string, unknown> | null>(query, { slug })
    if (!post) return null
    return {
      ...post,
      author: (post.author as { name?: string } | undefined)?.name,
      categories: (post.categories as { title?: string }[] | undefined)?.map((c) => c.title).filter(Boolean) as string[] | undefined,
      body: post.body as PortableTextBlock[] | undefined,
    } as BlogPost
  } catch (e) {
    console.error('Error fetching blog post:', e)
    return null
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Blog',
      description: 'The requested blog post could not be found.',
    }
  }

  let imageUrl = ''
  if (post.mainImage) {
    try {
      imageUrl =
        post.mainImage.asset?.url || urlFor(post.mainImage).width(1200).height(630).url() || ''
    } catch {
      imageUrl = post.mainImage.asset?.url || ''
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(`*[_type == "post" && defined(slug.current)][].slug.current`)
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  let imageUrl: string | null = null
  if (post.mainImage?.asset?.url) {
    imageUrl = post.mainImage.asset.url
  } else if (post.mainImage) {
    try {
      imageUrl = urlFor(post.mainImage).width(1200).height(630).url() || null
    } catch {
      imageUrl = null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-[max(4rem,calc(3.5rem+env(safe-area-inset-top)))] font-[family-name:var(--font-jakarta)]">
      <BlogNav />

      <article className="px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-4xl">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-6 font-[family-name:var(--font-jakarta)] text-[clamp(1.75rem,5vw,2.75rem)] font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center border-b border-gray-200 pb-8 text-sm text-gray-600">
            {post.publishedAt ? (
              <time dateTime={post.publishedAt} className="mr-4">
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
            {post.author ? (
              <>
                <span className="mr-4">•</span>
                <span>By {post.author}</span>
              </>
            ) : null}
          </div>

          {imageUrl ? (
            <div className="mb-8 overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                width={1200}
                height={630}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          {post.excerpt ? (
            <p className="mb-8 text-xl italic leading-relaxed text-gray-700">{post.excerpt}</p>
          ) : null}

          {post.body ? (
            <div className="mb-12">
              <PostPortableText value={post.body} />
            </div>
          ) : null}

          <div className="mt-12 border-t border-gray-200 pt-8">
            <Link
              href="/blog/"
              className="inline-flex items-center font-semibold text-teal-600 no-underline transition-colors hover:text-teal-700"
            >
              <span className="mr-2">←</span> Back to All Posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
