// src/components/Video.tsx
import React from 'react'
import clsx from 'clsx'

export interface VideoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Zdroj videa.
   * Pro lokální video se použije například "/videos/Video.mp4"
   * Pro YouTube video použijte prefix "yt://", následovaný ID videa (např. "yt://dQw4w9WgXcQ")
   */
  src: string
  /** Volitelný poster obrázek pro video */
  poster?: string
  /** Dodatečné třídy pro obalující div */
  className?: string
  /** Volitelný MIME typ videa (výchozí 'video/mp4') */
  type?: string
}

export const Video: React.FC<VideoProps> = ({
  src,
  poster,
  className,
  type,
  ...props // props for the container div only
}) => {
  // If src starts with "yt://", it's a YouTube video.
  if (src.startsWith('yt://')) {
    const videoId = src.replace('yt://', '')
    const embedUrl = `https://www.youtube.com/embed/${videoId}`
    return (
      <div
        className={clsx('my-10 overflow-hidden rounded-xl bg-black', className)}
        {...props}
      >
        <iframe
          width="100%"
          height="480"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Otherwise, use native video element.
  return (
    <div
      className={clsx('my-10 overflow-hidden rounded-xl bg-black', className)}
      {...props}
    >
      <video controls poster={poster} className="w-full">
        <source src={src} type={type || 'video/mp4'} />
        Váš prohlížeč nepodporuje přehrávání videa.
      </video>
    </div>
  )
}
