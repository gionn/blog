---
layout: post
title: "I got tired of WhatsApp polls, so I built a replacement"
permalink: /2026/hive-polls/
image: /images/2026/hive-polls-hero.png
tags:
  - nextjs
  - cloudflare
  - sideproject
---

WhatsApp polls seem useful until you actually use them for anything real.

Try to have a group of people of different ages and digital world capabilities
coordinate on something with time constraints:

- The poll gets **buried under a flood of messages** within hours.
- You **can't add options** after sending it.
- There's no way to see who hasn't voted yet without manually checking.
- If the group is active, the poll is **gone from view** before half the people have even seen it.
- If you need **more than four options**, you're out of luck.

I kept running into this with my historical reenactment group, [Mercenari del labirinto](https://mercenari.org). How many people are coming to the next event? What day works best for a pizza together? Who's bringing food to share at a member's place? Every one of these turns into an **endless wave of messages**, people asking what the options were, others pinging individually because they missed the poll entirely.

So I built [Hive Polls](https://hive.gionn.net).

It's a small focused tool: create a poll, share a link, everyone votes. The link is **permanent**. It doesn't get buried anywhere. **Anyone can add options** after the poll is created. And there are three modes:

- **Multiple answers** for open questions
- **Single answer** for head-to-head decisions
- **Shared list** for things like group dinners, where everyone adds what they'll bring rather than voting

**No account needed**. Pick a display name, done. Nobody wants to create and manage yet another account just to vote on a dinner date, and in a group like mine some people don't even have a Google account. For small groups where everyone knows each other, there's enough social trust that impersonation simply isn't a real concern.

On the technical side, I wanted **zero infrastructure** to manage. The stack is **Next.js** deployed on **Cloudflare Pages** via [OpenNext](https://opennext.js.org/), with **Cloudflare D1** as the database (SQLite at the edge). The whole thing runs as a Worker: no servers, no containers, no ops. Getting started was straightforward: I used the [OpenNext starter project](https://opennext.js.org/cloudflare#get-started) and pointed **Claude Code** at it, and most of the app came together from there. D1 is genuinely pleasant to work with for something at this scale.

It's early and deliberately simple. If you've ever fought with a WhatsApp poll, [give it a try](https://hive.gionn.net).
