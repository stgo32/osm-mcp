#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OsmProvider } from "./services/osm-provider.js";
import { registerGetPlayersTool } from "./tools/get-players.js";

const username = process.env.OSM_USERNAME;
const password = process.env.OSM_PASSWORD;
const clientId = process.env.OSM_CLIENT_ID;
const clientSecret = process.env.OSM_CLIENT_SECRET;
if (!username || !password || !clientId || !clientSecret) {
  console.error(
    "OSM_USERNAME, OSM_PASSWORD, OSM_CLIENT_ID, and OSM_CLIENT_SECRET environment variables are required"
  );
  process.exit(1);
}

const osm = new OsmProvider(username, password, clientId, clientSecret);

const server = new McpServer({
  name: "osm-mcp",
  version: "0.1.0",
});

registerGetPlayersTool(server, osm);

const transport = new StdioServerTransport();
await server.connect(transport);
