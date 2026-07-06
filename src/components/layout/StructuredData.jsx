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
        streetAddress: 'Main Road',
        addressLocality: site.branch.city,
        addressRegion: 'Andhra Pradesh',
        postalCode: '523201',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 15.813,
        longitude: 79.983,
      },
      telephone: site.branch.phone,
      email: site.branch.email,
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
          closes: '24:00',
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
