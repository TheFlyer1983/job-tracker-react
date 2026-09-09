import type { NewJob } from '../db/schema';
import { jobStatusEnum } from '../db/schema';

export const jobStatuses = jobStatusEnum.enumValues;

export type JobStatus = (typeof jobStatuses)[number];

export const initialJobs: NewJob[] = [
  {
    company: 'Sanderson (Agency)',
    title: 'Senior Software Engineer',
    location: 'Remote',
    salary: '£65,000 - £75,000',
    status: 'Applied',
    url: '',
    notes: 'React / TypeScript'
  },
  {
    company: 'Springer Natuure Group',
    title: 'Senior Frontend Engineer',
    location: 'London',
    salary: 'Unknown',
    status: 'Applied',
    url: 'hhttps://www.springernature.com/',
    notes: 'Frontend'
  },
  {
    company: 'Pendo.io',
    title: 'Sr. Software Engineer',
    location: 'Sheffield',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://pendo.io/',
    notes: 'Vue.js / TypeScript'
  },
  {
    company: 'Doccla',
    title: 'Senior Software Engineer',
    location: 'London (Remote)',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://www.doccla.com/',
    notes: 'React'
  },
  {
    company: 'Foundation Health',
    title: 'Senior Software Engineer',
    location: 'Manchester',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://www.foundationhealth.com/',
    notes: 'AI Focused.'
  },
  {
    company: 'TradingView',
    title: 'Frontend Developer',
    location: 'Remote - UK',
    salary: '£70,000 - £90,000',
    status: 'Saved',
    url: 'https://www.tradingview.com/',
    notes: 'Large-scale frontend application. Worth researching further.'
  },
  {
    company: 'n8n',
    title: 'Frontend Engineer',
    location: 'Remote',
    salary: '£65,000 - £85,000',
    status: 'Interview',
    url: 'https://n8n.io/',
    notes: 'Great fit with TypeScript and frontend experience.'
  },
  {
    company: 'GitLab',
    title: 'Senior Frontend Engineer',
    location: 'Remote',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://www.gitlab.com/',
    notes: 'GitLab is a software development platform that provides a comprehensive suite of tools for software development, project management, and collaboration.'
  },
  {
    company: 'First Up',
    title: 'Sr. Software Engineer, Frontend',
    location: 'UK - Remote',
    salary: 'Unknown',
    status: 'Applied',
    url: 'https://firstup.io/',
    notes: 'Firstup is an employee communications platform that uses data and AI to deliver personalised communications and improve employee engagement and experience at scale.'
  }
];
