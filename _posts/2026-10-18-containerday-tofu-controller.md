---
layout: post
title: Running existing Terraform inside Kubernetes GitOps
permalink: /2026/containerday-tofu-controller/
image: /images/2026/containerday-tofu.jpg
tags:
  - conferences
  - containerday
  - kubernetes
  - gitops
  - terraform
categories:
  - Slides
---

I was in Bologna for [ContainerDay](https://www.containerday.it) with a lightning
talk on **tofu-controller**. Thanks to GrUSP for having me, and to everyone who
spent fifteen minutes after their lunch break on Terraform.

![The ContainerDay 2026 stage in Bologna, with the GrUSP banners behind it](/images/2026/containerday-tofu.jpg)

The framing of the talk is a gap most platform teams know well. Applications are
reconciled by a loop: push to Git, the controller applies it, drift gets fixed
without anyone typing. Infrastructure still goes through a plan pipeline, a
human review, and an apply pipeline. There is nothing wrong with that pipeline
on its own, but it means apps and infra live in **two separate loops**, and only
one of them closes by itself.

The argument I made is **don't rewrite, run it**. tofu-controller is a Flux
controller that executes your existing Terraform or OpenTofu from a
`GitRepository` source in a runner pod, driven by a `Terraform` custom resource.
Adopting it does not require migrating to Crossplane or re-expressing the
platform as CRDs. The code your team already maintains stays where it is.

What the fifteen minutes covered:

- The `Terraform` resource pointing at an existing root module through `path`
  and `sourceRef`.
- Outputs written to a Secret with `writeOutputsToSecret`, then read by a
  Deployment with `secretKeyRef`. No glue scripts between the two layers.
- A single dependency graph for stacks and apps: `dependsOn` between Terraform
  resources, and a Kustomization waiting for a stack to finish.
- The approval gate moved into Git: `storeReadablePlan: human` and `approvePlan`
  bound to a plan name that carries the commit SHA, so what gets reviewed is
  exactly what gets applied.

It's not all unicorns and fairies: Terraform state is still required, cloud
credentials live in the cluster, debugging means reading pod logs, drift
detection gets expensive on big stacks, and the API is still alpha and community
maintained.

Slides are on [SpeakerDeck](https://speakerdeck.com/gionn/tofu-controller-lightning-talk-at-containerday-2026),
the source is in [gionn/tofu-controller-lightning-talk](https://github.com/gionn/tofu-controller-lightning-talk),
and the project docs are at [flux-iac.github.io/tofu-controller](https://flux-iac.github.io/tofu-controller).

<script defer class="speakerdeck-embed" data-id="fb6818b4ff0647b5b94d61ebf35f1968" data-ratio="1.7753623188405796" src="//speakerdeck.com/assets/embed.js"></script>
