// Team travel data — internal use only, accessed via /henderson/travel
// Edit this file to update trip info. Dates, hotels, flights, notes are all here.

export type Flight = {
  person: string;
  personZh: string;
  from: string;
  fromZh: string;
  to: string;
  toZh: string;
  date: string; // ISO date e.g. "2026-10-24"
  airline?: string;
  flightNo?: string;
  depart?: string; // "13:10"
  arrive?: string; // "09:05"
  terminal?: string; // "T1 → Terminal B"
  terminalZh?: string;
};

export type Hotel = {
  name: string;
  nameZh?: string;
  location: string;
  locationZh?: string;
  checkIn: string; // ISO date
  checkOut: string;
  rooms: number;
  cost?: string; // e.g. "US$1,238.41"
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
  notesZh?: string;
};

export type TripLeg = {
  city: string;
  cityZh: string;
  startDate: string;
  endDate: string;
  purpose?: string;
  purposeZh?: string;
  hotels: Hotel[];
  flights: Flight[];
  notes?: string;
  notesZh?: string;
};

export type Trip = {
  id: string;
  name: string;
  nameZh: string;
  season: string; // e.g. "Oct – Nov 2026"
  seasonZh: string;
  legs: TripLeg[];
};

export const TRIPS: Trip[] = [
  {
    id: 'bdny-2026',
    name: 'BDNY 2026 Trip',
    nameZh: 'BDNY 2026 出差行程',
    season: 'Oct – Nov 2026',
    seasonZh: '2026年10月 – 11月',
    legs: [
      {
        city: 'Los Angeles',
        cityZh: '洛杉矶',
        startDate: '2026-10-23',
        endDate: '2026-11-05',
        purpose: 'West Coast client meetings',
        purposeZh: '西岸客户拜访',
        hotels: [
          {
            name: 'Holiday Inn & Suites Monterey Park – Los Angeles by IHG',
            nameZh: 'Holiday Inn & Suites 蒙特利公园 – 洛杉矶 (IHG)',
            location: 'Monterey Park',
            locationZh: '蒙特利公园',
            checkIn: '2026-10-23',
            checkOut: '2026-10-26',
            rooms: 3,
            cost: 'US$1,238.41',
            status: 'confirmed',
          },
        ],
        flights: [
          {
            person: 'Marco',
            personZh: 'Marco 马可',
            from: 'London (LHR)',
            fromZh: '伦敦 (LHR)',
            to: 'Los Angeles (LAX)',
            toZh: '洛杉矶 (LAX)',
            date: '2026-10-24',
          },
          {
            person: 'Matthew',
            personZh: 'Matthew',
            from: 'Hong Kong (HKG)',
            fromZh: '香港 (HKG)',
            to: 'Los Angeles (LAX)',
            toZh: '洛杉矶 (LAX)',
            date: '2026-10-24',
          },
          {
            person: 'Ray',
            personZh: 'Ray',
            from: 'Shanghai Pudong (PVG)',
            fromZh: '上海浦东 (PVG)',
            to: 'Los Angeles (LAX)',
            toZh: '洛杉矶 (LAX)',
            date: '2026-11-03',
            airline: 'China Eastern',
            flightNo: 'MU583',
            depart: '13:10',
            arrive: '09:05',
            terminal: 'T1 → Terminal B',
            terminalZh: 'T1 → B航站楼',
          },
        ],
        notes: 'Ling will be in LA from Oct 23 and will handle airport pickups.',
        notesZh: 'Ling 10月23日已在洛杉矶，负责机场接机。',
      },
      {
        city: 'Las Vegas',
        cityZh: '拉斯维加斯',
        startDate: '2026-10-26',
        endDate: '2026-10-29',
        purpose: 'Client visits',
        purposeZh: '客户拜访',
        hotels: [],
        flights: [],
        notes: 'Driving from LA. Hotel TBD.',
        notesZh: '从洛杉矶自驾前往。酒店待定。',
      },
      {
        city: 'New York',
        cityZh: '纽约',
        startDate: '2026-11-05',
        endDate: '2026-11-10',
        purpose: 'BDNY Trade Show (Nov 8-9)',
        purposeZh: 'BDNY 展会 (11月8-9日)',
        hotels: [
          {
            name: 'LIC Manhattan View Hotel',
            location: 'Queens',
            locationZh: '皇后区',
            checkIn: '2026-11-05',
            checkOut: '2026-11-10',
            rooms: 4,
            cost: 'US$4,587.10',
            status: 'confirmed',
            notes: 'Free cancellation. Main team stays here.',
            notesZh: '可免费取消。主要团队住这里。',
          },
          {
            name: 'Fairfield Inn & Suites by Marriott New York Manhattan/Times Square South',
            location: 'Times Square, Manhattan',
            locationZh: '时代广场，曼哈顿',
            checkIn: '2026-11-05',
            checkOut: '2026-11-10',
            rooms: 1,
            cost: 'US$1,645.92',
            status: 'confirmed',
            notes: 'Free cancellation. Downtown room.',
            notesZh: '可免费取消。市区房间。',
          },
        ],
        flights: [
          {
            person: 'Ray',
            personZh: 'Ray',
            from: 'Los Angeles (LAX)',
            fromZh: '洛杉矶 (LAX)',
            to: 'New York (JFK)',
            toZh: '纽约 (JFK)',
            date: '2026-11-05',
            airline: 'Delta',
            flightNo: 'DL951',
            depart: '10:40',
            arrive: '19:16',
            terminal: 'T3 → T4',
            terminalZh: 'T3 → T4',
          },
        ],
        notes: 'Hotels booked (not Airbnb) — 5 rooms qualifies for free cancellation policy. Team split: 4 rooms in Queens, 1 downtown.',
        notesZh: '已订酒店（非Airbnb）— 5间房符合免费取消政策。团队分配：皇后区4间，市区1间。',
      },
    ],
  },
];
