---
layout: post
title: "DeepSeek on OpenRouter: a cost reality check against frontier models"
permalink: /2026/deepseek-openrouter-cost/
image: /images/2026/deepseek-openrouter-cost.png
excerpt: |
    <p>Real session data from OpenRouter shows DeepSeek API calls landing between $0.0017 and $0.064, a fraction of what Claude and OpenAI charge. The pricing gap changes what you can afford to build.</p>
tags:
  - ai
---

If you have been running API calls through [OpenRouter](https://openrouter.ai),
the pricing data tells a stark story. **DeepSeek V4 Flash 0731** is processing
requests at a fraction of what Claude and OpenAI charge for comparable tasks.

Real session data from OpenRouter shows individual API calls to DeepSeek landing
between **$0.0017 and $0.064**. Still interesting numbers for a few
short-lived sessions on a pet Python project ([cucinacast](https://github.com/gionn/cucinacast)).

![DeepSeek pricing on OpenRouter](/images/2026/deepseek-openrouter-cost.png)

For context, Claude Sonnet 5 costs $2 per 1M input tokens and $10 per 1M output
tokens. GPT-5.6 Sol runs at the same $2 input and $10 output. At list prices the
same sessions would have cost 30 to 55 times more, so between roughly **$0.05 and
$3.50 per call** instead of the observed $0.0017 to $0.064. The only model big
enough for real work that sits in DeepSeek territory is OpenAI's open-weights
`gpt-oss-120b`, out since August 2025, at $0.037 per 1M input tokens and $0.17
per 1M output.

The catch is stability. Claude and OpenAI's frontier models handle edge cases,
context window management, and reasoning tasks with proven consistency. DeepSeek
Flash is a competitive alternative, not a perfect replacement. For
straightforward text generation, code completion, and API workloads where you
are optimizing costs, DeepSeek removes pricing as a barrier to scale.

If your use case does not require the safety overhead and consistency guarantees
of frontier models, this pricing changes the economics of AI infrastructure. You
can deploy more aggressively, experiment wider, and fold inference costs into
what used to be negligible line items.

DeepSeek will not match Claude Sonnet 5 or GPT-5.6 on capability, and it does
not need to. What decides the choice is your workload: for text generation, code
completion, and bulk API processing, the pricing gap matters more than the
benchmark gap.

The real question is where we will be in 6 to 12 months. DeepSeek keeps catching
up eventually, while investors keep pouring money into Anthropic and OpenAI. If
history is any guide, the capability gap narrows faster than the price gap, and
the longer that holds, the harder it gets to justify the premium.
