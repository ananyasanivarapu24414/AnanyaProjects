# Flyer Sharing App

A modern web application for sharing and discovering community flyers, built with Next.js and React.

## Overview

This application provides a digital platform for communities to share event flyers, announcements, and local information. Users can browse through a visually appealing masonry grid layout to discover community events and activities.

## Features

- **Community Board**: Browse flyers in an organized masonry grid layout
- **User Authentication**: Secure login and registration system with Firebase
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Interactive UI**: Modern interface with smooth animations and transitions
- **User Onboarding**: Guided setup process for new users
- **Image Carousel**: Dynamic image display for featured content

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Vercel-ready configuration
- **Development**: ESLint, PostCSS

## Project Structure

```
flyer-app/
├── src/app/
│   ├── community-board/        # Main flyer browsing page
│   ├── login-page/            # Authentication pages
│   ├── onboarding/            # User setup flow
│   ├── contexts/              # React Context providers
│   └── utilities/             # Firebase configuration
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## Key Components

- **FlyerMasonryGrid**: Dynamic grid layout for displaying flyers
- **FlyerCard**: Individual flyer display component
- **AuthContext**: User authentication state management
- **ImageCarousel**: Interactive image slideshow
- **BuzzHeader**: Community board header component

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase configuration in `src/app/utilities/firebase/firebase.ts`
4. Run development server: `npm run dev`
5. Open http://localhost:3000

## Firebase Setup

This project requires Firebase configuration for authentication and data storage. Update the Firebase config file with your project credentials.

## Development Features

- Hot reloading for rapid development
- TypeScript for type safety
- ESLint for code quality
- Responsive design with Tailwind CSS
- Docker support for containerized deployment

## Future Enhancements

- Real-time flyer updates
- Advanced search and filtering
- User profiles and flyer management
- Push notifications for new events
- Integration with calendar applications

## Contributing

Feel free to submit issues and pull requests to help improve this project.
