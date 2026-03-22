export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface Nationality {
  id: number;
  code: string;
  name: string;
}

export interface PlayerAsset {
  id: number;
  type: number;
  value: string;
  path: string;
}

export interface Player {
  id: number;
  assets: PlayerAsset[];
  fullName: string;
  name: string;
  mainId: string;
  position: number;
  specificPosition: number;
  statAtt: number;
  statDef: number;
  statOvr: number;
  age: number;
  teamId: number;
  leagueId: number;
  fitness: number;
  morale: number;
  goals: number;
  status: number;
  unavailable: number;
  lineup: number;
  value: number;
  yellowCards: number;
  trainingProgress: number;
  injuryId: number;
  suspensionId: number;
  assists: number;
  lastPlayerGrade: number;
  averagePlayerGrade: number;
  lastAveragePlayerGrade: number;
  matchesPlayed: number;
  goalsLastMatch: number;
  rarity: number;
  source: number;
  nationality: Nationality;
  squadNumber: number;
  leagueTypeId: number;
  themeId: number;
}

export interface TeamSlot {
  id: number;
  teamId: number;
  teamName: string;
  leagueId: number;
  leagueName: string;
  countryId: number;
  countryName: string;
  isModerator: boolean;
  isUnlocked: boolean;
  daysToUnlock: number;
  leagueTypeId: number;
  day: number;
  daysInLeague: number;
  position: number;
  goals: number;
  playerCount: number;
  managerCount: number;
  isFinished: boolean;
  canManage: boolean;
}

export interface UserProfile {
  userId: number;
  userName: string;
  assets: PlayerAsset[];
  rank: number;
  medals: number;
  points: number;
  xp: number;
  level: number;
}

export interface Connection {
  type: string;
  id: string;
  name: string;
}

export interface OSMUser {
  teamslots: TeamSlot[];
  email: string;
  profile: UserProfile;
  connections: Connection[];
}
