import { events } from './events.js'
import { getEventImageSrc, getEventStatus, getEventTitle } from '../utils/events.js'

export const site = {
    name: 'GTO Luxembourg',
    legalName: 'GTO Luxembourg',
    url: 'https://gto-luxembourg.lu',
    email: 'gto.luxembourg@hotmail.com',
    logo: '/images/gto_logo.png',
    image: '/images/other/scs7_people.webp',
    sameAs: [
        'https://www.instagram.com/gto.lu/',
        'https://www.tiktok.com/@gto.lu',
        'https://www.facebook.com/GTOLuxembourg'
    ]
}

const absoluteUrl = (path = '/') => `${site.url}${path === '/' ? '' : path}`
const absoluteAsset = (path) => `${site.url}${path}`

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteAsset(site.logo),
    email: site.email,
    sameAs: site.sameAs,
    description:
        'GTO Luxembourg is a non-profit car enthusiast organization in Luxembourg, focused on supercar events, private tours, photoshoots and automotive culture.'
}

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en'
}

const breadcrumbSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path)
    }))
})

const faqSchema = (faqs) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
        }
    }))
})

const eventSchema = (event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${absoluteUrl(`/events/${event.slug}`)}#event`,
    name: getEventTitle(event),
    description: event.explanation || event.shortDescription,
    image: getEventImageSrc(event) ? [absoluteAsset(getEventImageSrc(event))] : undefined,
    url: absoluteUrl(`/events/${event.slug}`),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    startDate: event.startsAt,
    endDate: event.endsAt,
    location: event.location ? {
        '@type': 'Place',
        name: event.location,
        address: event.location
    } : undefined,
    organizer: { '@id': `${site.url}/#organization` },
    offers: getEventStatus(event) === 'upcoming' && event.registration && event.price !== undefined ? {
        '@type': 'Offer',
        price: String(event.price),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: event.registration.url
    } : undefined
})

const eventJsonLd = (event) => [
    ...(event.startsAt ? [eventSchema(event)] : []),
    ...(getEventStatus(event) !== 'past' && event.faqs?.length ? [faqSchema(event.faqs)] : []),
    breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: getEventTitle(event), path: `/events/${event.slug}` }
    ])
]

const eventPages = Object.fromEntries(events.map((event) => [
    `/events/${event.slug}`,
    {
        title: `${getEventTitle(event)} | GTO Luxembourg`,
        description: event.shortDescription,
        image: getEventImageSrc(event),
        staticTitle: getEventTitle(event),
        staticSections: [
            {
                heading: getEventStatus(event) === 'past' ? 'Event recap' : 'The experience',
                text: event.explanation || event.shortDescription
            },
            ...(getEventStatus(event) !== 'past' && event.duration ? [{
                heading: 'Duration',
                text: event.duration
            }] : []),
            ...(getEventStatus(event) === 'past' ? [] : (event.faqs || [])).map((faq) => ({
                heading: faq.question,
                text: faq.answer
            }))
        ],
        jsonLd: eventJsonLd(event)
    }
]))

export const seoRoutes = {
    '/': {
        title: 'GTO Luxembourg | Supercar Events & Car Culture',
        description:
            'GTO Luxembourg is a non-profit car enthusiast organization creating supercar events, private tours and automotive photoshoots in Luxembourg.',
        image: '/images/other/ben911.jpg',
        staticTitle: 'GTO Luxembourg',
        staticSections: [],
        jsonLd: [organizationSchema, websiteSchema]
    },
    '/team': {
        title: 'Team | GTO Luxembourg',
        description:
            'Meet the GTO Luxembourg team, a non-profit group founded in 2017 to promote car culture, events and tours in Luxembourg.',
        image: '/images/team/team.jpeg',
        staticTitle: 'GTO Luxembourg Team',
        staticSections: [
            {
                heading: 'Who is behind GTO Luxembourg?',
                text:
                    'GTO Luxembourg was founded in 2017 and is run by a small team of friends who share a passion for cars, events and Luxembourg automotive culture.'
            }
        ],
        jsonLd: [
            organizationSchema,
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Team', path: '/team' }
            ])
        ]
    },
    '/portfolio': {
        title: 'Car Photoshoots in Luxembourg | GTO Portfolio',
        description:
            'Explore GTO Luxembourg car photography and request a free photoshoot for selected supercars and high-end sportscars in Luxembourg.',
        image: '/images/portfolio/Lamborghini_purplemante.webp',
        staticTitle: 'Car Photoshoots in Luxembourg',
        staticSections: [
            {
                heading: 'Free automotive photoshoots',
                text:
                    'GTO Luxembourg offers free automotive photoshoots for selected supercars and high-end sportscars. Owners can reach out through the contact form or social media to request a shoot.'
            },
            {
                heading: 'Portfolio',
                text:
                    'The portfolio includes supercars, sportscars and special automotive moments photographed by GTO Luxembourg.'
            }
        ],
        jsonLd: [
            organizationSchema,
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Portfolio', path: '/portfolio' }
            ])
        ]
    },
    '/events': {
        title: 'Events | GTO Luxembourg',
        description:
            'Discover upcoming GTO Luxembourg gatherings and tours, and explore photos and recaps from past events.',
        image: '/images/other/scs7_people.webp',
        staticTitle: 'Events',
        staticSections: events.map((event) => ({ heading: getEventTitle(event), text: event.shortDescription })),
        jsonLd: [
            organizationSchema,
            ...events.filter((event) => event.startsAt).map(eventSchema),
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Events', path: '/events' }
            ])
        ]
    },
    ...eventPages,
    '/lens': {
        title: 'GTO Lens | AI Car Recognition',
        description:
            'Use GTO Lens to discover car details instantly from your phone camera with AI-powered vehicle recognition.',
        image: '/images/other/gto-lens.png',
        staticTitle: 'GTO Lens',
        staticSections: [
            {
                heading: 'What is GTO Lens?',
                text:
                    'GTO Lens is an AI-powered tool by GTO Luxembourg that helps visitors identify cars and discover details from a photo.'
            }
        ],
        jsonLd: [
            organizationSchema,
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'GTO Lens', path: '/lens' }
            ])
        ]
    },
    '/terms': {
        title: 'Terms and Conditions | GTO Luxembourg',
        description: 'Read the terms and conditions for using the GTO Luxembourg website and GTO Lens.',
        image: site.image,
        staticTitle: 'Terms and Conditions',
        staticSections: [{ heading: 'Terms', text: 'Terms and conditions for using the GTO Luxembourg website and services.' }],
        robots: 'noindex,follow',
        jsonLd: [organizationSchema]
    },
    '/privacy': {
        title: 'Privacy Policy | GTO Luxembourg',
        description: 'Read how GTO Luxembourg processes personal data, cookies, analytics and optional Google Maps embeds.',
        image: site.image,
        staticTitle: 'Privacy Policy',
        staticSections: [{ heading: 'Privacy', text: 'Privacy information for the GTO Luxembourg website and services.' }],
        robots: 'noindex,follow',
        jsonLd: [organizationSchema]
    },
    '/cookie-policy': {
        title: 'Cookie Policy | GTO Luxembourg',
        description: 'Read how GTO Luxembourg uses essential, analytics and optional third-party cookies.',
        image: site.image,
        staticTitle: 'Cookie Policy',
        staticSections: [{ heading: 'Cookies', text: 'Cookie information for the GTO Luxembourg website and services.' }],
        robots: 'noindex,follow',
        jsonLd: [organizationSchema]
    }
}

export const publicRoutes = Object.keys(seoRoutes)

export const getSeoForPath = (path) => seoRoutes[path] || seoRoutes['/']

export const toCanonical = absoluteUrl
export const toAbsoluteAsset = absoluteAsset
