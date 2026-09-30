# MakeAIVideo MCP Server

[![npm](https://img.shields.io/npm/v/@makeaivideo/mcp.svg)](https://www.npmjs.com/package/@makeaivideo/mcp) [![license](https://img.shields.io/npm/l/@makeaivideo/mcp.svg)](LICENSE)

**Let Claude, ChatGPT, Cursor and any MCP client make finished AI videos and post them.** The [MakeAIVideo](https://makeaivideo.ai) MCP server gives your AI assistant 44 tools to write a script, generate a video with AI voiceover, AI or stock scenes, captions and music, hand back the MP4, and post it (now or scheduled) to your connected [TikTok](https://makeaivideo.ai/tiktok-video-generator), [Instagram Reels](https://makeaivideo.ai/instagram-reels-generator), [YouTube Shorts](https://makeaivideo.ai/ai-shorts-generator), Facebook Pages, LinkedIn, Threads, Pinterest, Bluesky, Telegram and Discord accounts.

Ask your assistant things like:

- "Make a 30-second explainer video about why octopuses have three hearts, vertical, and give me the MP4."
- "Write a script for a UGC ad for my skincare product, then turn it into a video."
- "Give me 10 video ideas for a personal finance channel and make the best one."
- "When the video is ready, post it to my TikTok and YouTube tomorrow at 9am with a short caption."

## Two ways to connect

### 1. Hosted server (recommended): `https://mcp.makeaivideo.ai`

Streamable HTTP with OAuth: add it as a custom connector and sign in, no key to copy.

- **Claude.ai / Claude Desktop:** Settings → Connectors → Add custom connector → `https://mcp.makeaivideo.ai`
- **ChatGPT:** Settings → Connectors → Create → MCP server URL `https://mcp.makeaivideo.ai`
- **Claude Code:**
  ```bash
  claude mcp add --transport http makeaivideo https://mcp.makeaivideo.ai
  ```
- **Cursor** (`~/.cursor/mcp.json`) / **VS Code** (`.vscode/mcp.json`):
  ```json
  { "mcpServers": { "makeaivideo": { "url": "https://mcp.makeaivideo.ai" } } }
  ```

Prefer an API key? Send `Authorization: Bearer mav_...` (create one in the [developer settings](https://app.makeaivideo.ai/developers)).

### 2. Local stdio server (this package)

For clients that only run local commands. It bridges to the hosted server, so every tool stays in sync.

```json
{
  "mcpServers": {
    "makeaivideo": {
      "command": "npx",
      "args": ["-y", "@makeaivideo/mcp"],
      "env": { "MAKEAIVIDEO_API_KEY": "mav_your_key" }
    }
  }
}
```

Works with Claude Desktop, Cursor, Windsurf, Cline, Zed, Continue and any stdio MCP client. Node 18+.

Or run it with Docker (the `Dockerfile` in this repo): `docker build -t makeaivideo-mcp . && docker run -i --rm -e MAKEAIVIDEO_API_KEY=mav_your_key makeaivideo-mcp`.

Without an API key the local server still starts and lists its tools (from the bundled `tools.json` snapshot), so clients can inspect it; every tool call then asks for a key. With a key, the tool list comes live from the hosted server.

## Tools (44)

| Area | Tools |
| --- | --- |
| Create videos | `create_explainer_video`, `create_listicle_video`, `create_story_video`, `create_ugc_video`, `create_demo_video`, `create_article_video`, `create_spokesperson_video`, `create_video_from_script` |
| Plan | `estimate_video_cost`, `write_script`, `structure_text`, `fetch_article`, `generate_ideas`, `enhance_prompt` |
| Track and deliver | `get_video_status`, `list_my_videos`, `get_download_url`, `get_captions`, `create_share_link`, `export_video` |
| Edit | `update_video`, `generate_video`, `regenerate_scene`, `regenerate_voice`, `cancel_video`, `delete_video` |
| Characters, voices, music | `list_characters`, `create_character`, `generate_character_portraits`, `generate_voice_previews`, `list_voices`, `preview_voice`, `generate_music`, `list_music`, `list_templates` |
| Post to social | `list_social_accounts`, `get_connect_link`, `publish_video`, `get_publish_status`, `list_posts` |
| Account and automation | `whoami`, `get_credits`, `create_webhook`, `list_webhooks` |

Renders take minutes: the assistant creates the video, then polls `get_video_status` (it respects `poll_after_seconds`) and returns the download link.

### Posting to social accounts

`publish_video` posts a finished video to one or more connected accounts, now or at a scheduled time, with one caption or a caption per platform. Supported: TikTok, Instagram (as a Reel), YouTube (as a Short), Facebook (Pages only), LinkedIn, Threads, Pinterest, Bluesky, Telegram and Discord. X is not supported.

A person must connect each account once: `get_connect_link` returns a short-lived link that the user opens in a browser to approve access (the assistant cannot complete it). Bluesky, Telegram and Discord connect in the web app. Then `list_social_accounts` returns the account ids, `publish_video` posts, and `get_publish_status` returns the live post URLs.

Full reference: [makeaivideo.ai/docs/mcp](https://makeaivideo.ai/docs/mcp).

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `MAKEAIVIDEO_API_KEY` | (required) | Your `mav_` API key |
| `MAKEAIVIDEO_MCP_URL` | `https://mcp.makeaivideo.ai` | Override the remote endpoint |

## FAQ

**What is the MakeAIVideo MCP server?** A Model Context Protocol server that lets AI assistants create finished short-form AI videos with [MakeAIVideo](https://makeaivideo.ai).

**Does it cost anything?** MakeAIVideo is a paid product with a 7-day trial (card required). The MCP server has no separate charge: videos use credits from your MakeAIVideo plan, and `estimate_video_cost` quotes before anything is spent. See [pricing](https://makeaivideo.ai/pricing).

**Can it post to social media?** Yes. After you connect an account once, the assistant can post a finished video to TikTok, Instagram, YouTube, Facebook Pages, LinkedIn, Threads, Pinterest, Bluesky, Telegram or Discord, or schedule it. X is not supported.

**Which AI assistants work?** Anything that speaks MCP: Claude (web, desktop, Code), ChatGPT, Cursor, VS Code, Windsurf, Cline, Zed and more. See [AI agents](https://makeaivideo.ai/docs/agents).

**Is there a REST API too?** Yes: [API reference](https://makeaivideo.ai/docs/api) and the [TypeScript SDK](https://github.com/makeaivideo-ai/sdk).

## About MakeAIVideo

[MakeAIVideo](https://makeaivideo.ai) is an AI video generator that turns a brief, a prompt or your own script into a finished, captioned short-form video: script, AI voiceover, AI-generated or stock scenes, captions and music, exported as an MP4 ready for TikTok, Instagram Reels and YouTube Shorts.

- **Make videos in the app:** [prompt to video](https://makeaivideo.ai/prompt-to-video), [script to video](https://makeaivideo.ai/script-to-video), [image to video](https://makeaivideo.ai/image-to-video), [talking avatar](https://makeaivideo.ai/talking-avatar), [AI ad maker](https://makeaivideo.ai/ai-ad-maker), [blog to video](https://makeaivideo.ai/blog-to-video)
- **By format:** [TikTok video generator](https://makeaivideo.ai/tiktok-video-generator), [Instagram Reels generator](https://makeaivideo.ai/instagram-reels-generator), [AI Shorts generator](https://makeaivideo.ai/ai-shorts-generator), [faceless YouTube channel](https://makeaivideo.ai/faceless-youtube-channel), [AI UGC video](https://makeaivideo.ai/ai-ugc-video), [AI explainer video](https://makeaivideo.ai/ai-explainer-video), [AI spokesperson video](https://makeaivideo.ai/ai-spokesperson-video)
- **For developers:** [developer hub](https://makeaivideo.ai/developers), [API reference](https://makeaivideo.ai/docs/api), [quickstart](https://makeaivideo.ai/docs/quickstart), [authentication](https://makeaivideo.ai/docs/authentication), [webhooks](https://makeaivideo.ai/docs/webhooks), [MCP server](https://makeaivideo.ai/docs/mcp), [AI agents](https://makeaivideo.ai/docs/agents), [CLI](https://makeaivideo.ai/docs/cli)
- **Compare:** [MakeAIVideo vs HeyGen](https://makeaivideo.ai/compare/heygen), [MakeAIVideo vs Synthesia](https://makeaivideo.ai/compare/synthesia)
- [Pricing](https://makeaivideo.ai/pricing) · [Free creator tools](https://makeaivideo.ai/tools) · [Blog](https://makeaivideo.ai/blog) · [Help](https://makeaivideo.ai/help) · [Contact](https://makeaivideo.ai/contact)

## Links

- Website: [makeaivideo.ai](https://makeaivideo.ai)
- MCP setup guide: [makeaivideo.ai/docs/mcp](https://makeaivideo.ai/docs/mcp)
- Hosted MCP server: `https://mcp.makeaivideo.ai`
- Developer hub: [makeaivideo.ai/developers](https://makeaivideo.ai/developers)
- API reference: [makeaivideo.ai/docs/api](https://makeaivideo.ai/docs/api) · OpenAPI: [app.makeaivideo.ai/api/v1/openapi.json](https://app.makeaivideo.ai/api/v1/openapi.json)
- API keys: [app.makeaivideo.ai/developers](https://app.makeaivideo.ai/developers)
- npm: [@makeaivideo/mcp](https://www.npmjs.com/package/@makeaivideo/mcp) · [@makeaivideo/sdk](https://www.npmjs.com/package/@makeaivideo/sdk) · [@makeaivideo/cli](https://www.npmjs.com/package/@makeaivideo/cli)
- GitHub: [makeaivideo-ai/mcp](https://github.com/makeaivideo-ai/mcp) · [makeaivideo-ai/sdk](https://github.com/makeaivideo-ai/sdk) · [makeaivideo-ai/cli](https://github.com/makeaivideo-ai/cli)
- Support: support@makeaivideo.ai

## Related packages

| Package | What it is |
| --- | --- |
| [`@makeaivideo/sdk`](https://github.com/makeaivideo-ai/sdk) | TypeScript / JavaScript SDK for the REST API |
| [`@makeaivideo/mcp`](https://github.com/makeaivideo-ai/mcp) | MCP server for Claude, ChatGPT, Cursor and other AI assistants |
| [`@makeaivideo/cli`](https://github.com/makeaivideo-ai/cli) | Command line tool: brief in, MP4 out |

## License

MIT © [MakeAIVideo](https://makeaivideo.ai)
