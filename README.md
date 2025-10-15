# Chef Frontend - Smart Recipe Discovery Platform

A modern, responsive React application that helps users discover recipes based on their available ingredients using AI-powered photo recognition and semantic search.

## 🚀 Features

-   **📸 Photo-based Ingredient Recognition** - Upload photos to extract ingredients automatically
-   **🔍 Intelligent Recipe Search** - Semantic search powered by AI embeddings
-   **❤️ Favorites Management** - Save and organize favorite recipes
-   **🥗 Dietary Filtering** - Filter by vegetarian, vegan, gluten-free, and more
-   **📱 Mobile-First Design** - Fully responsive across all devices
-   **🔐 User Authentication** - Secure login and profile management
-   **🎨 Beautiful UI** - Clean, intuitive interface with contextual illustrations

## 🛠 Tech Stack

### Core Technologies

-   **Framework**: Next.js
-   **Language**: TypeScript 5.x
-   **UI Library**: React 18
-   **Styling**: Tailwind CSS 3.x
-   **Icons**: Lucide React
-   **Images**: Next.js Image Optimization

### State Management & Data

-   **HTTP Client**: Fetch API with custom wrapper
-   **Authentication**: Context-based auth state
-   **Form Handling**: React Hook Form (if applicable)
-   **Local Storage**: Browser storage for preferences

### Development Tools

-   **Build Tool**: Next.js built-in bundler
-   **TypeScript**: Strict type checking
-   **ESLint**: Code linting
-   **PostCSS**: CSS processing

## 📱 Application Pages

### 🏠 Home Page (`/`)

**Purpose**: Main landing page where users input ingredients and start recipe discovery

**Key Features**:

-   **Welcome Message**: Personalized greeting for authenticated users
-   **Ingredient Input**: Text input with comma-separated ingredient support
-   **Photo Upload**: Camera/gallery access for ingredient recognition
-   **Dietary Preferences**: Toggle buttons for dietary restrictions
-   **Ingredient Management**: Add, remove, and view current ingredients
-   **Search Functionality**: Intelligent recipe search based on ingredients

**Components**:

-   `Header` - App branding and welcome message
-   `IngredientsInput` - Main ingredient input interface
-   `ActionButtons` - Search and clear functionality
-   `FavoriteButton` - Add to favorites (when applicable)

**User Flow**:

1. User adds ingredients via text or photo
2. Selects dietary preferences
3. Reviews ingredient list
4. Clicks "Search Recipes" to find matches

---

### 🔍 Search Results (`/search`)

**Purpose**: Display recipe recommendations based on user's ingredients

**Key Features**:

-   **Recipe Grid**: Visual grid of recipe cards
-   **Match Scoring**: Relevance scores for each recipe
-   **Quick Actions**: View recipe details, add to favorites
-   **Filtering**: Applied dietary restrictions visible
-   **Empty States**: Helpful messages when no results found

**Components**:

-   `SearchResultsHeader` - Search query and filters display
-   `RecipeGrid` - Grid layout of recipe cards
-   `RecipeCard` - Individual recipe preview
-   `Illustration` - Empty state graphics

**User Flow**:

1. Results load from search query
2. User browses recipe options
3. Clicks on recipe for detailed view
4. Can add recipes to favorites

---

### 🍳 Recipe Details (`/recipe/[id]`)

**Purpose**: Detailed view of a specific recipe with full instructions

**Key Features**:

-   **Recipe Hero Image**: Large, appetizing recipe photo
-   **Ingredient List**: Complete ingredients with availability status
-   **Step-by-Step Instructions**: Detailed cooking instructions
-   **Recipe Information**: Prep time, cook time, servings, difficulty
-   **Dietary Tags**: Visual indicators for dietary compatibility
-   **Favorites Integration**: Add/remove from favorites
-   **Nutritional Info**: Calories and nutritional data

**Components**:

-   `RecipeDetailsHeader` - Navigation and title
-   `RecipeHeroImage` - Main recipe image
-   `RecipeTitleSection` - Title and description
-   `FavoriteButton` - Favorites toggle functionality
-   `DietaryInformation` - Diet compatibility badges
-   `IngredientsSection` - Ingredient list with status
-   `CookingInstructions` - Step-by-step guide
-   `RecipeInfo` - Time, servings, and nutritional data
-   `StartCookingButton` - Cooking mode activation

**User Flow**:

1. User arrives from search results
2. Reviews recipe details and ingredients
3. Adds to favorites if interested
4. Follows cooking instructions
5. Can start cooking mode for guided experience

---

### ❤️ Favorites (`/favorites`)

**Purpose**: User's saved recipe collection with management capabilities

**Key Features**:

-   **Favorites Grid**: Visual collection of saved recipes
-   **Recipe Management**: Remove recipes from favorites
-   **Empty State**: Encouraging message to discover recipes
-   **Quick Access**: Direct links to recipe details
-   **Saved Date**: When each recipe was favorited
-   **Recipe Metadata**: Cuisine, diet, and timing information

**Components**:

-   `FavoritesHeader` - Page title and navigation
-   `FavoriteRecipesList` - List of favorited recipes
-   `RecipeCard` - Enhanced recipe cards with remove option
-   `Illustration` - Empty state graphics

**User Flow**:

1. User navigates to favorites page
2. Views saved recipe collection
3. Can remove recipes or view details
4. Empty state encourages recipe discovery

**States**:

-   **Loading**: Animated loading with cooking illustration
-   **Empty**: "No favorites yet" with discovery prompt
-   **Populated**: Grid of favorite recipes
-   **Error**: Error message with retry option

---

### 🔐 Authentication Pages

#### Login (`/login`)

**Purpose**: User authentication and account access

**Key Features**:

-   **Email/Password Login**: Secure authentication
-   **Form Validation**: Real-time input validation
-   **Password Visibility**: Toggle password visibility
-   **Error Handling**: Clear error messages
-   **Registration Link**: Easy switch to sign-up
-   **Forgot Password**: Password recovery option

#### Sign Up (`/signup`)

**Purpose**: New user registration

**Key Features**:

-   **Account Creation**: Name, email, password registration
-   **Password Confirmation**: Ensure password accuracy
-   **Form Validation**: Comprehensive input validation
-   **Login Link**: Easy switch to sign-in
-   **Welcome Messaging**: Encouraging registration copy

**Shared Components**:

-   `LoginPage` - Handles both login and signup modes
-   `Illustration` - Contextual auth illustrations
-   Loading states with branded animations

---

### 👤 Profile (`/profile`)

**Purpose**: User account management and preferences

**Key Features**:

-   **Profile Information**: Name, email, and avatar
-   **Dietary Preferences**: Set default dietary restrictions
-   **Account Settings**: Update profile information
-   **Favorites Count**: Quick stats on saved recipes
-   **Logout Functionality**: Secure session termination

**Components**:

-   `ProfileHeader` - Page navigation
-   `UserProfileSection` - Profile information display
-   `ProfileMenuItems` - Settings and preferences
-   `LogoutButton` - Session termination

---

## 🎨 UI/UX Design System

### Color Palette

-   **Primary**: Cyan (#06B6D4) - Search buttons, links, focus states
-   **Secondary**: Gray scale for text and backgrounds
-   **Success**: Green for positive actions
-   **Warning**: Orange/Yellow for alerts
-   **Error**: Red for error states

### Typography

-   **Headings**: Bold, clear hierarchy
-   **Body Text**: Readable, accessible font sizes
-   **Labels**: Consistent form labeling

### Illustrations

-   **Icons8 Integration**: Contextual cooking-themed illustrations
-   **Empty States**: Friendly, encouraging graphics
-   **Loading States**: Animated cooking-related icons
-   **Error States**: Helpful visual feedback

### Responsive Design

-   **Mobile-First**: Optimized for mobile devices
-   **Tablet Support**: Adapted layouts for medium screens
-   **Desktop Enhancement**: Full-width layouts with sidebars

## 🔧 Key Components

### Core UI Components

-   **`Illustration`** - Reusable illustration component with Icons8 integration
-   **`Dialog`** - Modal dialogs for confirmations and alerts
-   **`AppLayout`** - Main application layout wrapper
-   **`Header`** - Application header with branding and user info

### Feature Components

-   **`FavoriteButton`** - Smart favorites toggle with authentication
-   **`IngredientsInput`** - Complex ingredient input with photo upload
-   **`RecipeCard`** - Reusable recipe display component
-   **`SearchResultsHeader`** - Search context and filtering display

### Authentication Components

-   **`AuthContext`** - React context for authentication state
-   **`ProtectedRoute`** - Route protection wrapper
-   **`LoginPage`** - Unified login/signup component

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or higher
-   npm or yarn package manager
-   Backend API running (see backend README)

### Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000

# Optional: Analytics or other services
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Installation & Setup

1. **Install Dependencies**

```bash
npm install
# or
yarn install
```

2. **Start Development Server**

```bash
npm run dev
# or
yarn dev
```

3. **Open Application**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
fuzzy-enigma-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth route group
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   ├── favorites/         # Favorites page
│   │   ├── profile/           # Profile page
│   │   ├── recipe/[id]/       # Dynamic recipe pages
│   │   ├── search/            # Search results page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── favorites/         # Favorites page components
│   │   ├── home/              # Home page components
│   │   ├── layout/            # Layout components
│   │   ├── profile/           # Profile components
│   │   ├── recipe/            # Recipe detail components
│   │   ├── results/           # Search results components
│   │   └── ui/                # Reusable UI components
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuthNavigation.ts
│   │   ├── useFavorites.ts
│   │   └── useProfile.ts
│   ├── lib/                   # Utility libraries
│   │   ├── api-client.ts      # API communication
│   │   ├── auth-client.ts     # Authentication client
│   │   └── analytics.ts       # Analytics tracking
│   ├── types/                 # TypeScript definitions
│   │   └── api.ts             # API type definitions
│   └── utils/                 # Utility functions
├── public/                    # Static assets
│   ├── icons/                 # App icons
│   └── images/                # Static images
├── tailwind.config.js         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔄 State Management

### Authentication State

-   **AuthContext**: Global authentication state
-   **Session Management**: Automatic session refresh
-   **Route Protection**: Protected routes for authenticated users

### Local State

-   **Component State**: React useState for component-specific data
-   **Form State**: Controlled components for form inputs
-   **UI State**: Loading, error, and success states

### Data Fetching

-   **API Client**: Centralized API communication
-   **Error Handling**: Consistent error handling across components
-   **Loading States**: User-friendly loading indicators

## 🎯 User Experience Features

### Loading States

-   **Skeleton Loading**: Placeholder content during data fetching
-   **Animated Illustrations**: Engaging loading animations
-   **Progress Indicators**: Clear progress feedback

### Error Handling

-   **Graceful Degradation**: Fallback content for errors
-   **Retry Mechanisms**: User-initiated error recovery
-   **Clear Messaging**: Helpful error descriptions

### Accessibility

-   **Keyboard Navigation**: Full keyboard accessibility
-   **Screen Reader Support**: ARIA labels and descriptions
-   **Color Contrast**: WCAG compliant color combinations
-   **Focus Management**: Clear focus indicators

### Performance

-   **Image Optimization**: Next.js automatic image optimization
-   **Code Splitting**: Automatic route-based code splitting
-   **Lazy Loading**: Deferred loading of non-critical components

## 📱 Mobile Experience

### Touch Interactions

-   **Touch-Friendly Buttons**: Appropriately sized touch targets
-   **Swipe Gestures**: Natural mobile interactions
-   **Haptic Feedback**: Native mobile feedback (where supported)

### Mobile-Specific Features

-   **Camera Integration**: Direct camera access for ingredient photos
-   **Gallery Access**: Photo library integration
-   **Responsive Images**: Optimized images for mobile bandwidth

### Progressive Web App (PWA) Ready

-   **Service Worker**: Offline capability foundation
-   **App Manifest**: Native app-like installation
-   **Responsive Design**: Consistent experience across devices

## 🧪 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
```

## 🚀 Deployment

### Build Process

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Environment Configuration

-   **Production API URL**: Update `NEXT_PUBLIC_API_URL`
-   **Analytics**: Configure analytics services
-   **Error Tracking**: Set up error monitoring

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS for the Chef recipe discovery platform.
