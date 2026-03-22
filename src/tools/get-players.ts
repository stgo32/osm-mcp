import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OsmProvider } from "../services/osm-provider.js";

export function registerGetPlayersTool(
  server: McpServer,
  osm: OsmProvider
): void {
  server.registerTool(
    "get_players",
    {
      description:
        "Retrieve the full squad roster for a team in a league. " +
        "Returns player details including name, position, stats (attack/defense/overall), " +
        "age, fitness, morale, goals, assists, market value, lineup position, and nationality. " +
        "Use this to analyze team composition, identify top performers, or review squad status.",
      inputSchema: {
        leagueId: z
          .string()
          .describe("The league ID (numeric string, e.g. '33600421')"),
        teamId: z
          .string()
          .describe("The team ID (numeric string, e.g. '17')"),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ leagueId, teamId }) => {
      try {
        const players = await osm.getPlayers(leagueId, teamId);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(players, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [{ type: "text" as const, text: `Error: ${message}` }],
        };
      }
    }
  );
}
