import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OsmProvider } from "../services/osm-provider.js";

export function registerGetUserTool(
  server: McpServer,
  osm: OsmProvider
): void {
  server.registerTool(
    "get_user",
    {
      description:
        "Retrieve the user profile and teamslots. " +
        "Use this to get information about user leagues and teams.",
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async () => {
      try {
        const user = await osm.getUser();
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(user, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);
        console.error('[GetUserTool] Error: ', error);
        return {
          isError: true,
          content: [{ type: "text" as const, text: `Error: ${message}` }],
        };
      }
    }
  );
}
