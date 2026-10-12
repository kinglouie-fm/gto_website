import eventImages from './event-images.json' with { type: 'json' }
import { attachEventImages } from '../utils/event-images.js'

// Add one object per edition. See docs/adding-events.md for examples.
// Repeated event types share their description; shortDescription can override it.
const eventTypes = {
    supercarSunday: {
        title: 'Supercar Sunday',
        shortDescription: 'Owners and enthusiasts coming together around exceptional cars.'
    },
    luxembourgTour: {
        title: 'GTO goes Luxembourg',
        shortDescription: 'A private tour through Luxembourg, sharing the roads and our passion for cars.',
        location: 'Luxembourg'
    }
}

export const events = [
    {
        slug: 'supercar-sunday-2027',
        type: 'supercarSunday',
        edition: '#9',
        year: 2027,
        imageFolder: "supercar-sunday-2027"
    },
    {
        slug: 'gto-goes-luxembourg',
        type: 'luxembourgTour',
        year: 2026,
        status: 'past',
        orderInYear: 1,
        imageFolder: "gto-goes-luxembourg-2026",
        coverPhoto: "DSC08125.jpg",
        photoOrder: ["DSC08125.jpg"],
        photoCaptions: {
            "DSC08125.jpg": "Cars driving in convoy on a tree-lined road",
            "DSC08028.jpg": "A black car on a country road",
            "DSC07829.jpg": "A red Ferrari on a forest road",
            "DSC07831.jpg": "Cars driving past the forest",
            "DSC07837.jpg": "A red Ferrari on the tour route",
            "DSC07929.jpg": "People meeting at a stop on the tour",
            "DSC08226.jpg": "An orange Lamborghini followed by other cars"
        }
    },
    {
        slug: 'supercar-sunday',
        type: 'supercarSunday',
        edition: '#8',
        year: 2026,
        startsAt: '2026-06-21T14:00:00+02:00',
        endsAt: '2026-06-21T17:00:00+02:00',
        location: '33, rue de la Gare, L-7535 Mersch',
        locationLabel: 'Mersch',
        sourceUrl: 'https://www.facebook.com/events/1585184282735112/',
        imageFolder: "supercar-sunday-2026",
        coverPhoto: "DSC07498.jpg",
        photoOrder: ["DSC07498.jpg"],
        photoCaptions: {
            "DSC07498.jpg": "A blue supercar with its doors open at Supercar Sunday",
            "DSC07483.jpg": "A white Porsche photographed at Supercar Sunday",
            "DSC07491.jpg": "Visitors alongside a blue supercar",
            "DSC07509.jpg": "Visitors gathering beside the event tents",
            "DSC07538.jpg": "A row of cars at Supercar Sunday",
            "DSC07546.jpg": "Visitors and cars filling the Supercar Sunday gathering"
        }
    },
    {
        slug: 'gto-goes-luxembourg-2025',
        type: 'luxembourgTour',
        year: 2025,
        status: 'past',
        orderInYear: 1,
        imageFolder: "gto-goes-luxembourg-2025",
        coverPhoto: "IMG_5814.jpeg",
        photoOrder: ["IMG_5814.jpeg"],
        photoCaptions: {
            "IMG_5814.jpeg": "Tour participants between two rows of cars",
            "IMG_5789.jpeg": "Cars displayed indoors at a tour stop",
            "IMG_5795.jpeg": "Cars parked outside at a tour stop",
            "IMG_5796.jpeg": "A red Ferrari parked with other cars",
            "IMG_5798.jpeg": "A row of cars at a tour stop",
            "IMG_5808.jpeg": "Cars gathered in the sunshine",
            "IMG_5811.jpeg": "Cars lined up at a stop"
        }
    },
    {
        slug: 'supercar-sunday-2025',
        type: 'supercarSunday',
        edition: '#7',
        year: 2025,
        startsAt: '2025-06-29',
        location: '33, rue de la Gare, L-7535 Mersch',
        locationLabel: 'Mersch',
        sourceUrl: 'https://www.facebook.com/events/1571756113508331/',
        imageFolder: "supercar-sunday-2025",
        coverPhoto: "DSCF3914.jpg",
        photoOrder: ["DSCF3914.jpg"],
        photoCaptions: {
            "DSCF3914.jpg": "Visitors lining the car display",
            "DSCF3881.jpg": "A white Ford GT at Supercar Sunday",
            "DSCF3886.jpg": "A line of sports cars at Supercar Sunday",
            "DSCF3909.jpg": "A yellow Ferrari arriving at the gathering",
            "DSCF4008.jpg": "Visitors beside a white Ford GT",
            "DSCF4021.jpg": "A yellow Ferrari in the event lineup",
            "DSCF4141.jpg": "A blue supercar with its doors open"
        }
    },
    {
        slug: 'gto-goes-luxembourg-2024',
        type: 'luxembourgTour',
        year: 2024,
        status: 'past',
        orderInYear: 1,
        imageFolder: "gto-goes-luxembourg-2024",
        coverPhoto: "image.edited.gtogl-13.JPG",
        photoOrder: ["image.edited.gtogl-13.JPG"],
        photoCaptions: {
            "image.edited.gtogl-13.JPG": "Cars parked together during the tour",
            "image.edited.gtogl-2.JPG": "A red Ferrari at a tour stop",
            "image.edited.gtogl-4.JPG": "A grey sports car on a tree-lined road",
            "image.edited.gtogl-8.JPG": "Sports cars parked together at a stop",
            "image.edited.gtogl-26.JPG": "A red Ferrari driving along the tour route"
        }
    },
    {
        slug: 'supercar-sunday-2024',
        type: 'supercarSunday',
        edition: '#6',
        year: 2024,
        startsAt: '2024-06-16',
        location: '33, rue de la Gare, L-7535 Mersch',
        locationLabel: 'Mersch',
        sourceUrl: 'https://www.facebook.com/events/951451519897936/',
        imageFolder: "supercar-sunday-2024",
        coverPhoto: "image.edited.SCS6-4.5.JPG",
        photoOrder: ["image.edited.SCS6-4.5.JPG"],
        photoCaptions: {
            "image.edited.SCS6-4.5.JPG": "A grey Lamborghini and white Porsche in the event lineup",
            "image.edited.SCS6-5.JPG": "Cars arriving while visitors watch",
            "image.edited.SCS6-19.JPG": "Visitors beside a supercar with its door open",
            "image.edited.SCS6-31.JPG": "A row of sports cars with visitors",
            "image.edited.SCS6-45.JPG": "A yellow Lamborghini at Supercar Sunday",
            "image.edited.SCS6-52.JPG": "A dog beside one of the cars"
        }
    },
    {
        slug: 'supercar-sunday-2022',
        type: 'supercarSunday',
        edition: '#5 - For Ben',
        year: 2022,
        startsAt: '2022-07-17',
        location: '33, rue de la Gare, L-7535 Mersch',
        locationLabel: 'Mersch',
        sourceUrl: 'https://www.facebook.com/events/1203334913534022/',
        imageFolder: "supercar-sunday-2022",
        coverPhoto: "image.gto (21).JPG",
        photoOrder: ["image.gto (21).JPG"],
        photoCaptions: {
            "image.gto (21).JPG": "A grey McLaren in the event lineup",
            "image.gto (14).JPG": "A visitor with a supercar in the background",
            "image.gto (23).JPG": "A black McLaren photographed from behind",
            "image.gto (24).JPG": "Cars passing the visitors at Supercar Sunday",
            "image.gto (30).JPG": "A black supercar beside a visitor",
            "image.gto (38).JPG": "Visitors surrounding a black Ferrari",
            "image.gto (59).JPG": "A green Porsche in the event lineup"
        }
    },
    {
        slug: 'supercar-sunday-2019-july',
        type: 'supercarSunday',
        edition: '#4',
        year: 2019,
        startsAt: '2019-07-21',
        location: 'Nommern',
        sourceUrl: 'https://www.facebook.com/events/2200820543333930/',
        imageFolder: "supercar-sunday-2019-july"
    },
    {
        slug: 'supercar-sunday-2019-april',
        type: 'supercarSunday',
        edition: '#3',
        year: 2019,
        startsAt: '2019-04-28',
        location: '33, rue de la Gare, L-7535 Mersch',
        locationLabel: 'Mersch',
        sourceUrl: 'https://www.facebook.com/events/2310313759237615/',
        imageFolder: "supercar-sunday-2019-april",
        coverPhoto: "1.JPG",
        photoOrder: ["1.JPG"],
        photoCaptions: {
            "1.JPG": "An orange Lamborghini with a blue McLaren behind it",
            "image.SCS-11.JPG": "Red Ferraris parked together",
            "image.SCS-17.JPG": "A black Audi photographed from behind",
            "image.SCS-22.JPG": "A blue McLaren at the gathering",
            "image.SCS-25.JPG": "A black Mercedes-Benz SUV with visitors",
            "image.SCS-2932.JPG": "A green Lamborghini at the event"
        }
    },
    {
        slug: 'supercar-sunday-2018-july',
        type: 'supercarSunday',
        edition: '#2',
        year: 2018,
        startsAt: '2018-07-15',
        sourceUrl: 'https://www.facebook.com/events/231027574298165/',
        imageFolder: "supercar-sunday-2018-july"
    },
    {
        slug: 'supercar-sunday-2018',
        type: 'supercarSunday',
        edition: '#1',
        year: 2018,
        startsAt: '2018-05-06',
        location: '33, rue de la Gare, L-7535 Mersch',
        locationLabel: 'Mersch',
        sourceUrl: 'https://www.facebook.com/events/151921635479641/',
        imageFolder: "supercar-sunday-2018-may",
        coverPhoto: "image.SupercarSunday-gtc.jpg",
        photoOrder: ["image.SupercarSunday-gtc.jpg"],
        photoCaptions: {
            "image.SupercarSunday-gtc.jpg": "A white Mercedes-AMG GT at the gathering",
            "image.SupercarSunday33.jpg": "A white Audi R8 photographed from behind",
            "image.SupercarSunday3.jpg": "A yellow Ferrari at Supercar Sunday",
            "image.Cars_Coffee-BMWM4CS-2.jpg": "An orange open-top sports car at the gathering",
            "image.SupercarSunday-48+98918.jpg": "Red Porsches among the event lineup",
            "PSFix_20180513_201604_preview.jpeg": "A purple Lamborghini photographed from behind",
            "qwsyxcvgfhjk.jpg": "A white Maserati alongside visitors"
        }
    },
    {
        slug: 'photoshooting-challenge-2017',
        title: 'The photoshooting challenge',
        year: 2017,
        startsAt: '2017-11-05',
        location: '24, rue du Village, L-6140 Junglinster',
        locationLabel: 'Junglinster',
        shortDescription: 'An automotive photoshoot in Junglinster.',
        sourceUrl: 'https://www.facebook.com/events/748383038678545/',
        imageFolder: "photoshooting-challenge-2017"
    }
].map((event) => {
    const defaults = eventTypes[event.type] || {}
    return attachEventImages({
        ...defaults,
        ...event,
        title: event.title || [defaults.title, event.edition].filter(Boolean).join(' ')
    }, eventImages)
})

export const findEventBySlug = (slug) => events.find((event) => event.slug === slug)
