# Changelog

## 1.1.0 (2026-11-21)

- The bundled `tools.json` snapshot is regenerated from the hosted server's own definitions: 47 tools. New: `make_video` (one call from a topic to a started video, priced against the balance), `wait_for_video` (waits up to about 50 seconds per call, returns `done` and the download link) and `get_top_up_link` (a link the user opens to add credits; it charges nothing). 24 tool descriptions and schemas updated, including `quality` (best or fast), `mode`, `language`, `captions`, `max_credits` and the `held` result for a create that did not start.
- Running out of credits: `get_credits` returns when the plan credits refill (`resets_at`, `refill_credits`) and `top_up_url`; a refused create or spend carries `shortfall`, `resets_at` and `top_up_url`; `create_webhook` takes the new `credits.low` and `credits.refilled` events.
- `--version` and the bridge's User-Agent now report the package version (they said 1.0.4 in 1.0.5).
- README and llms-install.md: the quickest path is `make_video` then `wait_for_video`.
- server.json 1.5.0 for the MCP Registry, pointing at npm 1.1.0.

## Unreleased (2026-10-15)

- README rewritten: what the server is, what you can make, example prompts, setup for Claude, ChatGPT, Claude Code, Cursor and VS Code (one-click), Codex, Gemini CLI, Windsurf and other apps, all 44 tools grouped with descriptions, credits, and an FAQ. No code changes.
- server.json 1.4.3: new registry description and an icon. The npm package is unchanged (1.0.4).

## 1.0.4 (2026-09-30)

- Posting to X is now supported (videos up to 140 seconds). The bundled `tools.json` snapshot, README and llms-install.md list X. No code changes.

## 1.0.3 (2026-09-30)

- README: "What you can make with MakeAIVideo" section linking each video type; npm keywords for each video type. No code changes.

## 1.0.2 (2026-09-30)

- Package metadata only: npm homepage is now https://makeaivideo.ai/docs/mcp, richer keywords, README Links section. No code changes.

## 1.0.1 (2026-09-30)

- The hosted server now has 44 tools. New: `list_social_accounts`, `get_connect_link`, `publish_video`, `get_publish_status`, `list_posts` (post finished videos to connected TikTok, Instagram, YouTube, Facebook Pages, LinkedIn, Threads, Pinterest, Bluesky, Telegram and Discord accounts, now or scheduled).
- Without `MAKEAIVIDEO_API_KEY`, the server now starts and answers `tools/list` from a bundled snapshot (`tools.json`), so clients and directories can inspect it. Tool calls still need a key.
- Added a `Dockerfile`.

## 1.0.0 (2026-09-25)

- First release: stdio MCP server bridging to the hosted MakeAIVideo MCP server (https://mcp.makeaivideo.ai). 39 tools, always in sync with the hosted server.
