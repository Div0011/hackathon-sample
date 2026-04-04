import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'organiser' | 'user';

export interface ProfileData {
  fullName: string;
  email: string;
  yearOfStudy: string;
  branch: string;
  linkedin: string;
  github: string;
  portfolio: string;
  domains: string[];
  techStack: string[];
  experience: string;
  workingOn: string;
  profileSummary: string;
  goalSummary: string;
  interestSummary: string;
  projects: string;
  networkingReason: string;
  lookingFor: string[];
  interactionStyle: string;
  communicationPreference: string;
  availability: string;
  personalityType: string;
  openTo: string[];
  dreamRole: string;
  problemsToSolve: string;
  valueToOffer: string;
  mbtiTrait: string;
}

export interface ScanectUser {
  uniqueId: string;
  password: string;
  role: UserRole;
  accessKey?: string;
  profile: ProfileData | null;
  registeredEmail?: string;
  createdAt: string;
}

export interface PendingOrganiser {
  token: string;
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  eventType: string;
  expectedAttendees: string;
  venue: string;
  password: string;
  submittedAt: string;
}

interface AuthContextType {
  currentUser: ScanectUser | null;
  allUsers: ScanectUser[];
  pendingOrganisers: PendingOrganiser[];
  login: (uniqueId: string, password: string, accessKey?: string) => { success: boolean; error?: string };
  registerUser: (profileData: Partial<ProfileData>, password: string) => string; // returns generated UID
  submitOrganiserApplication: (data: Omit<PendingOrganiser, 'token' | 'submittedAt'>) => string; // returns token
  logout: () => void;
  updateCurrentUserProfile: (profileData: ProfileData) => void;
  resetCurrentUserProfile: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const ADMIN_KEY = 'SCN2026_admin';
export const ORGANISER_KEY = 'SCN2026_orgr';

const STORAGE_KEYS = {
  USERS: 'scanect_users',
  CURRENT_USER_ID: 'scanect_current_user_id',
  PENDING_ORGANISERS: 'scanect_pending_organisers',
};

// ─── Demo Profiles ────────────────────────────────────────────────────────────

const ADMIN_PROFILE: ProfileData = {
  fullName: 'Arjun Sharma',
  email: 'admin@scanect.io',
  yearOfStudy: 'Graduate',
  branch: 'Computer Science',
  linkedin: 'https://linkedin.com/in/arjunsharma-admin',
  github: 'https://github.com/arjunsharma',
  portfolio: 'https://arjunsharma.dev',
  domains: ['AI/ML', 'Cloud', 'Cybersecurity'],
  techStack: ['Python', 'AWS', 'Docker', 'Node.js'],
  experience: 'Wizard',
  workingOn: 'Building the Scanect platform infrastructure and AI matching engine.',
  profileSummary: 'Platform architect and tech lead behind Scanect. Passionate about building systems that connect brilliant minds.',
  goalSummary: 'Scale Scanect to 10,000 active users and make it the go-to networking platform for hackathon communities.',
  interestSummary: 'Distributed systems, AI research, open-source tooling, and community building.',
  projects: 'Scanect v3.0, NeuralNet Optimizer, CloudBase CDN',
  networkingReason: 'Building',
  lookingFor: ['Collaborators', 'Investors', 'Hiring Managers'],
  interactionStyle: 'Ambivert',
  communicationPreference: 'Real-time (Video/Call)',
  availability: 'Weekdays',
  personalityType: 'Analyst',
  openTo: ['Full-time', 'Partnerships', 'Open Source'],
  dreamRole: 'CTO of a leading AI infrastructure company',
  problemsToSolve: 'Making meaningful connections in a noisy networking environment.',
  valueToOffer: 'Deep technical expertise in system design, AI, and product strategy.',
  mbtiTrait: 'INTJ',
};

const ORGANISER_PROFILE: ProfileData = {
  fullName: 'Priya Mehta',
  email: 'priya@hackfest.in',
  yearOfStudy: '4th Year',
  branch: 'Information Technology',
  linkedin: 'https://linkedin.com/in/priyamehta-events',
  github: 'https://github.com/priyamehta',
  portfolio: 'https://hackfest.in',
  domains: ['UI/UX', 'Web Dev', 'App Dev'],
  techStack: ['React', 'Next.js', 'Figma', 'Firebase'],
  experience: 'Advanced',
  workingOn: 'Organising HackFest Delhi 2026 – the largest student hackathon in NCR.',
  profileSummary: 'Event organiser and community builder with 3+ years experience running college tech events.',
  goalSummary: 'Create inclusive spaces for students to build, network, and grow together.',
  interestSummary: 'Event management, product design, community development, hackathon culture.',
  projects: 'HackFest 2024, TechTalks Delhi, Startup Connect NCR',
  networkingReason: 'Building',
  lookingFor: ['Collaborators', 'Mentors', 'Peers'],
  interactionStyle: 'Extrovert',
  communicationPreference: 'Real-time (Video/Call)',
  availability: 'Weekends',
  personalityType: 'Diplomat',
  openTo: ['Internships', 'Hackathons', 'Partnerships'],
  dreamRole: 'Community Lead at a top tech company',
  problemsToSolve: 'Breaking the barrier between technical talent and real-world opportunities.',
  valueToOffer: 'Event management skills, design thinking, and a wide network of student communities.',
  mbtiTrait: 'ENFJ',
};

const USER_PROFILE: ProfileData = {
  fullName: 'Rohan Verma',
  email: 'rohan.v@example.com',
  yearOfStudy: '3rd Year',
  branch: 'Electronics & Computer Science',
  linkedin: 'https://linkedin.com/in/rohanverma-dev',
  github: 'https://github.com/rohanverma',
  portfolio: '',
  domains: ['Web Dev', 'App Dev', 'IoT'],
  techStack: ['React', 'Node.js', 'Python', 'Firebase'],
  experience: 'Intermediate',
  workingOn: 'An IoT dashboard for smart home automation using React and MQTT.',
  profileSummary: 'Third-year CS student passionate about building useful products. Love hackathons and late-night coding sessions.',
  goalSummary: 'Land a SWE internship at a product startup and eventually start my own company.',
  interestSummary: 'Full-stack development, IoT, open source contributions, startup culture.',
  projects: 'SmartHome Dashboard, Campus Canteen App, HackerPal Chrome Extension',
  networkingReason: 'Finding a Job',
  lookingFor: ['Mentors', 'Collaborators', 'Hiring Managers'],
  interactionStyle: 'Ambivert',
  communicationPreference: 'Async (Text/Mail)',
  availability: 'Weekends',
  personalityType: 'Explorer',
  openTo: ['Internships', 'Hackathons', 'Open Source'],
  dreamRole: 'Software Engineer at a product startup',
  problemsToSolve: 'Finding relevant mentors and collaborators for hackathon projects.',
  valueToOffer: 'Quick learner, full-stack skills, strong problem-solving, and high energy.',
  mbtiTrait: 'ENTP',
};

const DEMO_USERS: ScanectUser[] = [
  {
    uniqueId: 'SCN-ADMIN_admin',
    password: 'Admin@Scanect_admin',
    role: 'admin',
    accessKey: ADMIN_KEY,
    profile: ADMIN_PROFILE,
    registeredEmail: 'admin@scanect.io',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    uniqueId: 'SCN-ORG_orgr',
    password: 'Orgr@Scanect_orgr',
    role: 'organiser',
    accessKey: ORGANISER_KEY,
    profile: ORGANISER_PROFILE,
    registeredEmail: 'priya@hackfest.in',
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    uniqueId: 'SCN-USR_user',
    password: 'User@Scanect_user',
    role: 'user',
    profile: USER_PROFILE,
    registeredEmail: 'rohan.v@example.com',
    createdAt: '2026-02-01T00:00:00Z',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateUID(): string {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `SCN-USR-${suffix}`;
}

function generateOrgToken(): string {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `ORG-PENDING-${suffix}`;
}

function loadUsers(): ScanectUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (raw) {
      const parsed = JSON.parse(raw) as ScanectUser[];
      // Ensure demo users always have correct credentials
      const result: ScanectUser[] = [];
      const seenIds = new Set<string>();
      
      // First add all non-demo users from localStorage
      parsed.forEach(user => {
        if (!DEMO_USERS.some(d => d.uniqueId === user.uniqueId)) {
          result.push(user);
          seenIds.add(user.uniqueId);
        }
      });
      
      // Then add/update demo users with correct credentials
      DEMO_USERS.forEach(demo => {
        result.push(demo);
        seenIds.add(demo.uniqueId);
      });
      
      return result;
    }
  } catch { /* ignore */ }
  return [...DEMO_USERS];
}

function saveUsers(users: ScanectUser[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch { /* ignore */ }
}

function loadCurrentUser(users: ScanectUser[]): ScanectUser | null {
  try {
    const id = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    if (id) return users.find(u => u.uniqueId === id) || null;
  } catch { /* ignore */ }
  return null;
}

function loadPendingOrganisers(): PendingOrganiser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PENDING_ORGANISERS);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function savePendingOrganisers(list: PendingOrganiser[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.PENDING_ORGANISERS, JSON.stringify(list));
  } catch { /* ignore */ }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<ScanectUser[]>(loadUsers);
  const [currentUser, setCurrentUser] = useState<ScanectUser | null>(() => loadCurrentUser(loadUsers()));
  const [pendingOrganisers, setPendingOrganisers] = useState<PendingOrganiser[]>(loadPendingOrganisers);

  // Persist users to localStorage whenever they change
  useEffect(() => {
    saveUsers(allUsers);
  }, [allUsers]);

  // Persist current user session
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUser.uniqueId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUser]);

  // Ensure demo users always have correct credentials on app startup
  useEffect(() => {
    const hasCorrectDemos = DEMO_USERS.every(demo =>
      allUsers.some(u => u.uniqueId === demo.uniqueId && u.password === demo.password)
    );

    if (!hasCorrectDemos) {
      // Re-initialize users to fix corrupted demo credentials
      const reloadedUsers = loadUsers();
      setAllUsers(reloadedUsers);
      // Also reset current user if they no longer exist or have wrong password
      if (currentUser) {
        const stillValidUser = reloadedUsers.find(
          u => u.uniqueId === currentUser.uniqueId && u.password === currentUser.password
        );
        if (!stillValidUser) {
          setCurrentUser(null);
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
        }
      }
    }
  }, []);

  const login = (uniqueId: string, password: string, accessKey?: string): { success: boolean; error?: string } => {
    // Remove all spaces to handle common typos like "SCN- USR_user"
    const sanitizedId = uniqueId.replace(/\s+/g, '');
    const user = allUsers.find(u => u.uniqueId === sanitizedId);
    if (!user) return { success: false, error: 'No account found with that ID.' };
    if (user.password !== password) return { success: false, error: 'Incorrect password.' };

    // Determine role from key
    let role: UserRole = user.role;
    if (accessKey) {
      const trimmedKey = accessKey.trim();
      if (trimmedKey === ADMIN_KEY) {
        role = 'admin';
      } else if (trimmedKey === ORGANISER_KEY) {
        role = 'organiser';
      } else {
        return { success: false, error: 'Invalid access key.' };
      }
    }

    const updatedUser = { ...user, role };
    setCurrentUser(updatedUser);
    // Update role in user list too
    setAllUsers(prev => prev.map(u => u.uniqueId === updatedUser.uniqueId ? updatedUser : u));
    return { success: true };
  };

  const registerUser = (profileData: Partial<ProfileData>, password: string): string => {
    const uid = generateUID();
    const fullProfile: ProfileData = {
      fullName: profileData.fullName || 'Anonymous User',
      email: profileData.email || '',
      yearOfStudy: '',
      branch: '',
      linkedin: '',
      github: '',
      portfolio: '',
      domains: [],
      techStack: [],
      experience: '',
      workingOn: '',
      profileSummary: '',
      goalSummary: '',
      interestSummary: '',
      projects: '',
      networkingReason: '',
      lookingFor: [],
      interactionStyle: '',
      communicationPreference: '',
      availability: '',
      personalityType: '',
      openTo: [],
      dreamRole: '',
      problemsToSolve: '',
      valueToOffer: '',
      mbtiTrait: '',
      ...profileData
    };
    const newUser: ScanectUser = {
      uniqueId: uid,
      password,
      role: 'user',
      profile: fullProfile,
      registeredEmail: fullProfile.email,
      createdAt: new Date().toISOString(),
    };

    const updated = [...allUsers, newUser];
    setAllUsers(updated);
    setCurrentUser(newUser);
    return uid;
  };

  const submitOrganiserApplication = (data: Omit<PendingOrganiser, 'token' | 'submittedAt'>): string => {
    const token = generateOrgToken();
    const entry: PendingOrganiser = {
      ...data,
      token,
      submittedAt: new Date().toISOString(),
    };
    const updated = [...pendingOrganisers, entry];
    setPendingOrganisers(updated);
    savePendingOrganisers(updated);
    return token;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  };

  const updateCurrentUserProfile = (profileData: ProfileData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, profile: profileData };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.uniqueId === updated.uniqueId ? updated : u));
  };

  const resetCurrentUserProfile = () => {
    if (!currentUser) return;
    const updated = { ...currentUser, profile: null };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.uniqueId === updated.uniqueId ? updated : u));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      allUsers,
      pendingOrganisers,
      login,
      registerUser,
      submitOrganiserApplication,
      logout,
      updateCurrentUserProfile,
      resetCurrentUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
