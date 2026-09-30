# Changelog

## 1.0.2 (2026-09-30)

- Package metadata only: npm homepage is now https://makeaivideo.ai/docs/mcp, richer keywords, README Links section. No code changes.

## 1.0.1 (2026-09-30)

- The hosted server now has 44 tools. New: `list_social_accounts`, `get_connect_link`, `publish_video`, `get_publish_status`, `list_posts` (post finished videos to connected TikTok, Instagram, YouTube, Facebook Pages, LinkedIn, Threads, Pinterest, Bluesky, Telegram and Discord accounts, now or scheduled).
- Without `MAKEAIVIDEO_API_KEY`, the server now starts and answers `tools/list` from a bundled snapshot (`tools.json`), so clients and directories can inspect it. Tool calls still need a key.
- Added a `Dockerfile`.

## 1.0.0 (2026-09-25)

- First release: stdio MCP server bridging to the hosted MakeAIVideo MCP server (https://mcp.makeaivideo.ai). 39 tools, always in sync with the hosted server.
