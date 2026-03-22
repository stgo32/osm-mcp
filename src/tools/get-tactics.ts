import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OsmProvider } from "../services/osm-provider.js";
import z from "zod";

export function getTacticsTool(
  server: McpServer,
  osm: OsmProvider
): void {
  server.registerTool(
    "get_tactics",
    {
      description:
        "Retrieve the team tactics. " +
        "Use this to get information about team tactics.",
      annotations: { readOnlyHint: true, openWorldHint: true },
      inputSchema: {
        leagueId: z
          .string()
          .describe("The league ID (numeric string, e.g. '33600421')"),
        teamId: z
          .string()
          .describe("The team ID (numeric string, e.g. '17')"),
      },
    },
    async ({ leagueId, teamId }) => {
      try {
        const tactics = await osm.getTeamTactics(leagueId, teamId);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(tactics, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);
        console.error('[GetTacticsTool] Error: ', error);
        return {
          isError: true,
          content: [{ type: "text" as const, text: `Error: ${message}` }],
        };
      }
    }
  );
}
