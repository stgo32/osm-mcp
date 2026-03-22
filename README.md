# osm-mcp

MCP server for the [Online Soccer Manager](https://www.onlinesoccermanager.com) API. Connects Claude to your OSM account via the Model Context Protocol over stdio.

## Setup

```bash
yarn install
yarn build
```

## Configuration

Requires your OSM credentials as environment variables:

| Variable            | Description              |
|---------------------|--------------------------|
| `OSM_USERNAME`      | Your OSM username        |
| `OSM_PASSWORD`      | Your OSM password        |
| `OSM_CLIENT_ID`     | OSM API client ID        |
| `OSM_CLIENT_SECRET` | OSM API client secret    |

## Register with Claude Code

```bash
claude mcp add osm-mcp \
  --transport stdio \
  --env OSM_USERNAME=<your_username> \
  --env OSM_PASSWORD=<your_password> \
  --env OSM_CLIENT_ID=<your_client_id> \
  --env OSM_CLIENT_SECRET=<your_client_secret> \
  -- node /path/to/osm-mcp/build/index.js
```

## Available Tools

### `get_players`

Retrieve the full squad roster for a team in a league.

**Parameters:**
- `leagueId` — League ID (e.g. `"33600421"`)
- `teamId` — Team ID (e.g. `"17"`)

**Returns:** Player details including name, position, stats, age, fitness, morale, goals, assists, market value, lineup position, and nationality.

## Development

```bash
yarn lint    # type-check (tsc --noEmit)
yarn build   # compile to build/
yarn start   # run the server
```

## Project Structure

```
src/
├── index.ts                  # Entry point: server + transport
├── types.ts                  # Shared types (Player, TokenResponse)
├── services/
│   └── osm-provider.ts       # OsmProvider: auth + API client
└── tools/
    └── get-players.ts        # get_players tool registration
```
