import { useEffect } from 'react'
import { site } from '@/data/site'

export function StructuredData() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: site.name,
      alternateName: 'Ismail Biryani Addanki',
      description: site.seo.description,
      url: site.seo.url,
      image: [site.seo.image],
      servesCuisine: ['Hyderabadi', 'Indian', 'Mughlai'],
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'D.No. 6-130/A, Kakani Palem, Near Bhavani Center',
        addressLocality: site.branch.city,
        addressRegion: 'Andhra Pradesh',
        addressCountry: 'IN',
      },
      telephone: site.branch.phone,
      email: site.branch.email,
      taxID: site.gstin,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '11:00',
          closes: '23:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday', 'Sunday'],
          opens: '11:00',
          closes: '00:00',
        },
      ],
      sameAs: [
        site.socials.facebook,
        site.socials.instagram,
        site.socials.youtube,
      ],
      founder: { '@type': 'Person', name: site.founder },
      hasMenu: `${site.seo.url}#menu`,
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
