---
# try also 'default' to start simple
theme: astro
favicon: '/favicon.svg'
title: Astro's new Carapace
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade
# enable Comark Syntax: https://comark.dev/syntax/markdown
comark: true
# duration of the presentation
duration: 20min
layout: intro
clickAnimation: up
---

<style>
	.banner {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		object-fit: cover;
		width: 100%;
		opacity: 25%;
		filter: hue-rotate(90deg);
	}

	.ferris, .houston {
		width: 10%;
		position: absolute;
		bottom: 10%;
		right: 10%;
		transform: rotate(15deg);
	}

	.houston {
		right: unset;
		left: 10%;
		transform: rotate(-15deg);
	}
</style>

# Astro's new <span class="text-gradient">Carapace</span>

A look at Astro's new Rust-based compiler

<img class="banner" alt="Astro 7.0 release banner" src="/blurs.png">
<img class="ferris" alt="Ferris" src="/rustacean-orig-noshadow.png">
<img class="houston" alt="Houston" src="/houston_construction.png">

<!--
Welcome! It's me. Again.
If you've ever used Astro, you've probably written a .astro file. If you haven't: How?
Sometimes, you might've wondered how Astro gets from the various .astro files to the eventual HTML output the browsers receive. The reason for that is the Astro Compiler, which recently got re-written as part of Astro 7! So today, we're gonna be taking a look at how the compiler works, and why we chose to re-write it in Rust instead of keeping the Go version around.
-->

---

# What even is Astro?

Is it...

<v-clicks>

- ... a static site generator (SSG)?
- ... a server-side renderer (SSR)?
- ... a web-framework?
- ... a meta-framework?
- ... a "framework for content-driven websites"?
- ... something else?

</v-clicks>


<img v-click.fade.hide="7" class="houston mildpanic" alt="Houston Mild Panic" src="/houston_mildpanic.png">
<img v-click.show="7" class="houston wink" alt="Houston Wink" src="/houston_wink.png">

<br>

<h2 v-click="7"><solar-arrow-right-linear /> It's all of that!</h2>
	
<style>
	.houston {
		width: 15%;
		position: absolute;
		bottom: 20%;
		right: 20%;
	}
</style>

---
layout: two-cols
---

# What even is Astro?
<br>
We turn this:

<div v-click="1" style="position: relative; width: calc(100% - 4rem); top: 1rem; height: 21rem; border: 1px solid #262626;" class="rounded-2xl">
	<img v-click="1" style="transition-delay: 200ms;" class="svg astro" alt="Astro" src="/astro.svg">
	<img v-click="1" style="transition-delay: 400ms;" class="svg markdown" alt="Markdown" src="/markdown.svg">
	<img v-click="1" style="transition-delay: 600ms;" class="svg mdx" alt="MDX" src="/mdx.svg">
	<img v-click="1" style="transition-delay: 800ms;" class="svg preact" alt="Preact" src="/preact.svg">
	<img v-click="1" style="transition-delay: 1000ms;" class="svg react" alt="React" src="/react.svg">
	<img v-click="1" style="transition-delay: 1200ms;" class="svg solid" alt="SolidJS" src="/solidjs.svg">
	<img v-click="1" style="transition-delay: 1400ms;" class="svg svelte" alt="Svelte" src="/svelte.svg">
	<img v-click="1" style="transition-delay: 1600ms;" class="svg vue" alt="Vue" src="/vue.svg">
</div>

<style>
	.svg {
		width: 13%;
		height: auto;
		position: absolute;
	}

	.astro {
		top: 5%;
		left: 5%;
		transform: rotate(-15deg);
	}

	.markdown {
		top: 9%;
		left: 42%;
		transform: rotate(7deg);
	}

	.mdx {
		top: 4%;
		left: 78%;
		transform: rotate(9deg);
	}

	.preact {
		top: 40%;
		left: 23%;
		transform: rotate(-6deg);
	}

	.react {
		top: 43%;
		left: 60%;
		transform: rotate(16deg);
	}

	.solid {
		top: 75%;
		left: 5%;
		transform: rotate(-10deg);
	}

	.svelte {
		top: 78%;
		left: 42%;
		transform: rotate(19deg);
	}

	.vue {
		top: 74%;
		left: 78%;
		transform: rotate(-4deg);
	}

	.html, .css, .js {
		position: relative;
		width: 20%;
	}
</style>

::right::

# ‎ 
<br>

<span v-click="2">Into this!</span>

<div v-click="2" style="position: relative; width: 100%; height: 22rem; display: flex; align-items: center; justify-content: center; transition-delay: 250ms;">
	<div class="flex flex-row items-center rounded-2xl justify-center" style="gap: 10%; position: relative; bottom: 5%; border: 1px solid #262626; width: fit-content; padding: 1rem;">
		<img v-click="2" class="svg html" style="transition-delay: 500ms;" alt="HTML" src="/html.svg">
		<img v-click="2" class="svg js" style="transition-delay: 650ms;" alt="JavaScript" src="/js.svg">
		<img v-click="2" class="svg css" style="transition-delay: 800ms;" alt="CSS" src="/css.svg">
	</div>
</div>

---

# How _do_ we do that?

You may have noticed:

<img v-click="[1, 4]" class="svg react" alt="React" src="/react.svg">

<span v-click="[2, 4]" class="text-gradient">≠</span>

<div class="web" v-click.hide="4">
	<img v-click="3" style="transition-delay: 100ms;" class="svg html" alt="HTML" src="/html.svg">
	<img v-click="3" style="transition-delay: 200ms;" class="svg js" alt="JavaScript" src="/js.svg">
	<img v-click="3" style="transition-delay: 300ms;" class="svg css" alt="CSS" src="/css.svg">
</div>

<style>
	.svg {
		width: 25%;
		position: absolute;
	}

	.text-gradient {
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-60%, -50%) scale(500%);
	}

	.react {
		top: 50%;
		left: 25%;
		transform: translate(-50%, -25%);
	}

	.web {
		top: 75%;
		left: 85%;
		transform: translate(-75%, -85%);
		position: absolute;
		width: 25%;
		aspect-ratio: 1;
	}

	.web .svg {
		width: 75%;
		max-height: 75%;
		position: absolute;
	}

	.html {
		top: -10%;
		left: -30%;
		transform: rotate(-5deg);
	}
	
	.js {
		top: -10%;
		left: 40%;
		transform: rotate(5deg);
	}

	.css {
		top: 30%;
		width: 60%;
	}
</style>

---
clickAnimation: fade
---

# How _do_ we do that?

The $1M question:

<img v-click.hide="1" alt="Who's that Pokémon?" src="/whos-that-pokemon.png" class="pokemon">
<img v-click.show="1" alt="It's the compiler!" src="/whos-that-pokemon-reveal.png" class="pokemon compiler">

<style>
	img {
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -60%);
	}
</style>

---

# What the compiler does

We have a couple steps here!

<v-clicks>

1. Parse tokens into an AST (and fix invalid HTML tags)
2. Walk the tree, annotate with bits of info, handle whitespace
3. Grab imports, prep variables
4. Put frontmatter into component body
5. Create the template
6. Interpolate expressions
7. Sprinkle in Islands
8. Request for some juicy HTML, CSS and JS!

</v-clicks>

<img alt="Houston Construction" class="houston" src="/houston_construction.png" />

<style>
	.houston {
		position: absolute;
		width: 15%;
		bottom: 10%;
		right: 10%;
		transform: rotate(15deg);
		z-index: 50;
	}
</style>

---
clickAnimation: none
---

# What the compiler does

<div class="caption">
	<span v-click.hide="3">Let's imagine:</span>
	<span v-click="[3, 4]"><b>Parse</b>: turn all the tokens into an AST (and fix invalid HTML tags)</span>
	<span v-click="[4, 5]"><b>Transform</b>: walk that tree, annotate it with special bits of info, handle whitespace</span>
	<span v-click="[5, 6]"><b>Print</b>: grab the imports, prep some variables</span>
	<span v-click="[6, 7]"><b>Print</b>: rest of the frontmatter becomes component body</span>
	<span v-click="[7, 8]"><b>Print</b>: markup becomes a tagged template</span>
	<span v-click="[8, 9]"><b>Print</b>: expressions get interpolated</span>
	<span v-click="[9, 10]"><b>Print</b>: the island gets turned into a <code>renderComponent</code> call</span>
	<span v-click="[10, 11]"><b>Print</b>: import runtime helpers</span>
	<span v-click="11">Finally, at request time: HTML and JS!</span>
</div>

<img alt="Houston Detective" class="houston" src="/houston_detective.png" v-click.up="12" />

<style>
	.houston {
		position: absolute;
		width: 15%;
		bottom: 10%;
		right: 10%;
		transform: rotate(15deg);
		z-index: 50;
	}
</style>
	
````md magic-move {lines: true}
```astro {all|2,8|4,7}
---
import AwesomeReactComponent from "../components/awesome.tsx";

const happy = true;
---

<p>{happy ? "We're happy!" : "Not today apparently"}</p>
<AwesomeReactComponent client:load />
```
```json
{
	"type": "root",
	"children": [
		{ "type": "frontmatter", "value": "import AwesomeReactComponent ...\nconst happy = true;" },
		{
			"type": "element",
			"name": "p",
			"children": [
				{ "type": "expression", "children": [{ "type": "text", "value": "happy ? ..." }] }
			]
		},
		{
			"type": "component",
			"name": "AwesomeReactComponent",
			"attributes": [
				{ "kind": "empty", "name": "client:load" }
			]
		}
	]
}
```
```json {17-19}
{
	"type": "root",
	"children": [
		{ "type": "frontmatter", "value": "import AwesomeReactComponent ...\nconst happy = true;" },
		{
			"type": "element",
			"name": "p",
			"children": [
				{ "type": "expression", "children": [{ "type": "text", "value": "happy ? ..." }] }
			]
		},
		{
			"type": "component",
			"name": "AwesomeReactComponent",
			"attributes": [
				{ "kind": "empty", "name": "client:load" },
				{ "kind": "quoted", "name": "client:component-hydration", "value": "load" },
				{ "kind": "quoted", "name": "client:component-path", "value": "/src/components/awesome.tsx" },
				{ "kind": "quoted", "name": "client:component-export", "value": "default" }
			]
		}
	]
}
```
```js {1,4|3,6,7,8}
import AwesomeReactComponent from "../components/awesome.tsx";

const $$Index = $$createComponent(($$result, $$props, $$slots) => {
	const happy = true;

	return $$render``;
}, "/src/pages/index.astro", undefined);
export default $$Index;
```
```js {6}
import AwesomeReactComponent from "../components/awesome.tsx";

const $$Index = $$createComponent(($$result, $$props, $$slots) => {
	const happy = true;

	return $$render`${$$maybeRenderHead($$result)}`;
}, "/src/pages/index.astro", undefined);
export default $$Index;
```
```js {6}
import AwesomeReactComponent from "../components/awesome.tsx";

const $$Index = $$createComponent(($$result, $$props, $$slots) => {
	const happy = true;

	return $$render`${$$maybeRenderHead($$result)}<p>${happy ? "We're happy!" : "Not today apparently"}</p>`;
}, "/src/pages/index.astro", undefined);
export default $$Index;
```
```js {7-12}
import AwesomeReactComponent from "../components/awesome.tsx";

const $$Index = $$createComponent(($$result, $$props, $$slots) => {
	const happy = true;

	return $$render`${$$maybeRenderHead($$result)}<p>${happy ? "We're happy!" : "Not today apparently"}</p>
		${$$renderComponent($$result, "AwesomeReactComponent", AwesomeReactComponent, {
			"client:load": true,
			"client:component-hydration": "load",
			"client:component-path": "/src/components/awesome.tsx",
			"client:component-export": "default"
		})}`;
}, "/src/pages/index.astro", undefined);
export default $$Index;
```
```js {1-6}
import {
	render as $$render,
	createComponent as $$createComponent,
	renderComponent as $$renderComponent,
	maybeRenderHead as $$maybeRenderHead
} from "astro/compiler-runtime";
import AwesomeReactComponent from "../components/awesome.tsx";

const $$Index = $$createComponent(($$result, $$props, $$slots) => {
	const happy = true;

	return $$render`${$$maybeRenderHead($$result)}<p>${happy ? "We're happy!" : "Not today apparently"}</p>
		${$$renderComponent($$result, "AwesomeReactComponent", AwesomeReactComponent, {
			"client:load": true,
			"client:component-hydration": "load",
			"client:component-path": "/src/components/awesome.tsx",
			"client:component-export": "default"
		})}`;
}, "/src/pages/index.astro", undefined);
export default $$Index;
```
```html
<p>We're happy!</p>
<astro-island
	uid="Z1dGqhE"
	component-url="/_astro/awesome.CvSmZ0kr.js"
	component-export="default"
	renderer-url="/_astro/client.DPPEcXAd.js"
	props="{}"
	ssr
	client="load"
	opts="{&quot;name&quot;:&quot;AwesomeReactComponent&quot;,&quot;value&quot;:true}"
>
	<h2>I'm awesome!</h2>
</astro-island>
```
````

<style>
	.caption {
		position: relative;
		height: 2.5rem;
		font-size: 0.85rem;
		opacity: 0.8;
	}

	.caption span {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}

	.slidev-layout pre,
	.shiki-magic-move-container code {
		font-size: 0.62rem !important;
		line-height: 1.45 !important;
	}
</style>

---

# All this worked already?

None of this is new, it's been around since Astro v0?

<img class="houston" alt="Houston shocked" src="/houston_shocked.png">

<style>
	img {
		height: 40%;
		position: absolute;
		left: 50%;
		top: 70%;
		transform: translate(-50%, -70%);
	}
</style>
	
---

# ... except it didn't.

Lots of bugs, maintainability problems, concerns over speed...

<v-clicks style="margin-top: 2rem;">

- Styles & Script-Ordering was messed up
- None of the maintainers liked Go a lot
- At the end, over 85 issues racked up
- Ecosystem was slowly moving to Rust (OXC, LightningCSS)

</v-clicks>

<img v-click="5" class="houston" alt="Houston crying" src="/houston_cry.png">

<style>
	.houston {
		position: absolute;
		width: 15%;
		bottom: 10%;
		left: 10%;
		transform: rotate(-15deg);
		z-index: 50;
	}
</style>

---

# So we did Rust!

It do be magic. Here's some benefits:

<v-clicks style="margin-top: 2rem;">

- Immediately got to close 85 issues after the rewrite
- No more magic HTML correction
- Better JSX-style strictness, better errors
- Whitespace handling closer to JSX
- Native binaries for most platforms

</v-clicks>

<style>
	.ferris, .houston {
		width: 15%;
		position: absolute;
		bottom: 10%;
		left: 10%;
		transform: rotate(-15deg);
	}

	.houston {
		left: unset;
		right: 10%;
		transform: rotate(15deg);
	}
</style>

<img class="ferris" alt="Ferris" src="/rustacean-orig-noshadow.png">
<img class="houston" alt="Houston" src="/houston_construction.png">

---

# So, it's fast now, right?

Well... kind of!

- Native binaries, of course
- No more passing JSON between processes, no more (de-) serializing it
- Don't have to deal with Go's garbage collector anymore
- OXC and LightningCSS, both in-process
- All this makes it **~6% faster on average**

So wait, is Rust _not_ fast?

---
clickAnimation: up
---

# But, combine that with the rest of Astro 7:

<v-clicks style="margin-top: 2rem; margin-bottom: 2rem;">

- 15% to 61% faster bundling
- Vite 8 being Rust-based with Rolldown
- Rust-based Markdown and MDX parsing with Sätteri

</v-clicks>

<span v-click="4">
	... and suddenly, you've got Astro sites that build ridiculously fast!
</span>

<span v-click="5">Turns out parsing `.astro` is just fast already.</span>

<style>
	.ferris, .houston {
		width: 15%;
		position: absolute;
		bottom: 10%;
		right: 10%;
		transform: rotate(15deg);
	}

	.houston {
		right: unset;
		left: 10%;
		transform: rotate(-15deg);
	}
</style>

<img class="ferris" alt="Ferris" src="/ferris-happy.png">
<img class="houston" alt="Houston" src="/houston_party.png">

---
clickAnimation: up
---

# _NOW_ we're fast.

With our forces combined...

<img v-click="1" class="img-1" src="/discord-stats.png">
<img v-click="2" class="img-2" src="/tweet.png">
<img v-click="3" class="img-3" src="/starwind-pro.png">
<div v-click="4" class="container">
	<img class="img-4" src="/old-deployment.png">
	<img class="img-5" src="/new-deployment.png">
</div>

<style>
	img:not(.container > img) {
		position: absolute;
		border-radius: 1.25rem;
		outline: 1px solid rgba(255, 255, 255, 0.08);
		outline-offset: -1px;
		z-index: 2;
	}

	img:not(.container > img):has(+img:not(img.slidev-vclick-hidden)) {
		filter: brightness(25%);
	}

	.img-1 {
		height: 65%;
	}
	
	.img-2 {
		height: 65%;
		right: 5%;
		top: 15%;
	}
	
	.img-3 {
		height: 65%;
		bottom: 5%;
		left: 25%;
	}
	
	.img-4 {
		height: 65%;
	}
	
	.img-5 {
		height: 65%;
	}

	.container {
		overflow: hidden;
		width: 50%;
		position: absolute;
		z-index: 50;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 1.25rem;
	}

	.container img {
		z-index: 50;
		position: relative;
	}
	
	.container img:first-of-type {
		outline: 1px solid rgba(255, 255, 255, 0.08);
		outline-offset: -1px;
		border-top-left-radius: 1.25rem;
		border-top-right-radius: 1.25rem;
	}
	
	.container img:last-of-type {
		outline: 1px solid rgba(255, 255, 255, 0.08);
		outline-offset: -1px;
		border-bottom-left-radius: 1.25rem;
		border-bottom-right-radius: 1.25rem;
		position: relative;
		bottom: 1px;
	}
</style>

---
clickAnimation: up
---

# Well damn, that's pretty neat.

<span v-click="1">Shout-out Erika!</span>

<img v-click="2" src="/princesseuh-card.svg" alt="Erika Card" class="erika-card">

<style>
	.erika-card {
		width: 65%;
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translate(-50%, -70%);
		border-radius: 1rem;
		outline: 1px solid gray;
		outline-offset: -1px;
	}
</style>

---

# Thx for listening <3

<span v-click="1">Go check out [play.astro.build](https://play.astro.build):</span>


<img v-click="2" src="/playground.png" alt="Playground" class="playground">

<style>
	.playground {
		width: 75%;
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translate(-50%, -70%);
		border-radius: 1rem;
		outline: 1px solid rgba(255, 255, 255, 0.08);
		outline-offset: -1px;
	}
</style>
