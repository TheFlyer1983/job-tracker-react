export const jobStatuses = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'] as const;

export type JobStatus = (typeof jobStatuses)[number]

export type Job = {
  id: number
  company: string
  title: string
  location: string
  salary: string
  status: JobStatus | ''
  url: string
  notes: string
}

export const initialJobs: Job[] = [
  {
    id: 1,
    company: 'Autotrader',
    title: 'Senior Frontend Developer',
    location: 'Manchester',
    salary: '£65,000 - £75,000',
    status: 'Interview',
    url: 'https://www.autotrader.co.uk/',
    notes: 'Vue.js / TypeScript. Second-stage interview scheduled.'
  },
  {
    id: 2,
    company: 'AO',
    title: 'Frontend Engineer',
    location: 'Bolton',
    salary: '£55,000 - £65,000',
    status: 'Applied',
    url: 'https://ao.com/',
    notes: 'Frontend platform team. Strong focus on TypeScript.'
  },
  {
    id: 3,
    company: 'N Brown Group',
    title: 'Senior Software Engineer',
    location: 'Manchester',
    salary: '£60,000 - £70,000',
    status: 'Saved',
    url: 'https://www.nbrown.co.uk/',
    notes: 'Interesting role with potential for frontend ownership.'
  },
  {
    id: 4,
    company: 'Co-op',
    title: 'Frontend Engineer',
    location: 'Manchester',
    salary: '£50,000 - £60,000',
    status: 'Rejected',
    url: 'https://www.coop.co.uk/',
    notes: 'Application rejected after initial screening.'
  },
  {
    id: 5,
    company: 'Dayshape',
    title: 'Senior Full Stack Engineer',
    location: 'Remote',
    salary: '£60,000 - £80,000',
    status: 'Applied',
    url: 'https://dayshape.com/',
    notes: 'Interesting product and strong TypeScript focus.'
  },
  {
    id: 6,
    company: 'TradingView',
    title: 'Frontend Developer',
    location: 'Remote - UK',
    salary: '£70,000 - £90,000',
    status: 'Saved',
    url: 'https://www.tradingview.com/',
    notes: 'Large-scale frontend application. Worth researching further.'
  },
  {
    id: 7,
    company: 'n8n',
    title: 'Frontend Engineer',
    location: 'Remote',
    salary: '£65,000 - £85,000',
    status: 'Interview',
    url: 'https://n8n.io/',
    notes: 'Great fit with TypeScript and frontend experience.'
  },
  {
    id: 8,
    company: 'CTI Digital',
    title: 'Senior Vue.js Developer',
    location: 'Manchester',
    salary: '£50,000 - £60,000',
    status: 'Offer',
    url: 'https://www.ctidigital.com/',
    notes: 'Offer received. Need to compare package and role scope.'
  },
  {
    id: 9,
    company: 'Dept',
    title: 'Frontend Developer',
    location: 'Manchester',
    salary: '£45,000 - £55,000',
    status: 'Rejected',
    url: 'https://www.deptagency.com/',
    notes: 'Not progressed after technical review.'
  },
  {
    id: 10,
    company: 'Mindrift',
    title: 'Full Stack JavaScript Engineer',
    location: 'Remote',
    salary: '£50 - £70 per hour',
    status: 'Applied',
    url: 'https://mindrift.ai/',
    notes: 'Freelance role involving AI and JavaScript/TypeScript.'
  },
  {
    id: 11,
    company: 'Spliit',
    title: 'Frontend Engineer',
    location: 'Manchester',
    salary: '£55,000 - £65,000',
    status: 'Saved',
    url: 'https://spliit.co.uk/',
    notes: 'Smaller company. Potential opportunity to have significant ownership.'
  },
  {
    id: 12,
    company: 'Actuate',
    title: 'Senior Frontend Developer',
    location: 'Manchester',
    salary: '£50,000 - £60,000',
    status: 'Applied',
    url: 'https://actuate.agency/',
    notes: 'Agency environment with varied client projects.'
  }
]