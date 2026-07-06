import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { galleryImages } from '@/data/gallery'
import { cn } from '@/lib/utils'

export function Gallery() {
  return (
    <section
      id="gallery"
      aria-label="Gallery — a look inside the kitchen and the restaurant"
      className="section-blend-t blend-t-dark section-py relative overflow-hidden bg-cream dark:bg-luxury-black"
    >
      <div className="container-luxury">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="The Gallery"
            title={
              <>
                Aroma, colour,{' '}
                <span className="gradient-text-fire">ceremony.</span>
              </>
            }
            subtitle="A cinematic look inside our kitchens and dining rooms. Every image is real, every plate is served with the same care."
            className="max-w-2xl"
          />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryImages.map((img, i) => (
            <GalleryItem key={img.id} img={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryItem({ img, index }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.9,
        delay: (index % 4) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'group relative overflow-hidden rounded-[1.75rem] border border-black/5 shadow-[0_30px_80px_-40px_rgba(17,17,17,0.35)] dark:border-white/10 dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]',
        // Mobile: keep every tile square so the 2-col grid packs
        // cleanly without row-span gaps. Tall tiles only reclaim their
        // 3:5 vertical crop at md+ where the wider grid has room to
        // absorb the offset row.
        img.tall
          ? 'aspect-square md:row-span-2 md:aspect-3/5'
          : 'aspect-square'
      )}
    >
      <motion.img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="h-full w-full object-cover"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.06 }}
      />
      {/* Bottom gradient: always visible on mobile (subtle) so the
          caption underneath is readable without hover. Desktop uses
          the fuller hover-reveal treatment. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100 md:from-black/70" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3 text-[11px] font-semibold tracking-tight text-cream opacity-90 transition-all duration-700 md:translate-y-6 md:px-5 md:pb-5 md:text-sm md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        {img.caption}
      </figcaption>
    </motion.figure>
  )
}
