// import { 
//   Hi2OutlineHome, 
//   Hi2OutlinePlusCircle, 
//   Hi2OutlineArrowRightOnRectangle, 
//   Hi2OutlineArrowLeftOnRectangle, 
//   Hi2OutlineDocumentText, 
//   Hi2OutlineCog6Tooth, 
//   Hi2OutlineSquares2X2 
// } from "react-icons/hi2";

export const APP_COMMANDS = [
  // --- PUBLIC COMMANDS ---
  {
    id: 'home',
    label: 'Home',
    description: 'Go to the main homepage',
    route: '/',
    // icon: Hi2OutlineHome,
    keywords: ['home', 'main', 'landing', 'index'],
    auth: 'public'
  },
  {
    id: 'posts',
    label: 'View Posts',
    description: 'Browse all published articles',
    route: '/all-posts',
    // icon: Hi2OutlineDocumentText,
    keywords: ['posts', 'articles', 'blogs', 'read'],
    auth: 'public'
  },

  // --- GUEST ONLY COMMANDS ---
  {
    id: 'login',
    label: 'Login',
    description: 'Sign into your author account',
    route: '/login',
    // icon: Hi2OutlineArrowRightOnRectangle,
    keywords: ['login', 'signin', 'auth', 'account'],
    auth: 'guest'
  },
  {
    id: 'signup',
    label: 'Sign Up',
    description: 'Register a new author account',
    route: '/signup',
    // icon: Hi2OutlinePlusCircle,
    keywords: ['signup', 'register', 'join', 'create account'],
    auth: 'guest'
  },

  // --- AUTHENTICATED (USER) COMMANDS ---
  {
    id: 'add-post',
    label: 'Create Post',
    description: 'Write a new article in the editor',
    route: '/add-post',
    // icon: Hi2OutlinePlusCircle,
    keywords: ['add', 'create', 'write', 'new post', 'tinymce'],
    auth: 'protected'
  },
  {
    id: 'logout',
    label: 'Logout',
    description: 'Securely sign out of your session',
    route: '/logout',
    // icon: Hi2OutlineArrowLeftOnRectangle,
    keywords: ['logout', 'signout', 'exit', 'leave'],
    auth: 'protected'
  }
];



  // {
  //   id: 'dashboard',
  //   label: 'Dashboard',
  //   description: 'Manage your personal metrics and content',
  //   route: '/dashboard',
  //   // icon: Hi2OutlineSquares2X2,
  //   keywords: ['dashboard', 'admin', 'stats', 'my content'],
  //   auth: 'protected'
  // },
  // {
  //   id: 'settings',
  //   label: 'Settings',
  //   description: 'Adjust your profile configuration',
  //   route: '/settings',
  //   // icon: Hi2OutlineCog6Tooth,
  //   keywords: ['settings', 'preferences', 'profile', 'theme'],
  //   auth: 'protected'
  // },