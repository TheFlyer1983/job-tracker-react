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
    company: 'Sanderson (Agency)',
    title: 'Senior Software Engineer',
    location: 'Remote',
    salary: '£65,000 - £75,000',
    status: 'Applied',
    url: '',
    notes: 'React / TypeScript'
  },
  {
    id: 'c5b09d05-5521-4d5b-bb96-7821f44e773e',
    company: 'Springer Natuure Group',
    title: 'Senior Frontend Engineer',
    location: 'London',
    salary: 'Unknown',
    status: 'Applied',
    url: 'hhttps://www.springernature.com/',
    notes: 'Frontend'
  },
  {
    id: 'd2848f4f-115f-4c23-baea-7d257b7b19b5',
    company: 'Pendo.io',
    title: 'Sr. Software Engineer',
    location: 'Sheffield',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://pendo.io/',
    notes: 'Vue.js / TypeScript'
  },
  {
    id: '0067b9e1-3970-4d91-b855-22c74a0ca253',
    company: 'Doccla',
    title: 'Senior Software Engineer',
    location: 'London (Remote)',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://www.doccla.com/',
    notes: 'React'
  },
  {
    id: '75d1d8a9-0a38-4cf8-99ce-ab73c75cbfe7',
    company: 'Foundation Health',
    title: 'Senior Software Engineer',
    location: 'Manchester',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://www.foundationhealth.com/',
    notes: 'AI Focused.'
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
    company: 'GitLab',
    title: 'Senior Frontend Engineer',
    location: 'Remote',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://www.gitlab.com/',
    notes: 'GitLab is a software development platform that provides a comprehensive suite of tools for software development, project management, and collaboration.'
  },
  {
    id: '4a547a53-b810-4de1-ac04-a5956068e607',
    company: 'First Up',
    title: 'Sr. Software Engineer, Frontend',
    location: 'UK - Remote',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://firstup.io/',
    notes: 'Firstup is an employee communications platform that uses data and AI to deliver personalised communications and improve employee engagement and experience at scale.'
  }
];
