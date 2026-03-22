import { TokenResponse, Player } from "../types.js";

const BASE_URL = "https://web-api.onlinesoccermanager.com";

const COMMON_HEADERS: Record<string, string> = {
  accept: "application/json; charset=utf-8",
  "accept-language": "en-GB, en-GB",
  appversion: "3.243.0",
  platformid: "11",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
};

interface TokenState {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export class OsmProvider {
  private tokenState: TokenState | null = null;
  private refreshPromise: Promise<void> | null = null;
  private username: string;
  private password: string;
  private clientId: string;
  private clientSecret: string;

  constructor(
    username: string,
    password: string,
    clientId: string,
    clientSecret: string
  ) {
    this.username = username;
    this.password = password;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async getPlayers(leagueId: string, teamId: string): Promise<Player[]> {
    const res = await this.authenticatedFetch(
      `${BASE_URL}/api/v1/leagues/${leagueId}/teams/${teamId}/players`
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`OSM API error (${res.status}): ${text}`);
    }

    return (await res.json()) as Player[];
  }

  private async authenticatedFetch(
    url: string,
    init?: RequestInit
  ): Promise<Response> {
    const token = await this.getAccessToken();
    return fetch(url, {
      ...init,
      headers: {
        ...COMMON_HEADERS,
        "content-type": "application/json; charset=utf-8",
        authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
  }

  private async getAccessToken(): Promise<string> {
    if (!this.tokenState) {
      await this.login();
      return this.tokenState!.accessToken;
    }

    if (Date.now() >= this.tokenState.expiresAt) {
      if (!this.refreshPromise) {
        this.refreshPromise = this.refreshAccessToken().finally(() => {
          this.refreshPromise = null;
        });
      }
      await this.refreshPromise;
    }

    return this.tokenState!.accessToken;
  }

  private async login(): Promise<void> {
    const body = new URLSearchParams({
      userName: this.username,
      grant_type: "password",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      password: this.password,
    });

    const res = await fetch(`${BASE_URL}/api/token`, {
      method: "POST",
      headers: {
        ...COMMON_HEADERS,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: body.toString(),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`OSM login failed (${res.status}): ${text}`);
    }

    const data = (await res.json()) as TokenResponse;
    this.tokenState = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000 - 60_000,
    };
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.tokenState) {
      await this.login();
      return;
    }

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.tokenState.refreshToken,
    });

    const res = await fetch(`${BASE_URL}/api/tokenRefresh`, {
      method: "POST",
      headers: {
        ...COMMON_HEADERS,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        authorization: `Bearer ${this.tokenState.accessToken}`,
      },
      body: body.toString(),
    });

    if (!res.ok) {
      this.tokenState = null;
      await this.login();
      return;
    }

    const data = (await res.json()) as TokenResponse;
    this.tokenState = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000 - 60_000,
    };
  }
}
