import * as Accordion from '@radix-ui/react-accordion'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { faqItems } from '@/data/faq'

export function FAQ() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="section-py relative overflow-hidden bg-cream dark:bg-luxury-black"
    >
      <div className="container-luxury">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <SectionHeader
            eyebrow="Good questions"
            title={
              <>
                Everything you may{' '}
                <span className="gradient-text-gold">want to know.</span>
              </>
            }
            subtitle="Straight answers about our craft, our sourcing and our family experience."
            className="md:sticky md:top-32 md:self-start"
          />

          <Accordion.Root
            type="single"
            collapsible
            defaultValue={faqItems[0].id}
            className="flex flex-col gap-3"
          >
            {faqItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Accordion.Item
                  value={item.id}
                  className="group overflow-hidden rounded-3xl border border-black/5 bg-white/70 backdrop-blur transition-colors duration-500 hover:border-luxury-black/15 data-[state=open]:border-luxury-black/20 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/25 dark:data-[state=open]:border-white/30"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors md:gap-6 md:px-6 md:py-6 [&[data-state=open]_[data-plus]]:hidden [&[data-state=closed]_[data-minus]]:hidden">
                      <span className="text-base font-semibold tracking-tight text-luxury-black md:text-xl dark:text-cream">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-luxury-black transition-transform duration-500 group-data-[state=open]:rotate-180 group-hover:scale-105 md:h-10 md:w-10 dark:border-white/15 dark:bg-white/5 dark:text-cream"
                      >
                        <Plus data-plus size={14} strokeWidth={2.2} />
                        <Minus data-minus size={14} strokeWidth={2.2} />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden text-neutral-600 data-[state=open]:animate-[accordion-down_0.5s_var(--ease-out-luxury)] data-[state=closed]:animate-[accordion-up_0.4s_var(--ease-out-luxury)] dark:text-neutral-300">
                    <div className="px-5 pb-5 pt-0 text-[15px] leading-relaxed md:px-6 md:pb-6 md:text-[16px]">
                      {item.a}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  )
}
