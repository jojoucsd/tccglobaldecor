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
  confNo?: string; // confirmation / booking number
  cancelBy?: string; // e.g. "Free cancel until Nov 8, 6 PM"
  cancelByZh?: string;
  guest?: string; // who the room is for
  guestZh?: string;
  roomType?: string; // e.g. "2 Premium Double, Empire State View, High Floor"
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
      // ── Leg 1: Los Angeles ──────────────────────────────────────────
      {
        city: 'Los Angeles',
        cityZh: '洛杉矶',
        startDate: '2026-10-23',
        endDate: '2026-10-26',
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
            guest: 'Ling, Matthew, Marco',
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

      // ── Leg 2: Las Vegas ────────────────────────────────────────────
      {
        city: 'Las Vegas',
        cityZh: '拉斯维加斯',
        startDate: '2026-10-26',
        endDate: '2026-11-04',
        purpose: 'Client visits',
        purposeZh: '客户拜访',
        hotels: [
          {
            name: 'Airbnb – Home in Las Vegas (hosted by Tina)',
            nameZh: 'Airbnb – 拉斯维加斯民宿（房东 Tina）',
            location: '8828 West Stingray Court, Las Vegas, NV 89147',
            locationZh: '8828 West Stingray Court, 拉斯维加斯, NV 89147',
            checkIn: '2026-10-26',
            checkOut: '2026-11-04',
            rooms: 6,
            status: 'confirmed',
            roomType: 'Entire home · 6 beds · 8 guests · 4 baths',
            guest: 'Ling, Matthew, Marco, Mike, Tom',
            notes: 'Check-in after 3:00 PM. Whole house for the team.',
            notesZh: '下午3点后入住。全屋供团队使用。',
          },
        ],
        flights: [],
        notes: 'Driving from LA.',
        notesZh: '从洛杉矶自驾前往。',
      },

      // ── Leg 3: New York ─────────────────────────────────────────────
      {
        city: 'New York',
        cityZh: '纽约',
        startDate: '2026-11-04',
        endDate: '2026-11-12',
        purpose: 'BDNY Trade Show (Nov 8–9) at Javits Center',
        purposeZh: 'BDNY 展会 (11月8-9日) Javits中心',
        hotels: [
          // ── Kimpton Era Midtown (boss + clients) ──
          {
            name: 'Kimpton Hotel Era Midtown',
            nameZh: 'Kimpton Hotel Era 中城',
            location: '32 West 48th Street, New York, NY 10036 (Rockefeller Center)',
            locationZh: '纽约西48街32号 (洛克菲勒中心)',
            checkIn: '2026-11-04',
            checkOut: '2026-11-10',
            rooms: 1,
            cost: 'US$3,464.95',
            status: 'confirmed',
            confNo: '27576651',
            cancelBy: '1-night non-refundable deposit',
            cancelByZh: '1晚不可退押金',
            guest: 'Mrs. Chen + Ouyang',
            guestZh: '陈太太 + 欧阳',
            roomType: '2 Premium Double, Empire State View, High Floor',
            notes: 'Shared room. IHG member rate, Stay Longer & Save.',
            notesZh: '共住房间。IHG会员价，住越久越省。',
          },
          {
            name: 'Kimpton Hotel Era Midtown',
            nameZh: 'Kimpton Hotel Era 中城',
            location: '32 West 48th Street, New York, NY 10036',
            locationZh: '纽约西48街32号',
            checkIn: '2026-11-04',
            checkOut: '2026-11-10',
            rooms: 1,
            cost: 'US$2,810.87',
            status: 'confirmed',
            confNo: '46525846',
            cancelBy: '1-night non-refundable deposit',
            cancelByZh: '1晚不可退押金',
            guest: 'Marco',
            guestZh: 'Marco 马可',
            roomType: '1 Essential King, High Floor',
            notes: 'High floor, quiet room requested.',
            notesZh: '已要求高楼层安静房间。',
          },
          {
            name: 'Kimpton Hotel Era Midtown',
            nameZh: 'Kimpton Hotel Era 中城',
            location: '32 West 48th Street, New York, NY 10036',
            locationZh: '纽约西48街32号',
            checkIn: '2026-11-05',
            checkOut: '2026-11-10',
            rooms: 1,
            cost: 'US$2,398.17',
            status: 'confirmed',
            confNo: '65699849',
            cancelBy: '1-night non-refundable deposit',
            cancelByZh: '1晚不可退押金',
            guest: 'Ray',
            guestZh: 'Ray',
            roomType: '1 Essential King, Empire State View',
            notes: 'Stay Longer & Save rate.',
            notesZh: '住越久越省价格。',
          },
          {
            name: 'Kimpton Hotel Era Midtown',
            nameZh: 'Kimpton Hotel Era 中城',
            location: '32 West 48th Street, New York, NY 10036',
            locationZh: '纽约西48街32号',
            checkIn: '2026-11-10',
            checkOut: '2026-11-12',
            rooms: 1,
            cost: 'US$1,325.77',
            status: 'confirmed',
            confNo: '48877999',
            cancelBy: 'Free cancel until Nov 8, 6 PM',
            cancelByZh: '11月8日下午6点前可免费取消',
            guest: 'Ray (extension)',
            guestZh: 'Ray（延住）',
            roomType: '1 Essential King, Empire State View',
            notes: 'Best Flexible rate. Ray may leave Nov 10 or stay until Nov 12.',
            notesZh: '弹性价格。Ray可能11月10日离开或住到11月12日。',
          },

          // ── LIC Manhattan View Hotel (staff) ──
          {
            name: 'LIC Manhattan View Hotel',
            nameZh: 'LIC Manhattan View 酒店',
            location: '39-05 29th St, Long Island City, Queens, NY 11101',
            locationZh: '皇后区长岛市29街39-05号',
            checkIn: '2026-11-04',
            checkOut: '2026-11-05',
            rooms: 4,
            cost: 'US$863.08',
            status: 'confirmed',
            cancelBy: 'Free cancel before Nov 1; pay by Oct 30',
            cancelByZh: '11月1日前可免费取消；10月30日前付款',
            roomType: '3 Deluxe King Studio + 1 Family Suite',
            guest: 'Ling, Matthew, Tom, Mike',
            notes: 'Extra early night for staff arriving Nov 4. Booked on Booking.com.',
            notesZh: '11月4日提前到达的员工额外住一晚。Booking.com预订。',
          },
          {
            name: 'LIC Manhattan View Hotel',
            nameZh: 'LIC Manhattan View 酒店',
            location: '39-05 29th St, Long Island City, Queens, NY 11101',
            locationZh: '皇后区长岛市29街39-05号',
            checkIn: '2026-11-05',
            checkOut: '2026-11-10',
            rooms: 4,
            cost: 'US$4,587.10',
            status: 'confirmed',
            cancelBy: 'Free cancellation (check deadline)',
            cancelByZh: '可免费取消（请确认截止日期）',
            guest: 'Ling, Matthew, Tom, Mike',
            notes: 'Main staff block. Booked on Booking.com.',
            notesZh: '主要员工房间。Booking.com预订。',
          },
          {
            name: 'LIC Manhattan View Hotel',
            nameZh: 'LIC Manhattan View 酒店',
            location: '39-05 29th St, Long Island City, Queens, NY 11101',
            locationZh: '皇后区长岛市29街39-05号',
            checkIn: '2026-11-06',
            checkOut: '2026-11-10',
            rooms: 1,
            cost: 'US$1,047.80',
            status: 'confirmed',
            cancelBy: 'Free cancel before Nov 3; pay by Nov 1',
            cancelByZh: '11月3日前可免费取消；11月1日前付款',
            guest: 'Tommy (ATL)',
            guestZh: 'Tommy (ATL)',
            roomType: '1 Deluxe King Studio',
            notes: 'Lands Nov 6, 9:50 PM — late arrival ~11 PM–midnight. Booked on Booking.com.',
            notesZh: '11月6日晚9:50降落 — 预计深夜11点至午夜到达。Booking.com预订。',
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
        notes:
          'Kimpton Era: by Rockefeller Center, Midtown. LIC Manhattan View: near Queensboro Plaza (7/N/W trains), Queens. Javits Center: 7 train to 34 St–Hudson Yards. All rooms booked under Ling Lu.',
        notesZh:
          'Kimpton Era：洛克菲勒中心旁，中城。LIC Manhattan View：Queensboro Plaza站附近（7/N/W线），皇后区。Javits中心：搭7号线到34街-Hudson Yards站。所有房间均以Ling Lu名义预订。',
      },
    ],
  },
];
