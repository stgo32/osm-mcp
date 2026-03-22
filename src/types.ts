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
