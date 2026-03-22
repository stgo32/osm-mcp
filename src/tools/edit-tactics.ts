import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OsmProvider } from "../services/osm-provider.js";
import z from "zod";
import { FormationNames } from "../data/formations.js";
import { TeamTacticsPayload } from "../types.js";

const ATTACK_MAP: Record<string, number> = { dropDeep: 0, supportMidfield: 1, attackOnly: 2 };
const DEFENSE_MAP: Record<string, number> = { defendDeep: 0, attackingFullBacks: 1, supportMidfield: 2 };
const MIDFIELD_MAP: Record<string, number> = { protectTheDefense: 0, stayInPosition: 1, pushForward: 2 };
const TACKLING_MAP: Record<string, number> = { careful: 0, normal: 1, aggressive: 2, reckless: 3 };
const GAME_PLAN_MAP: Record<string, number> = { passingGame: 0, shootOnSight: 1, wingPlay: 2, counterAttack: 3, longBalls: 4 };

export function editTacticsTool(
  server: McpServer,
  osm: OsmProvider
): void {
  server.registerTool(
    "edit_tactics",
    {
      description:
        "Use this to edit team tactics." +
        "All params must be provided.",
      annotations: { readOnlyHint: false, openWorldHint: false },
      inputSchema: {
        leagueId: z
          .string()
          .describe("The league ID (numeric string, e.g. '33600421')"),
        teamId: z
          .string()
          .describe("The team ID (numeric string, e.g. '17')"),
        tactics: z
          .object({
            attack: z.enum(Object.keys(ATTACK_MAP) as [string, ...string[]]),
            defense: z.enum(Object.keys(DEFENSE_MAP) as [string, ...string[]]),
            midField: z.enum(Object.keys(MIDFIELD_MAP) as [string, ...string[]]),
            tackling: z.enum(Object.keys(TACKLING_MAP) as [string, ...string[]]),
            gamePlan: z.enum(Object.keys(GAME_PLAN_MAP) as [string, ...string[]]),
            marking: z.enum(["zonalMarking", "manMarking"]),
            mentality: z.number().min(0).max(100),
            offSideTrap: z.boolean(),
            pressing: z.number().min(0).max(100),
            tempo: z.number().min(0).max(100),
            formation: z.enum(FormationNames.map(String) as [string, ...string[]]),
            formationDetail: z.enum(["A", "B"]),
          })
          .strict()
          .describe("The team tactics. All keys are strictly required and must be present."),
      },
    },
    async ({ leagueId, teamId, tactics }) => {
      console.log('[EditTacticsTool] Editing tactics for team ', teamId, ' in league ', leagueId, ' with tactics ', tactics);
      
      const tacticsToUse: TeamTacticsPayload = {
        attack: ATTACK_MAP[tactics.attack],
        defense: DEFENSE_MAP[tactics.defense],
        midField: MIDFIELD_MAP[tactics.midField],
        style: GAME_PLAN_MAP[tactics.gamePlan],
        overallMatchTactics: TACKLING_MAP[tactics.tackling],
        marking: tactics.marking === "manMarking",
        mentality: tactics.mentality,
        offSideTrap: tactics.offSideTrap,
        pressing: tactics.pressing,
        tempo: tactics.tempo,
        formation: parseInt(tactics.formation, 10),
        formationDetail: tactics.formationDetail,
      };

      try {
        const result = await osm.editTeamTactics(leagueId, teamId, tacticsToUse);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
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
