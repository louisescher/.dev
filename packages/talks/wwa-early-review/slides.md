---
theme: default
title: An Early Review of Where We're At
favicon: /favicon.svg
colorSchema: auto
transition: fade
duration: 10min
fonts:
  sans: Geist
  mono: Geist Mono
  weights: '400,500,600,700,800'
layout: cover
---

# <span>An Early Review of</span> <span>Where We're</span> <span class="text-ember">At</span>

What the people building on ATproto told us

<span class="chip frosted tiny-mono">atproto.london / November 2026</span>

<!--
Hi everyone! My name is Lou, or Louis. You might know me from projects like Colibri Social (which is Discord on ATproto), or, from my most recent one: Where We're At! Which, coincidentally, is what I'm here to talk about.
-->

---
layout: section
---

# What is <span class="text-ember">Where We're At</span>?

A yearly* survey of the people who build, host, and run things on the AT Protocol.

<small style="color: var(--ink-dim);" v-click="3">*Soon to be</small>

<!--
Which, I guess, begs the question:
What even is [click] Where We're At?

[click] Well, it's a yearly survey of the people who build on ATproto, host services, and run things in general. [click] Yearly in the sense that this is actually the first time this is running, but I plan on doing it again next year.
-->

---
clickAnimation: up
---

# So how did it go?

Not bad for a first year!

<div class="stat-grid">
	<div class="card frosted" v-click="1">
    <span class="stat text-cyan">31 days</span>
    <span class="tiny-mono text-ink-dim">entire October</span>
  </div>
  <div class="card frosted" v-click="2">
    <span class="stat text-ember">252</span>
    <span class="tiny-mono text-ink-dim">responses</span>
  </div>
  <div class="card frosted" v-click="3">
    <span class="stat text-glow">20+</span>
    <span class="tiny-mono text-ink-dim">countries</span>
  </div>
  <div class="card frosted" v-click="4">
    <span class="stat text-fall">172</span>
    <span class="tiny-mono text-ink-dim">finished</span>
  </div>
</div>

<!--
So! Considering this was our first time doing the survey, how'd it go?
Well, I'd say, not bad!

[click] For context, this survey ran throughout October.

[click] We had 252 responses from people from over [click] 20 countries, with a total of [click] 172 people completely finishing the entire survey. Not exactly huge, but not small either!
-->

---
clickAnimation: up
---

# A good spread of experience

<p class="lede">How long have you been building on the AT Protocol?</p>

<div v-click>

<Bars :max="100" :items="[
  { label: 'Under 6 months', share: 21.4, tone: 'cyan' },
  { label: '6 to 12 months', share: 24.5, tone: 'dim' },
  { label: '1 to 2 years', share: 33.3, tone: 'dim' },
  { label: '2 to 3 years', share: 13.8, tone: 'dim' },
  { label: 'Over 3 years', share: 6.9, tone: 'ember' },
]" />

</div>

<!--
We also managed to capture a good spread of experience among participants. [click]

You can see we have a lot of new people, about 1/5th, but we also have some veterans coming in at over 3 years!
-->

---
clickAnimation: up
---

# Identity and hosting

<p class="lede">Who hosts your main Atmosphere Account?</p>

<div v-click>

<Bars :more="11" :items="[
  { label: 'bsky.social', share: 40.9, tone: 'cyan' },
  { label: 'Self-hosted', share: 27.5 },
  { label: 'Eurosky', share: 15.0, tone: 'glow' },
  { label: 'selfhosted.social', share: 4.5, tone: 'dim' },
  { label: 'Blacksky', share: 2.4, tone: 'dim' },
]" />

</div>

<div class="callout" v-click>
  <span class="text-ember">83.7%</span> use their own domain as a handle -> audience is mostly developers, or at least tech-savvy people.
</div>

<!--
So let's go through some of the interesting stuff this survey surfaced. I think it's interesting to take a look at the spread of PDS hosters first, as that is a good indicator for the type of people we're dealing with. 

[click] You can see that over 1/4th of respondents actually self-host their PDS! [click] We also have over 80% using their own domain as a handle, so we can be pretty sure the audience is at least tech-savvy.
-->

---
clickAnimation: up
---

# The Tranquil surprise

<p class="lede">Which PDS self-hosters run</p>

<div v-click>

<Bars :more="5" :max="100" :items="[
  { label: 'Reference PDS', share: 61.8, tone: 'dim' },
  { label: 'Tranquil PDS', share: 33.8 },
  { label: 'Cirrus', share: 4.4, tone: 'dim' },
]" />

</div>

<div class="callout" v-click>
  Roughly <span class="text-ember">a third</span> of self-hosters chose not to go with the reference implementation!
</div>

<!--
Going to the actually surprising stuff, [click] we have a surprising amount of Tranquil PDS users! [click] More than 33% of self-hosters actually chose not to go with the reference PDS, but used a different implementation instead, which is cool to see.
-->

---
clickAnimation: up
---

# DIDs and rotation keys

<div class="stat-grid">
  <div class="card frosted" v-click>
    <span class="stat text-glow">92.4%</span>
    <span class="stat-note">use did:plc.</span>
  </div>
  <div class="card frosted" v-click>
    <span class="stat text-fall">24%</span>
    <span class="stat-note">don't know what a rotation key is, or didn't know they could hold one</span>
  </div>
</div>

<div class="callout" v-click>
  Educating developers and non-developers on account ownership might be worth it in the long run.
</div>

<!--
We also asked people about their DIDs and rotation keys. [click] To nobody's surprise, over 90% of people use `did:plc`. What was surprising is that [click] almost 25% of users either don't know what a rotation key is, or didn't know they could hold one! [click] So a key takeaway here is that educating devs and users should be a priority.
-->

---
clickAnimation: up
---

# SDKs and languages

<p class="lede">TypeScript dominates the field</p>

<div v-click>

<Bars :more="26" :max="100" :items="[
  { label: 'TypeScript', share: 70.4, tone: 'cyan' },
  { label: 'JavaScript', share: 34.6, tone: 'glow' },
  { label: 'Rust', share: 32.4 },
  { label: 'Go', share: 27.9, tone: 'dim' },
  { label: 'Python', share: 25.7, tone: 'dim' },
]" />

</div>

<div class="callout" v-click>
  The official SDKs are written in TypeScript, so this isn't much of a surprise. But: more people prefer the atcute libraries!
</div>

<!--
Going over to the SDKs and programming languages people use, [click] I'm positively surprised by the use of Rust and Go and even Python here, but we can see that TypeScript easily dominates, followed by JavaScript, probably due to the official SDK being written in TypeScript. [click] Though I will note, most people using JavaScript or TypeScript actually prefer the `atcute` libraries!
-->

---
clickAnimation: up
---

# The frustrating parts

<p class="lede">No matter the language or library</p>

<div v-click>

<Bars :more="56" :items="[
  { label: 'OAuth', share: 16.1 },
  { label: 'Outdated docs', share: 16.1 },
  { label: 'Lexicon codegen', share: 12.5, tone: 'glow' },
  { label: 'AI-coded libraries', share: 5.4, tone: 'fall' },
]" />

</div>

<div class="callout" v-click>
  Several comments said <span class="text-fall">"AI slop"</span> seems to take precedence in the libraries people use.
</div>

<!--
While we're here, let's take a quick look at what people find is still hard, even when using a library. [click] I think it's unsurprising that most people struggle with OAuth and note outdated documentation as a key issue. We can also see that there's _lots_ of different issues, with 56 further things listed in the full stats. [click] I'll also note that several comments said that AI slop seem to take precedence in the libraries that they use.
-->

---
clickAnimation: up
---

# Infrastructure & tooling

<div class="stat-grid">
  <div class="card frosted" v-click>
    <span class="stat text-cyan">Constellation</span>
    <span class="stat-note">is the most used service for reading data from the network</span>
  </div>
  <div class="card frosted" v-click>
    <span class="stat text-glow">80</span>
    <span class="stat-note">people have used it, and it draws the most interest from those who haven't yet</span>
  </div>
</div>

<div class="callout" v-click>
  A big win for <span class="text-ember">community-run infrastructure</span>! Many people build static sites and don't want to write their own backend.
</div>

<!--
Over in the infrastructure and tooling land, [click] we have Constellation as the most used service for reading data from the network, which is very cool to see. [click] Over 80 people have used it, and most people who had not used also noted that they were interested in checking it out. [click] I'd say that's a big win for community-run infrastructure! A lot of people actually noted that they build static sites, and writing a backend is tedious, so they rely on Constellation and co. for the data.
-->

---
clickAnimation: up
---

# Where apps run

<p class="lede">A win for the homelab enthusiasts</p>

<div v-click>

<Bars :more="30" :max="100" :items="[
  { label: 'Own hardware', share: 58.8, tone: 'rise' },
  { label: 'Cloudflare', share: 24.8, tone: 'glow' },
  { label: 'Hetzner', share: 13.3, tone: 'dim' },
  { label: 'Vercel', share: 10.9, tone: 'dim' },
  { label: 'Railway', share: 10.9, tone: 'dim' },
]" />

</div>

<div class="callout" v-click>
  More than <span class="text-ember">double</span> what Cloudflare was able to achieve. Talk about decentralization.
</div>

<!--
And there's another win for infrastructure people, which is where apps are actually running: [click] We can see that almost 60% actually run their apps on their own hardware! [click] That's more than double what Cloudflare was able to get. Decentralization for the win!
-->

---
clickAnimation: up
---

# Building on the protocol

<p class="lede">To nobody's surprise: OAuth</p>

<div v-click>

<Bars :more="37" :items="[
  { label: 'OAuth complexity', share: 21.4 },
  { label: 'Lacking docs', share: 17.9, tone: 'glow' },
  { label: 'DPoP', share: 16.1, tone: 'glow' },
  { label: 'Local dev friction', share: 16.1, tone: 'cyan' },
]" />

</div>

<div class="callout" v-click>
  A lot is left to be desired on developer experience!
</div>

<!--
When we asked people what they had issue with while building in general, we actually wrapped back around to OAuth. To nobody's surprise. 

[click] OAuth complexity, lacking docs and DPoP were the three most annoying things for people, with local development friction coming in fourth.

[click] The main lesson here, in my opinion, is that the developer experience really needs to improve, so we get more people building stuff.
-->

---
clickAnimation: up
---

# The hardest part right now

<div v-click>

<Bars :more="42" :items="[
  { label: 'User acquisition', share: 25.3 },
  { label: 'Funding', share: 18.1, tone: 'glow' },
  { label: 'User education', share: 16.9, tone: 'cyan' },
  { label: 'Private data', share: 13.3, tone: 'dim' },
]" />

</div>

<div class="callout" v-click>
  User acquisition probably ties in with the missing user education, which came in third.
</div>

<!--
We also asked people what was hardest about building on ATproto right now. 

[click] Turns out, that's actually user acquisition! This is followed in fourth by private data, with user education in third. 

[click] I suspect the first and third points are actually related, since people might not know that they have an Atmosphere account, which isn't tied to a single app.
-->

---
clickAnimation: up
---

# Who keeps the Atmosphere going

<div class="stat-grid">
  <div class="card frosted" v-click>
    <span class="stat text-glow">6.7%</span>
    <span class="stat-note">earn money from their app, so the real spread of monetary success isn't clear yet</span>
  </div>
  <div class="card frosted" v-click>
    <span class="stat text-ember">93.4%</span>
    <span class="stat-note">fund their ATproto projects themselves</span>
  </div>
</div>

<div class="callout" v-click>
  People have noted that this could lead to burnout quickly!
</div>

<!--
So let's touch on #2, Funding, a bit more.

[click] At the moment, only 6.7% of respondents actually earn money from their app at the moment, which is not even enough to make statements about monetary success of ATproto apps. 

[click] Perhaps more worrying is that this means that 93.4% of builders and their projects are currently self-funded, which isn't really sustainable!

[click] A few people have pointed out that this can easily lead to burnout, so we should probably figure out some funding models sooner rather than later.
-->

---
clickAnimation: up
---

# What people want built

<p class="lede">The apps section got cut, but this question stays</p>

<div v-click>

<Bars more="+ 70 more (!)" :items="[
  { label: 'Reddit', share: 8.9 },
  { label: 'Marketplace', share: 5.4, tone: 'glow' },
  { label: 'B2B apps', share: 3.6, tone: 'cyan' },
  { label: 'Google Docs', share: 3.6, tone: 'cyan' },
  { label: 'Image hosting', share: 3.6, tone: 'cyan' },
]" />

</div>

<div class="callout" v-click>
  Looking for something to build? Start here!
</div>

<!--
I'd say that's enough doom and gloom. Maybe you have an idea for what to build and monetize! The good thing is, now there's a list of apps people want to see.

[click] A Reddit alternative is the most requested app, with a marketplace in second. After that come B2B apps, then Google Docs, Image hosting, and lots, lots more. 70 more, in fact!

[click] So, if you're looking for something to do this weekend, maybe take a look at this list and talk to some people!
-->

---
clickAnimation: up
---

# Where does that leave us?

<p class="lede">The main takeaways for me:</p>

<v-clicks>

- **Education** will be key, for devs and users alike
- The **developer experience** has to improve
- **Funding** needs to be a bigger part of the discussion

</v-clicks>

<!--
Okay. This was a lot of information in a very small time-span. So let's talk about where this actually leaves us. For me, there's a few main takeaways:

- [click] Education will be key, for both developers and users. We need to make sure people know what the Atmosphere is, and what they can do within it
- [click] I also think that the developer experience needs to improve massively. Not to pull out the one Steve Ballmer clip where he shouts developers 50 times.
- [click] And last but very much not least, we need to have a discussion about funding, before the entire Atmosphere has a collective burnout!
-->

---
layout: section
---

# See you <span class="text-ember">next year</span>

Around July or August at the earliest, this time with a survey for non-builders

<!--
[click] So, that's it for 2026! I hope to see all of you next year for a second round of this survey. [click] I'm currently aiming for summer, around July or August. And, I'm also planning a survey for non-builders, which might be around the same time!
-->

---
layout: end
---

# Thanks!

Read the full results at <span class="text-cyan">2026.where-were.at</span> <br> and follow the survey on Bluesky <span class="text-glow">@where-were.at</span>

<span class="chip frosted tiny-mono">My Bluesky: <span class="text-ember">@lou.gg</span></span>
&nbsp;
<span class="chip frosted tiny-mono">This talk: <span class="text-ember">lou.gg/talks</span></span>

<!--
Which brings us to the end of this presentation. Thanks for listening! I hope this was somewhat interesting. If you wanna learn more or check out the data yourself, you can head to the URL shown in Cyan here. This includes a full written report, the visualized data, and a dataset export that you can play around with!
-->
