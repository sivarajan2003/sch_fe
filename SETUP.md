# PreSkool ERP - Setup Guide

## Required Images

Your School ERP system uses the following images from Pexels (already integrated):

### Login Page
- **Login Illustration**: `https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg`
  - Modern illustration of person with mobile phone
  - Used on the left side of the login screen

### Dashboard - Teacher/Student Avatars
- **Teacher 1**: `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg`
  - Sarah Johnson - Mathematics teacher

- **Teacher 2**: `https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg`
  - Michael Chen - English teacher

- **Teacher 3**: `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg`
  - Emily Davis - Science teacher

### Icons
All icons are from **lucide-react** package (already installed):
- Dashboard navigation icons
- Stat card icons
- Action buttons
- Calendar and time icons

## Environment Setup

1. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_actual_supabase_url
   VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   ```

2. Your database schema is already created with the following tables:
   - profiles (user information)
   - students
   - teachers
   - classes
   - events
   - fees

## Authentication

The system uses Supabase authentication with email/password.

### Test Account
To test the application, you need to create a user account in Supabase:

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Create a test account with:
   - Email: admin@preskool.com (or any email)
   - Password: (your chosen password)

## Running the Application

The application will automatically start in development mode. Once it's running:

1. You'll see the **Login Page** first
2. Enter your test credentials
3. After successful login, you'll be redirected to the **Admin Dashboard**

## Features Implemented

### Login Page
- Email/password authentication
- Social login buttons (UI only - Facebook, Google, Apple)
- Remember me checkbox
- Forgot password link
- Responsive design with illustration

### Dashboard
- **Sidebar Navigation**: Full menu with Students, Teachers, Parents, Classes, etc.
- **Header**: Search bar, notifications, messages, profile menu
- **Stat Cards**: Total students, teachers, parents, and earnings
- **Fee Collection Chart**: Visual bar chart of monthly collections
- **Calendar**: Interactive monthly calendar
- **Quick Stats**: Donut chart showing attendance statistics
- **Class Schedule**: Today's classes with teacher information
- **Upcoming Events**: List of scheduled school events
- **Performance Metrics**: Subject-wise performance bars

## File Structure

```
src/
├── components/
│   ├── Calendar.tsx
│   ├── ClassSchedule.tsx
│   ├── FeeCollectionChart.tsx
│   ├── Header.tsx
│   ├── ProtectedRoute.tsx
│   ├── QuickStats.tsx
│   ├── Sidebar.tsx
│   ├── StatCard.tsx
│   └── UpcomingEvents.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   └── supabase.ts
├── pages/
│   ├── Dashboard.tsx
│   └── Login.tsx
├── App.tsx
└── main.tsx
```

## Color Scheme

The application uses a professional color palette:
- **Primary**: Blue (#4F46E5, #3B82F6)
- **Secondary**: Cyan, Orange, Green for different metrics
- **Neutral**: Gray shades for text and backgrounds
- **Accent**: Various colors for charts and stats

## Next Steps

1. Add more pages (Students, Teachers, Parents management)
2. Implement CRUD operations for all entities
3. Add real-time notifications
4. Create attendance tracking system
5. Build fee payment processing
6. Add reports and analytics
7. Implement role-based access control
