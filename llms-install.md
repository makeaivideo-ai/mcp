# Installing the MakeAIVideo MCP server (instructions for AI agents)

Goal: give the user's MCP client the MakeAIVideo tools (44 tools: create AI videos, check status, download MP4s, and post finished videos to the user's connected social accounts).

1. Ask the user for a MakeAIVideo API key. They create one at https://app.makeaivideo.ai/developers (Settings, Advanced, API keys). It starts with `mav_`. Never invent a key.
2. Add this server to the client's MCP settings (Cline: `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "makeaivideo": {
      "command": "npx",
      "args": ["-y", "@makeaivideo/mcp"],
      "env": { "MAKEAIVIDEO_API_KEY": "mav_REPLACE_WITH_USER_KEY" }
    }
  }
}
```

3. Requirements: Node.js 18 or newer (`node --version`). No build step, no other environment variables.
4. Verify: call the `whoami` tool. It returns the key's scopes and the credit balance. Then `get_credits`.
5. Typical use: `estimate_video_cost`, then a `create_*_video` tool (for example `create_explainer_video` with a `topic`), then poll `get_video_status` respecting `poll_after_seconds` until status is `ready`, then `get_download_url`.
6. Posting (optional): `list_social_accounts` returns connected accounts. If the account the user wants is missing, call `get_connect_link` and give the link to the user: a person must open it in a browser to approve access. Then `publish_video` with the video id, account ids and caption (confirm them with the user first; posts are public), and poll `get_publish_status`. Supported: TikTok, Instagram, YouTube, Facebook Pages, LinkedIn, Threads, Pinterest, Bluesky, Telegram, Discord. X is not supported.

Alternative for clients that support remote MCP with OAuth: connect to `https://mcp.makeaivideo.ai` instead; no key or local process needed.

Troubleshooting: "MAKEAIVIDEO_API_KEY is not set" means the env block is missing or empty. A 403 naming a scope means the key was created without `write` or `ai`; create a new key with all scopes.
