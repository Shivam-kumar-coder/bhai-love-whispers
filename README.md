
# SMM Panel Frontend

A complete, professional Social Media Marketing (SMM) panel frontend built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

### 🔐 Authentication System
- User login and signup with form validation
- Context-based authentication state management
- Protected routes and automatic redirects

### 📊 Dashboard
- Order summary statistics
- Wallet balance overview
- Recent activities and order tracking
- Responsive stat cards with icons

### 🛒 New Orders
- Service category selection (Instagram, YouTube, TikTok, Twitter, Facebook)
- Dynamic service options based on category
- Quantity input with real-time price calculation
- Target URL validation
- Order summary and confirmation

### 📦 My Orders
- Complete order history with status tracking
- Advanced search and filtering (by status, category, order ID)
- Progress indicators for ongoing orders
- Detailed order view with full information
- Real-time status updates (Pending, Processing, Completed, Cancelled)

### 💰 Wallet System
- Current balance display with gradient design
- Add funds functionality with quick amount buttons
- Transaction history with credit/debit indicators
- Monthly statistics (total spent, total added, transaction count)

### 🎫 Support System
- Create support tickets with priority levels
- Ticket categorization (Order Issues, Billing, Account, Technical, General)
- Real-time conversation interface
- Ticket status tracking (Open, Pending, Resolved, Closed)
- Support statistics dashboard

### 🎨 UI/UX Features
- Fully responsive design for mobile and desktop
- Modern, clean interface with smooth animations
- Consistent color scheme using design tokens
- Interactive hover effects and transitions
- Loading states and user feedback
- Professional gradient designs

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router DOM** for navigation
- **Lucide React** for icons
- **Vite** for build tooling

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── dashboard/       # Dashboard specific components
│   │   └── StatsCard.tsx
│   ├── layout/          # Layout components
│   │   └── Sidebar.tsx
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
│   └── useAuth.tsx      # Authentication hook
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── NewOrders.tsx
│   ├── MyOrders.tsx
│   ├── Wallet.tsx
│   └── Support.tsx
└── App.tsx              # Main application component
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smm-panel-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## Usage

### Authentication
- Use any email/password combination to login (demo mode)
- The auth system uses localStorage for session persistence
- All routes are protected except login/signup

### Navigation
- Use the sidebar to navigate between different sections
- The sidebar is responsive and collapses on mobile devices
- Current route is highlighted in the navigation

### Orders Management
- Create new orders from the "New Orders" page
- Track order progress in "My Orders" 
- Filter and search through order history
- View detailed order information in modal dialogs

### Wallet Operations
- View current balance and transaction history
- Add funds using the modal dialog (demo mode)
- Track spending patterns with monthly statistics

### Support System
- Create tickets with different priority levels
- Engage in conversations with support team
- Track ticket status and resolution progress

## API Integration Ready

The frontend includes placeholder functions and hooks that are ready for backend integration:

- Authentication endpoints (`login`, `signup`, `logout`)
- Order management (`createOrder`, `getOrders`, `updateOrderStatus`)
- Wallet operations (`getBalance`, `addFunds`, `getTransactions`)
- Support system (`createTicket`, `getTickets`, `addTicketMessage`)

## Customization

### Colors and Theming
- Edit `src/index.css` to modify the color scheme
- Update Tailwind configuration in `tailwind.config.ts`
- All components use CSS custom properties for consistent theming

### Adding New Services
- Update the services data in `NewOrders.tsx`
- Add new categories and pricing information
- Extend the order interface if needed

### State Management
- Currently uses React Context for authentication
- Ready to integrate with Redux, Zustand, or other state management solutions
- Local state management with useState for component-level data

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Code splitting with React.lazy (ready for implementation)
- Tree shaking enabled via Vite
- Optimized bundle size with ES modules
- Responsive images and lazy loading ready

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please create an issue in the repository or contact the development team.
