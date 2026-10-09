// Team travel data — internal use only, accessed via /henderson/travel
// Edit this file to update trip info. Each fact lives in one place:
// a hotel's name/address once, with its bookings underneath; flights in one list.
// The page deliberately shows only who/where/when — conf #s, room types, costs,
// cancellation terms and terminals are kept here for reference but not rendered.

export type Flight = {
  person: string;
  personZh: string;
  from: string;
  fromZh: string;
  to: string;
  toZh: string;
  date: string; // departure date, ISO e.g. "2026-10-24"
  airline?: string;
  flightNo?: string;
  depart?: string; // "13:10"
  arrive?: string; // "09:05", add "(+1)" / "(10/24)" when the arrival date differs
  terminal?: string; // "T1 → Terminal B"
  terminalZh?: string;
};

export type HotelBooking = {
  guest: string;
  guestZh?: string;
  checkIn: string; // ISO date
  checkOut: string;
  rooms: number;
  roomType?: string; // e.g. "2 Premium Double, Empire State View, High Floor"
  cost?: string; // kept for reference, not shown on the page
  status: 'confirmed' | 'pending' | 'cancelled';
  confNo?: string;
  cancelBy?: string;
  cancelByZh?: string;
  notes?: string;
  notesZh?: string;
};

export type Hotel = {
  name: string;
  nameZh?: string;
  city: string;
  cityZh: string;
  location: string;
  locationZh?: string;
  bookedVia?: string; // e.g. "Booking.com"
  notes?: string;
  notesZh?: string;
  bookings: HotelBooking[];
};

export type Stop = {
  city: string;
  cityZh: string;
  startDate: string;
  endDate: string;
  next?: 'drive' | 'fly'; // how the team gets to the following stop
};

export type Note = { en: string; zh: string };

export type Trip = {
  id: string;
  name: string;
  nameZh: string;
  season: string;
  seasonZh: string;
  stops: Stop[];
  hotels: Hotel[];
  hotelNotes: Note[];
  flights: Flight[];
  flightNotes: Note[];
};

const KIMPTON_ERA = {
  name: 'Kimpton Hotel Era Midtown',
  nameZh: 'Kimpton Hotel Era 中城',
  city: 'New York',
  cityZh: '纽约',
  location: '32 West 48th Street, New York, NY 10036 · Rockefeller Center, Midtown',
  locationZh: '纽约西48街32号 · 洛克菲勒中心，中城',
};

const LIC_MANHATTAN_VIEW = {
  name: 'LIC Manhattan View Hotel',
  nameZh: 'LIC Manhattan View 酒店',
  city: 'New York',
  cityZh: '纽约',
  location: '39-05 29th St, Long Island City, Queens, NY 11101 · near Queensboro Plaza (7/N/W)',
  locationZh: '皇后区长岛市29街39-05号 · Queensboro Plaza站附近（7/N/W线）',
  bookedVia: 'Booking.com',
};

export const TRIPS: Trip[] = [
  {
    id: 'bdny-2026',
    name: 'BDNY 2026 Trip',
    nameZh: 'BDNY 2026 出差行程',
    season: 'Oct – Nov 2026 · BDNY Nov 8–9, Javits Center',
    seasonZh: '2026年10月 – 11月 · BDNY 展会 11月8-9日，Javits中心',
    stops: [
      { city: 'Los Angeles', cityZh: '洛杉矶', startDate: '2026-10-23', endDate: '2026-10-26', next: 'drive' },
      { city: 'Las Vegas', cityZh: '拉斯维加斯', startDate: '2026-10-26', endDate: '2026-11-04', next: 'fly' },
      { city: 'New York', cityZh: '纽约', startDate: '2026-11-04', endDate: '2026-11-12' },
    ],

    // ── Hotels ────────────────────────────────────────────────────────
    hotels: [
      {
        name: 'Holiday Inn & Suites Monterey Park – Los Angeles by IHG',
        nameZh: 'Holiday Inn & Suites 蒙特利公园 – 洛杉矶 (IHG)',
        city: 'Los Angeles',
        cityZh: '洛杉矶',
        location: 'Monterey Park',
        locationZh: '蒙特利公园',
        bookings: [
          {
            guest: 'Ling, Matthew, Marco',
            checkIn: '2026-10-23',
            checkOut: '2026-10-26',
            rooms: 3,
            cost: 'US$1,238.41',
            status: 'confirmed',
          },
        ],
      },
      {
        name: 'Airbnb – Home in Las Vegas (hosted by Tina)',
        nameZh: 'Airbnb – 拉斯维加斯民宿（房东 Tina）',
        city: 'Las Vegas',
        cityZh: '拉斯维加斯',
        location: '8828 West Stingray Court, Las Vegas, NV 89147',
        locationZh: '8828 West Stingray Court, 拉斯维加斯, NV 89147',
        notes: 'Check-in after 3 PM.',
        notesZh: '下午3点后入住。',
        bookings: [
          {
            guest: 'Ling, Matthew, Marco, Mike, Tom',
            checkIn: '2026-10-26',
            checkOut: '2026-11-04',
            rooms: 6,
            roomType: 'Entire home · 6 beds · 8 guests · 4 baths',
            status: 'confirmed',
          },
        ],
      },
      {
        ...KIMPTON_ERA,
        // 1-night non-refundable deposit on all bookings except Ray's extension
        bookings: [
          {
            guest: 'Mrs. Chen + Ouyang',
            guestZh: '陈太太 + 欧阳',
            checkIn: '2026-11-04',
            checkOut: '2026-11-10',
            rooms: 1,
            roomType: '2 Premium Double, Empire State View, High Floor',
            cost: 'US$3,464.95',
            status: 'confirmed',
            confNo: '27576651',
            notes: 'Shared room. IHG member rate, Stay Longer & Save.',
            notesZh: '共住房间。IHG会员价，住越久越省。',
          },
          {
            guest: 'Marco',
            guestZh: 'Marco 马可',
            checkIn: '2026-11-04',
            checkOut: '2026-11-10',
            rooms: 1,
            roomType: '1 Essential King, High Floor',
            cost: 'US$2,810.87',
            status: 'confirmed',
            confNo: '46525846',
            notes: 'Quiet room requested.',
            notesZh: '已要求安静房间。',
          },
          {
            guest: 'Ray',
            checkIn: '2026-11-05',
            checkOut: '2026-11-10',
            rooms: 1,
            roomType: '1 Essential King, Empire State View',
            cost: 'US$2,398.17',
            status: 'confirmed',
            confNo: '65699849',
            notes: 'Stay Longer & Save rate.',
            notesZh: '住越久越省价格。',
          },
          {
            guest: 'Ray (extension)',
            guestZh: 'Ray（延住）',
            checkIn: '2026-11-10',
            checkOut: '2026-11-12',
            rooms: 1,
            cost: 'US$1,325.77',
            status: 'confirmed',
            confNo: '48877999',
            cancelBy: 'Free cancel until Nov 8, 6 PM',
            cancelByZh: '11月8日下午6点前可免费取消',
            notes: 'Best Flexible rate. Ray may leave Nov 10 or stay until Nov 12.',
            notesZh: '弹性价格。Ray可能11月10日离开或住到11月12日。',
          },
        ],
      },
      {
        ...LIC_MANHATTAN_VIEW,
        bookings: [
          {
            guest: 'Ling, Matthew, Tom, Mike',
            checkIn: '2026-11-04',
            checkOut: '2026-11-05',
            rooms: 4,
            roomType: '3 Deluxe King Studio + 1 Family Suite',
            cost: 'US$863.08',
            status: 'confirmed',
            cancelBy: 'Free cancel before Nov 1; pay by Oct 30',
            cancelByZh: '11月1日前可免费取消；10月30日前付款',
            notes: 'Extra early night for staff arriving Nov 4.',
            notesZh: '11月4日提前到达的员工额外住一晚。',
          },
          {
            guest: 'Ling, Matthew, Tom, Mike',
            checkIn: '2026-11-05',
            checkOut: '2026-11-10',
            rooms: 4,
            cost: 'US$4,587.10',
            status: 'confirmed',
            cancelBy: 'Free cancellation (check deadline)',
            cancelByZh: '可免费取消（请确认截止日期）',
            notes: 'Main staff block.',
            notesZh: '主要员工房间。',
          },
          {
            guest: 'Tommy (ATL)',
            checkIn: '2026-11-06',
            checkOut: '2026-11-10',
            rooms: 1,
            roomType: '1 Deluxe King Studio',
            cost: 'US$1,047.80',
            status: 'confirmed',
            cancelBy: 'Free cancel before Nov 3; pay by Nov 1',
            cancelByZh: '11月3日前可免费取消；11月1日前付款',
            notes: 'Late arrival ~11 PM–midnight (see flights).',
            notesZh: '预计深夜11点至午夜到达（见航班）。',
          },
        ],
      },
    ],
    hotelNotes: [
      { en: 'All rooms are booked under Ling Lu.', zh: '所有房间均以 Ling Lu 名义预订。' },
      {
        en: 'To Javits Center: 7 train to 34 St–Hudson Yards.',
        zh: '前往 Javits 中心：搭7号线到34街-Hudson Yards站。',
      },
    ],

    // ── Flights (page sorts by date + departure time) ─────────────────
    flights: [
      {
        person: 'Marco',
        personZh: 'Marco 马可',
        from: 'London (LHR)',
        fromZh: '伦敦 (LHR)',
        to: 'Los Angeles (LAX)',
        toZh: '洛杉矶 (LAX)',
        date: '2026-10-24',
        airline: 'Virgin Atlantic',
        flightNo: 'VS023',
        depart: '17:55',
        arrive: '21:05',
      },
      {
        person: 'Matthew',
        personZh: 'Matthew',
        from: 'Hong Kong (HKG)',
        fromZh: '香港 (HKG)',
        to: 'Los Angeles (LAX)',
        toZh: '洛杉矶 (LAX)',
        // Crosses the date line: departs HKG Oct 25, lands LAX the evening before
        date: '2026-10-25',
        airline: 'Cathay Pacific',
        flightNo: 'CX880',
        depart: '00:10',
        arrive: '22:05 (10/24)',
      },
      {
        person: 'Tom + Mike',
        personZh: 'Tom + Mike',
        from: 'San Francisco (SFO)',
        fromZh: '旧金山 (SFO)',
        to: 'Las Vegas (LAS)',
        toZh: '拉斯维加斯 (LAS)',
        date: '2026-10-29',
        airline: 'Alaska Airlines',
        flightNo: 'AS776',
        depart: '13:47',
        arrive: '15:31',
        terminal: 'T1 → T3',
        terminalZh: 'T1 → T3',
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
      {
        person: 'Mrs. Chen + Ouyang',
        personZh: '陈太太 + 欧阳',
        from: 'Hong Kong (HKG)',
        fromZh: '香港 (HKG)',
        to: 'New York (JFK)',
        toZh: '纽约 (JFK)',
        date: '2026-11-04',
        airline: 'Cathay Pacific',
        flightNo: 'CX840',
        depart: '16:35',
        arrive: '19:05',
        terminal: 'T1 → T8',
        terminalZh: 'T1 → T8',
      },
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
      {
        person: 'Tommy (ATL)',
        personZh: 'Tommy (ATL)',
        from: 'Atlanta (ATL)',
        fromZh: '亚特兰大 (ATL)',
        to: 'Newark (EWR)',
        toZh: '纽瓦克 (EWR)',
        date: '2026-11-06',
        airline: 'United',
        flightNo: 'UA1493',
        depart: '19:30',
        arrive: '21:47',
      },
      {
        person: 'Mrs. Chen + Ouyang',
        personZh: '陈太太 + 欧阳',
        from: 'New York (JFK)',
        fromZh: '纽约 (JFK)',
        to: 'Hong Kong (HKG)',
        toZh: '香港 (HKG)',
        date: '2026-11-10',
        airline: 'Cathay Pacific',
        flightNo: 'CX831',
        depart: '13:40',
        arrive: '18:55 (+1)',
        terminal: 'T8 → T1',
        terminalZh: 'T8 → T1',
      },
      {
        person: 'Tommy (ATL)',
        personZh: 'Tommy (ATL)',
        from: 'Newark (EWR)',
        fromZh: '纽瓦克 (EWR)',
        to: 'Atlanta (ATL)',
        toZh: '亚特兰大 (ATL)',
        date: '2026-11-10',
        airline: 'United',
        flightNo: 'UA1376',
        depart: '20:07',
        arrive: '22:45',
      },
    ],
    flightNotes: [
      {
        en: 'Ling is in LA from Oct 23 and will handle airport pickups.',
        zh: 'Ling 10月23日已在洛杉矶，负责机场接机。',
      },
    ],
  },
];
