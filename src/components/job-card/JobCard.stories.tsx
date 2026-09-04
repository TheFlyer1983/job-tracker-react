import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { initialJobs } from '../../constants/jobs';
import { MemoryRouter } from 'react-router';
import { JobProvider } from '../../provider/JobProvider';
import { NotificationProvider } from '../../provider/NotificationProvider';

import JobCard from './JobCard';

const meta = {
  title: 'Components/Elements/JobCard',
  component: JobCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    editJob: () => {}
  },
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
    job: initialJobs[0],
    editJob: () => console.log('clicked')
  }
};
