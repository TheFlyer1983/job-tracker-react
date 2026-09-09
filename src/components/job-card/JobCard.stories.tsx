import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Job } from '../../db/schema';
import { MemoryRouter } from 'react-router';
import { JobProvider } from '../../provider/JobProvider';
import { NotificationProvider } from '../../provider/NotificationProvider';

import JobCard from './JobCard';

const job: Job = {
  id: '1',
  company: 'Company',
  title: 'Title',
  location: 'Location',
  salary: 'Salary',
  status: 'Status',
  url: 'URL',
  notes: 'Notes'
};

const meta = {
  title: 'Components/Elements/JobCard',
  component: JobCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <NotificationProvider>
          <JobProvider>
            <Story />
          </JobProvider>
        </NotificationProvider>
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    job
  }
};
