/** All showcase images per service category (folder name matches repo spelling). */
import eoMusicFestival from './event-organizer/music-festival.png';
import eoExhibition from './event-organizer/exhibition.jpg';
import eoOpeningCeremony from './event-organizer/opening-ceremony.jpg';
import eoConvention from './event-organizer/confention.jpeg';
import eoIncentive from './event-organizer/incentive.jpg';
import eoMeeting from './event-organizer/meeting.jpg';

import prodBackdrop from './event-production/backdrop.jpg';
import prodBackdropPanggung from './event-production/backdrop-panggung.jpeg';
import prodCustomBooth from './event-production/custom-booth.jpg';
import prodCustomGate from './event-production/custom-gate.jpg';
import prodLedCover from './event-production/led-cover.png';
import prodPhotobooth from './event-production/photobooth.jpg';

import rentBarStool from './event-equipment-rental/bar-stool.jpg';
import rentBoothR8 from './event-equipment-rental/booth-r8.jpeg';
import rentDoubleDeck from './event-equipment-rental/double-deck.jpg';
import rentFlipChart from './event-equipment-rental/flip-chart.jpg';
import rentLedScreen from './event-equipment-rental/led-screen.jpg';
import rentLighting from './event-equipment-rental/lighting.jpg';
import rentSarnafil from './event-equipment-rental/sarnafil.jpg';
import rentSofaPuff from './event-equipment-rental/sofa-puff.jpeg';
import rentSoundSystem from './event-equipment-rental/sound-system.jpg';

export type ServiceGalleryItem = { src: string; alt: string };

export const eventOrganizerGallery: ServiceGalleryItem[] = [
	{ src: eoMusicFestival, alt: 'Event organizer — festival musik' },
	{ src: eoExhibition, alt: 'Event organizer — exhibition' },
	{ src: eoOpeningCeremony, alt: 'Event organizer — opening ceremony' },
	{ src: eoConvention, alt: 'Event organizer — convention' },
	{ src: eoIncentive, alt: 'Event organizer — incentive trip' },
	{ src: eoMeeting, alt: 'Event organizer — meeting corporate' }
];

export const eventProductionGallery: ServiceGalleryItem[] = [
	{ src: prodBackdrop, alt: 'Event production — backdrop' },
	{ src: prodBackdropPanggung, alt: 'Event production — backdrop panggung' },
	{ src: prodCustomBooth, alt: 'Event production — booth custom' },
	{ src: prodCustomGate, alt: 'Event production — gate custom' },
	{ src: prodLedCover, alt: 'Event production — LED cover' },
	{ src: prodPhotobooth, alt: 'Event production — photobooth' }
];

export const eventEquipmentRentalGallery: ServiceGalleryItem[] = [
	{ src: rentBarStool, alt: 'Sewa peralatan — bar stool' },
	{ src: rentBoothR8, alt: 'Sewa peralatan — booth' },
	{ src: rentDoubleDeck, alt: 'Sewa peralatan — double deck' },
	{ src: rentFlipChart, alt: 'Sewa peralatan — flip chart' },
	{ src: rentLedScreen, alt: 'Sewa peralatan — LED screen' },
	{ src: rentLighting, alt: 'Sewa peralatan — lighting' },
	{ src: rentSarnafil, alt: 'Sewa peralatan — tenda sarnafil' },
	{ src: rentSofaPuff, alt: 'Sewa peralatan — sofa puff' },
	{ src: rentSoundSystem, alt: 'Sewa peralatan — sound system' }
];
