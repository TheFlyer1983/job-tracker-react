import type { Meta, StoryObj } from '@storybook/react-vite';
import { jobStatuses } from '../../../constants/jobs';

import SelectDropdown from './SelectDropdown';

const meta = {
  title: 'Components/Inputs/Select Dropdown',
  component: SelectDropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'select', options: [...jobStatuses] }
  },
  args: {
    value: '',
    setValue: () => {}
  }
} satisfies Meta<typeof SelectDropdown>;

export default meta;
type Story = StoryObj<typeof SelectDropdown>;

export const Default: Story = {
  args: {
    options: [...jobStatuses],
    setValue: (status: string) => console.log('Value Set', status)
  }
};
