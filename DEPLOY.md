# Deploying consultant-pipeline-tool

This repo now has two working versions of the engine:

- **Inside Claude.ai** — use the `intake-engine.html` I send you directly in chat.
  Storage and Auto-Fill work automatically there; nothing in this repo is needed.
- **This repo (`index.html` + `api/claude.js`)** — a standalone version meant to be
  deployed on **Vercel** so it has a real URL you can open outside of Claude.

## Why Vercel and not GitHub Pages
GitHub Pages only serves static files — it can't run the serverless function that
keeps your Anthropic API key private. Vercel can, and your other projects
(archer-memorial-ame-zion, ai-and-i-brand, etc.) are already on Vercel, so this
matches your existing setup.

## Steps

1. **Push this repo as-is** — `index.html` and `api/claude.js` are both ready to go.
2. **Import the repo into Vercel** — vercel.com → Add New Project → pick this repo.
   No build settings needed; it's a static `index.html` plus one API route.
3. **Get an Anthropic API key** — console.anthropic.com → Settings → API Keys →
   Create Key. This is separate from your Claude.ai chat login.
4. **Add the key to Vercel** — Project → Settings → Environment Variables →
   `ANTHROPIC_API_KEY` = (your key) → apply to Production and Preview → redeploy.
5. **Open the deployed URL** — the holding bin and your Consultant Profile now save
   to that browser's localStorage (per-device, not synced across computers).
   Auto-Fill calls your own key through `/api/claude` instead of Claude.ai's
   proxy — it costs a small amount per call on your Anthropic account.

## What's different from the Claude.ai version
| | Claude.ai preview | This deployed version |
|---|---|---|
| Holding bin / profile storage | Claude's artifact storage | Browser localStorage (per device) |
| Auto-Fill AI calls | Free, via Claude.ai | Billed to your own Anthropic API key |
| URL | Only inside this chat | Real URL, bookmark it, share it |

If you ever want the bin/profile to sync across your phone and laptop instead of
being per-device, that needs a real database (e.g. Vercel KV or Supabase) — say
the word and I'll wire that in next.
