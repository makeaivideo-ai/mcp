# Changelog

## 1.2.1 (2026-11-24)

- README and skill: signing up is free with no card, plans from $14, extra credits from $5 on a plan. No code change.

## 1.2.0 (2026-11-21)

- The bundled `tools.json` snapshot is regenerated from the hosted server: 70 tools (was 47). The snapshot script now lists exactly what the server's tools/list returns, including the tools that fix a finished video.
- Fix a finished video: `get_video` (the full script with every scene, its picture, clip and whether it is lip-synced, plus music, voice and any edit in progress), `edit_scene_narration` (new line, picture kept), `edit_scene_visual` (new picture, line kept), `set_music` and `list_music_library` (free), `report_video`. `list_my_videos` pages through every video; `get_video_status`, `wait_for_video`, `regenerate_scene`, `regenerate_voice`, `export_video` and `update_video` were rewritten for edits: paid edits return the price first and charge nothing until called with `max_credits`, a retry with the same idempotency key is never charged twice, and the status says when an edit is still being made.
- Photos and your own videos: `upload_image_from_url`, `upload_video_from_url`, `image_to_video`, `talking_avatar`, `character_swap`.
- Posts: `suggest_caption`, `reschedule_post`, `cancel_post`.
- Account: `update_character`, `delete_character`, `get_workspace`, `update_workspace`, `get_brand_kit`, `set_watermark`, `test_webhook`, `list_webhook_deliveries`, `delete_webhook`.
- A video asked for before the account has a plan waits (`waiting_for_plan`) with the link to start the trial, and starts by itself once the plan is active.
- README and llms-install.md: rows for every new tool, how to fix one scene, and image to video / character swap through MCP.
- server.json 1.6.0 for the MCP Registry, pointing at npm 1.2.0 (the remote https://mcp.makeaivideo.ai is unchanged).

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
