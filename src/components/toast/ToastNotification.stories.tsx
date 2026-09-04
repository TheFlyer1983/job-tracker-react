import type { Meta, StoryObj } from '@storybook/react-vite';
import ToastNotification from './ToastNotification';
import type { AppNotification } from '../../provider/NotificationProvider';

const meta = {
  title: 'Components/Elements/ToastNotification',
  render: ({ type, title, message }: AppNotification) => (
    <div className="w-80">
      <ToastNotification
        notification={{ id: '1', type, title, message }}
        removeNotification={(id: string) => console.log(`Removing notification with id: ${id}`)}
      />
    </div>
  ),
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'success', 'info', 'warning']
    },
    title: { control: 'text' },
    message: { control: 'text' }
  }
} satisfies Meta<AppNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    type: 'success',
    message: 'This is a success message'
  }
};
