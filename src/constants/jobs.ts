export const jobStatuses = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'] as const;

export type JobStatus = (typeof jobStatuses)[number];

export type Job = {
  id: string;
  company: string;
  title: string;
  location: string;
  salary: string;
  status: JobStatus | '';
  url: string;
  notes: string;
};

export const initialJobs: Job[] = [
  {
    id: '84f50843-ef59-478f-aac3-81144efba5ed',
    company: 'Autotrader',
    title: 'Senior Frontend Developer',
    location: 'Manchester',
    salary: '£65,000 - £75,000',
    status: 'Interview',
    url: 'https://www.autotrader.co.uk/',
    notes: 'Vue.js / TypeScript. Second-stage interview scheduled.'
  },
  {
    id: 'c5b09d05-5521-4d5b-bb96-7821f44e773e',
    company: 'AO',
    title: 'Frontend Engineer',
    location: 'Bolton',
    salary: '£55,000 - £65,000',
    status: 'Applied',
    url: 'https://ao.com/',
    notes: 'Frontend platform team. Strong focus on TypeScript.'
  },
  {
    id: 'd2848f4f-115f-4c23-baea-7d257b7b19b5',
    company: 'N Brown Group',
    title: 'Senior Software Engineer',
    location: 'Manchester',
    salary: '£60,000 - £70,000',
    status: 'Saved',
    url: 'https://www.nbrown.co.uk/',
    notes: 'Interesting role with potential for frontend ownership.'
  },
  {
    id: '0067b9e1-3970-4d91-b855-22c74a0ca253',
    company: 'Co-op',
    title: 'Frontend Engineer',
    location: 'Manchester',
    salary: '£50,000 - £60,000',
    status: 'Rejected',
    url: 'https://www.coop.co.uk/',
    notes: 'Application rejected after initial screening.'
  },
  {
    id: '75d1d8a9-0a38-4cf8-99ce-ab73c75cbfe7',
    company: 'Dayshape',
    title: 'Senior Full Stack Engineer',
    location: 'Remote',
    salary: '£60,000 - £80,000',
    status: 'Applied',
    url: 'https://dayshape.com/',
    notes: 'Interesting product and strong TypeScript focus.'
  },
  {
    id: '8196fa20-3258-4b3b-8cc9-e0eb145ac7d6',
    company: 'TradingView',
    title: 'Frontend Developer',
    location: 'Remote - UK',
    salary: '£70,000 - £90,000',
    status: 'Saved',
    url: 'https://www.tradingview.com/',
    notes: 'Large-scale frontend application. Worth researching further.'
  },
  {
    id: '3fca720c-85c2-4551-a1d6-0df8227ddfe9',
    company: 'n8n',
    title: 'Frontend Engineer',
    location: 'Remote',
    salary: '£65,000 - £85,000',
    status: 'Interview',
    url: 'https://n8n.io/',
    notes: 'Great fit with TypeScript and frontend experience.'
  },
  {
    id: '919b3e24-6c16-41c3-96e8-2afbd72f8ba0',
    company: 'CTI Digital',
    title: 'Senior Vue.js Developer',
    location: 'Manchester',
    salary: '£50,000 - £60,000',
    status: 'Offer',
    url: 'https://www.ctidigital.com/',
    notes: 'Offer received. Need to compare package and role scope.'
  },
  {
    id: 'e88e975b-91f5-4314-b35d-bf4ee79710db',
    company: 'Dept',
    title: 'Frontend Developer',
    location: 'Manchester',
    salary: '£45,000 - £55,000',
    status: 'Rejected',
    url: 'https://www.deptagency.com/',
    notes: 'Not progressed after technical review.'
  },
  {
    id: 'b4631eed-ac37-4433-9337-3e105df28ea7',
    company: 'Mindrift',
    title: 'Full Stack JavaScript Engineer',
    location: 'Remote',
    salary: '£50 - £70 per hour',
    status: 'Applied',
    url: 'https://mindrift.ai/',
    notes: 'Freelance role involving AI and JavaScript/TypeScript.'
  },
  {
    id: 'd39b2819-8fe0-4ac8-8dbd-05f014365972',
    company: 'Spliit',
    title: 'Frontend Engineer',
    location: 'Manchester',
    salary: '£55,000 - £65,000',
    status: 'Saved',
    url: 'https://spliit.co.uk/',
    notes: 'Smaller company. Potential opportunity to have significant ownership.'
  },
  {
    id: '4a547a53-b810-4de1-ac04-a5956068e607',
    company: 'Actuate',
    title: 'Senior Frontend Developer',
    location: 'Manchester',
    salary: '£50,000 - £60,000',
    status: 'Applied',
    url: 'https://actuate.agency/',
    notes: 'Agency environment with varied client projects.'
  }
];
