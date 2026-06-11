export const events = [
    {
        slug: 'supercar-sunday',
        title: 'Supercar Sunday',
        date: '21.06.2026',
        time: '14:00-17:00',
        startsAt: '2026-06-21T14:00:00+02:00',
        startsAtLabel: '21.06.2026, 14:00',
        meta: '21.06.2026 · Mersch',
        location: '33, rue de la Gare, L-7535 Mersch',
        imageSrcRow: '/images/other/gto_scs6.webp',
        imageSrc: '/images/other/scs7_people.webp',
        imageAlt: 'Supercar Sunday by GTO Luxembourg',
        modalCarName: 'Supercar Sunday',
        shortDescription:
            'A public and free event where owners and enthusiasts meet in a relaxed, respectful and family-friendly atmosphere. The event brings together a selection of supercars, hypercars and selected sportscars.',
        explanation:
            'Supercar Sunday is a public and free event where owners and enthusiasts meet in a relaxed, respectful and family-friendly atmosphere. The event brings together a selection of supercars, hypercars and selected sportscars.',
        duration: '21.06.2026, 14:00-17:00',
        faqs: [
            {
                question: 'Is the event free?',
                answer: 'Yes. The event is free for everyone because we want to keep it accessible to all visitors.'
            },
            {
                question: 'I want to exhibit my car. How is that possible?',
                answer: 'You can fill out the form below, send us an email at gto.luxembourg@hotmail.com, or contact us on social media.'
            },
            {
                question: 'As a visitor, do I need to register?',
                answer: 'No. Visitors do not need to register.'
            },
            {
                question: 'Which cars are eligible?',
                answer: 'Supercars, hypercars and a selected limited range of sportscars. If you have questions, feel free to reach out to us.'
            }
        ],
        mapQuery: '33, rue de la Gare, L-7535 Mersch',
        directionsUrl:
            'https://www.google.com/maps/dir/?api=1&destination=33%2C%20rue%20de%20la%20Gare%2C%20L-7535%20Mersch'
    },
    {
        slug: 'gto-goes-luxembourg',
        title: 'GTO goes Luxembourg',
        date: null,
        time: null,
        startsAt: null,
        startsAtLabel: null,
        meta: 'Date to be announced · Luxembourg',
        location: 'Luxembourg',
        imageSrcRow: '/images/other/gto_tours.webp',
        imageSrc: '/images/other/gto_tours.webp',
        imageAlt: 'GTO goes Luxembourg tour',
        modalCarName: 'GTO goes Luxembourg',
        shortDescription:
            'GTO goes Luxembourg is a smaller and more exclusive tour organised by GTO Luxembourg through the country. The event takes place in a more private and relaxed setting, giving participants the opportunity to enjoy the drive, discover Luxembourg roads and connect with each other.',
        explanation:
            'GTO goes Luxembourg is a smaller and more exclusive tour organised by GTO Luxembourg through the country. The event takes place in a more private and relaxed setting, giving participants the opportunity to enjoy the drive, discover Luxembourg roads and connect with other car enthusiasts.',
        duration: null,
        faqs: [
            {
                question: 'Who can participate?',
                answer: 'Places are very limited, so we cannot offer open registration for everyone. If you are interested in joining, you can send us a request, but participation is not guaranteed.'
            }
        ],
        mapQuery: 'Luxembourg',
        directionsUrl:
            'https://www.google.com/maps/dir/?api=1&destination=33%2C%20rue%20de%20la%20Gare%2C%20L-7535%20Mersch'
    }
]

export const findEventBySlug = (slug) => events.find((event) => event.slug === slug)
