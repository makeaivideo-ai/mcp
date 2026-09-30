#!/usr/bin/env node
/**
 * MakeAIVideo MCP server (stdio).
 *
 * A thin, local bridge to the hosted MakeAIVideo MCP server at
 * https://mcp.makeaivideo.ai. Every tool is served by the hosted server, so
 * this package is always in sync with it: new tools appear without an update.
 *
 * Usage (Claude Desktop, Cursor, Windsurf, Cline, Zed...):
 *   { "command": "npx", "args": ["-y", "@makeaivideo/mcp"],
 *     "env": { "MAKEAIVIDEO_API_KEY": "mav_..." } }
 *
 * Clients that speak remote MCP (Claude.ai, ChatGPT, Claude Code) can skip
 * this package and connect to https://mcp.makeaivideo.ai directly (OAuth).
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { readFileSync } from "node:fs"

const VERSION = "1.0.1"
const REMOTE_URL = process.env.MAKEAIVIDEO_MCP_URL || "https://mcp.makeaivideo.ai"
const API_KEY = process.env.MAKEAIVIDEO_API_KEY || process.env.MAV_API_KEY || ""

function log(msg: string) {
  // stdout is the MCP channel; diagnostics go to stderr only.
  process.stderr.write(`[makeaivideo-mcp] ${msg}\n`)
}

if (process.argv.includes("--version")) {
  process.stdout.write(`${VERSION}\n`)
  process.exit(0)
}

/**
 * Snapshot of the hosted server's tools/list (tools.json, shipped in the
 * package). Served ONLY when no API key is set, so clients and directory
 * scanners can see the tool list before the user adds a key. With a key,
 * tools/list always comes live from the hosted server.
 */
function snapshotTools(): { tools: unknown[] } {
  try {
    const raw = readFileSync(new URL("../tools.json", import.meta.url), "utf8")
    return JSON.parse(raw) as { tools: unknown[] }
  } catch {
    return { tools: [] }
  }
}

const NO_KEY_MESSAGE =
  "MAKEAIVIDEO_API_KEY is not set. Create a key at https://app.makeaivideo.ai/developers and add it to this server's env."

let remote: Client | null = null
let connecting: Promise<Client> | null = null

async function getRemote(): Promise<Client> {
  if (remote) return remote
  if (connecting) return connecting
  connecting = (async () => {
    if (!API_KEY) {
      throw new Error(NO_KEY_MESSAGE)
    }
    const transport = new StreamableHTTPClientTransport(new URL(REMOTE_URL), {
      requestInit: {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "User-Agent": `makeaivideo-mcp/${VERSION}`,
        },
      },
    })
    const client = new Client({ name: "makeaivideo-mcp-bridge", version: VERSION })
    await client.connect(transport)
    remote = client
    return client
  })()
  try {
    return await connecting
  } catch (err) {
    connecting = null
    throw err
  }
}

const server = new Server(
  { name: "makeaivideo", version: VERSION, title: "MakeAIVideo" },
  {
    capabilities: { tools: {} },
    instructions:
      "MakeAIVideo turns a brief into a finished short-form video (script, voiceover, scenes, captions) and can post it to the user's connected social accounts. Estimate cost first, create, then poll get_video_status - renders take minutes, respect poll_after_seconds. Confirm accounts and caption with the user before publish_video.",
  }
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  if (!API_KEY) return snapshotTools() as never
  try {
    const client = await getRemote()
    return await client.listTools()
  } catch (err) {
    log(`tools/list failed: ${err instanceof Error ? err.message : String(err)}`)
    throw err
  }
})

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  try {
    const client = await getRemote()
    return await client.callTool({ name: req.params.name, arguments: req.params.arguments ?? {} })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    // Surface as a tool error the model can read, not a transport failure.
    return { content: [{ type: "text", text: `MakeAIVideo error: ${message}` }], isError: true }
  }
})

async function main() {
  await server.connect(new StdioServerTransport())
  log(`ready (remote ${REMOTE_URL}${API_KEY ? "" : ", no API key set"})`)
}

main().catch((err) => {
  log(`fatal: ${err instanceof Error ? err.stack || err.message : String(err)}`)
  process.exit(1)
})
