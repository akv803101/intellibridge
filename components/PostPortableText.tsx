import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanityImageUrl'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="mb-6 mt-8 text-4xl font-bold text-gray-900">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-4 mt-6 text-3xl font-bold text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-4 text-2xl font-bold text-gray-900">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-2 mt-3 text-xl font-semibold text-gray-900">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-teal-500 pl-4 italic text-gray-700">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-900">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="text-gray-900">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
  },
  types: {
    image: ({ value }) => {
      const asset = value?.asset
      let imageUrl: string | null = null
      if (asset?._ref || asset?._id) {
        try {
          imageUrl = urlFor(value)?.width(1200).url() || null
        } catch {
          imageUrl = null
        }
      } else if (typeof asset?.url === 'string') {
        imageUrl = asset.url
      }
      return (
        <div className="my-8">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={value?.alt || 'Blog image'}
              width={1200}
              height={600}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200">
              <span className="text-gray-400">Image not available</span>
            </div>
          )}
        </div>
      )
    },
  },
}

type Props = { value: PortableTextBlock[] | null | undefined }

export function PostPortableText({ value }: Props) {
  if (!value?.length) return null
  return (
    <div className="prose prose-sm max-w-none sm:prose-base lg:prose-lg prose-headings:scroll-mt-24 prose-pre:overflow-x-auto prose-img:max-w-full">
      <PortableText value={value} components={components} />
    </div>
  )
}
