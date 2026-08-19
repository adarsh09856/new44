export const INITIAL_LEADS = [
  {
    id: 'lead-101',
    name: 'Dasho Sangay Khandu',
    email: 'sangay.khandu@drukmail.bt',
    phone: '+975 17 112 233',
    dzongkhag: 'Paro',
    source: 'Website Inquiry',
    propertyType: 'Villa / House',
    budgetNu: 35000000,
    status: 'Negotiation', // 'New', 'Contacted', 'Viewing Scheduled', 'Negotiation', 'Closed Won', 'Lost'
    priority: 'High',
    interestedIn: 'prop-1',
    interestedTitle: 'Heritage Traditional Dzong-Style Villa with Apple Orchard',
    assignedAgentId: 'agent-1',
    assignedAgentName: 'Tashi Wangchuk Dorji',
    lastContactDate: '2026-08-18',
    createdDate: '2026-08-10',
    notes: 'Buyer requires confirmation of the 25.5 decimal apple orchard thram title with Paro Dzongkhag land sector.'
  },
  {
    id: 'lead-102',
    name: 'Dechen Lhamo',
    email: 'dechen.l@bhutanpower.bt',
    phone: '+975 17 445 566',
    dzongkhag: 'Thimphu',
    source: 'Tour Booking',
    propertyType: 'Apartment',
    budgetNu: 19000000,
    status: 'Viewing Scheduled',
    priority: 'High',
    interestedIn: 'prop-2',
    interestedTitle: 'Luxury Penthouse with Buddha Dordenma Mountain View',
    assignedAgentId: 'agent-2',
    assignedAgentName: 'Sonam Pelden',
    lastContactDate: '2026-08-19',
    createdDate: '2026-08-15',
    notes: 'Scheduled for Saturday in-person walkthrough. Applying for housing loan through BoB.'
  },
  {
    id: 'lead-103',
    name: 'Kinley Penjor',
    email: 'kinley.p@transbhutan.bt',
    phone: '+975 77 889 900',
    dzongkhag: 'Thimphu',
    source: 'WhatsApp',
    propertyType: 'Vehicle',
    budgetNu: 8000000,
    status: 'Contacted',
    priority: 'Medium',
    interestedIn: 'veh-1',
    interestedTitle: '2022 Toyota Land Cruiser Prado TX-L 4x4 (Diesel)',
    assignedAgentId: 'agent-3',
    assignedAgentName: 'Karma Tshering',
    lastContactDate: '2026-08-17',
    createdDate: '2026-08-16',
    notes: 'Inquired about RSTA logbook and whether price is negotiable for immediate wire transfer.'
  },
  {
    id: 'lead-104',
    name: 'Ugyen Wangchuk',
    email: 'ugyen.w@dhi.bt',
    phone: '+975 17 654 999',
    dzongkhag: 'Chukha',
    source: 'Referral',
    propertyType: 'Commercial Space',
    budgetNu: 70000000,
    status: 'New',
    priority: 'High',
    interestedIn: 'prop-4',
    interestedTitle: 'Prime Commercial Complex Building (5 Floors)',
    assignedAgentId: 'agent-1',
    assignedAgentName: 'Tashi Wangchuk Dorji',
    lastContactDate: '2026-08-19',
    createdDate: '2026-08-19',
    notes: 'Seeking high-yield commercial asset in Phuntsholing. Rental yield report sent.'
  },
  {
    id: 'lead-105',
    name: 'Pema Rinzin',
    email: 'pema.rinzin@gmail.bt',
    phone: '+975 77 334 112',
    dzongkhag: 'Punakha',
    source: 'Website Inquiry',
    propertyType: 'Land / Plot',
    budgetNu: 22000000,
    status: 'Closed Won',
    priority: 'Medium',
    interestedIn: 'prop-5',
    interestedTitle: 'Scenic Riverside Farmhouse & Organic Land (50 Decimal)',
    assignedAgentId: 'agent-2',
    assignedAgentName: 'Sonam Pelden',
    lastContactDate: '2026-08-14',
    createdDate: '2026-08-05',
    notes: 'Deal finalized. Chazhag Sathram transfer fee paid to Punakha Dzongkhag Land Sector.'
  }
];

export const INITIAL_DEALS = [
  {
    id: 'deal-201',
    title: 'Paro Heritage Villa Acquisition',
    leadName: 'Dasho Sangay Khandu',
    propertyTitle: 'Heritage Traditional Dzong-Style Villa with Apple Orchard',
    dealValueNu: 32500000, // Nu. 3.25 Cr
    stage: 'negotiation', // 'inquiry', 'viewing', 'negotiation', 'legal_thram', 'bank_loan', 'won', 'lost'
    probability: 85,
    assignedAgent: 'Tashi Wangchuk Dorji',
    closingDate: '2026-09-05',
    type: 'Property Sale'
  },
  {
    id: 'deal-202',
    title: 'Motithang Penthouse Luxury Purchase',
    leadName: 'Dechen Lhamo',
    propertyTitle: 'Luxury Penthouse with Buddha Dordenma Mountain View',
    dealValueNu: 18500000, // Nu. 1.85 Cr
    stage: 'viewing',
    probability: 60,
    assignedAgent: 'Sonam Pelden',
    closingDate: '2026-09-15',
    type: 'Property Sale'
  },
  {
    id: 'deal-203',
    title: 'Phuntsholing 5-Floor Commercial Complex',
    leadName: 'Ugyen Wangchuk',
    propertyTitle: 'Prime Commercial Complex Building (5 Floors)',
    dealValueNu: 68000000, // Nu. 6.8 Cr
    stage: 'inquiry',
    probability: 40,
    assignedAgent: 'Tashi Wangchuk Dorji',
    closingDate: '2026-10-01',
    type: 'Commercial Acquisition'
  },
  {
    id: 'deal-204',
    title: 'Toyota Prado TX-L 4x4 Sale',
    leadName: 'Kinley Penjor',
    propertyTitle: '2022 Toyota Land Cruiser Prado TX-L 4x4',
    dealValueNu: 7800000, // Nu. 78 Lakh
    stage: 'negotiation',
    probability: 75,
    assignedAgent: 'Karma Tshering',
    closingDate: '2026-08-30',
    type: 'Vehicle Sale'
  },
  {
    id: 'deal-205',
    title: 'Punakha 50 Decimal River Farmhouse',
    leadName: 'Pema Rinzin',
    propertyTitle: 'Scenic Riverside Farmhouse & Organic Land',
    dealValueNu: 21000000, // Nu. 2.1 Cr
    stage: 'won',
    probability: 100,
    assignedAgent: 'Sonam Pelden',
    closingDate: '2026-08-14',
    type: 'Property Sale'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'call',
    title: 'Phone Consultation with Dasho Sangay Khandu',
    details: 'Discussed water rights and apple orchard produce volume with Paro local revenue officer.',
    time: '2 hours ago',
    agentName: 'Tashi Wangchuk Dorji'
  },
  {
    id: 'act-2',
    type: 'deal',
    title: 'Deal Advanced to Legal Thram Verification',
    details: 'Submitted eSakor Sathram transfer form for Punakha Riverside Property.',
    time: '5 hours ago',
    agentName: 'Sonam Pelden'
  },
  {
    id: 'act-3',
    type: 'tour',
    title: 'Scheduled Test Drive for Toyota Prado',
    details: 'Appointment confirmed with Kinley Penjor for tomorrow 11:00 AM in Thimphu.',
    time: 'Yesterday',
    agentName: 'Karma Tshering'
  },
  {
    id: 'act-4',
    type: 'lead',
    title: 'New Commercial Buyer Lead Generated',
    details: 'Ugyen Wangchuk requested yield sheets for Phuntsholing Commercial Tower.',
    time: 'Yesterday',
    agentName: 'System Web Inquiry'
  }
];
