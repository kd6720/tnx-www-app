---
title: "What Actually Happens When a Carrier Sends a Disconnection Notice"
date: "2026-08-15"
category: "Telecom Modernization"
description: "A carrier disconnection notice starts a 45-day clock. Here's the week-by-week plan to migrate without an outage, a compliance gap, or a panic buy."
author: "Carter Dewey"
readTime: "6 min read"
image: "/blog-images/carrier-disconnection-notice-2026.png"
---

The letter lands on your desk: "This is to inform you that your service will be disconnected effective…" The date is 45 days out. It's not a typo, and it's not negotiable. The clock is running, and the decisions you make in the next two weeks determine whether this becomes a smooth migration or a five-alarm fire drill.

Here's what to actually do with those 45 days.

## The Timeline Is Shorter Than It Looks

Carriers are required to give notice, but the windows keep shrinking. We're seeing 45-day notices on copper POTS retirement and 60 days on legacy T1 circuits. That sounds like plenty of time — until you do the math.

You need to inventory every device on the circuit, get competitive quotes, choose a vendor, schedule installation, coordinate across sites, test, and cut over. Two of those weeks disappear into procurement alone. Another week into scheduling. Suddenly "45 days" is closer to two weeks of real runway, and every day you delay shrinks it further.

## Week 1: Find Out What's Actually on the Line

This is where most teams lose. They assume they know what's connected, and they're wrong. A single legacy copper circuit can quietly be feeding:

- The fire alarm communicator
- The elevator emergency phone
- Security and access control panels
- A fax machine that HR swears they decommissioned three years ago
- A backup line for the phone system

Walk the building. Open the closets. Trace the demarc. Write everything down. Skip this step and you'll discover a critical device on cutover day — and it'll be the fire panel.

## Week 2: Split Life Safety From Everything Else

Your fire alarm and elevator phone can't just move to any new connection. They carry code requirements — NFPA 72, UL 864, ASME A17.1 — that dictate which replacement paths are acceptable. A cellular communicator or IP-based alarm transmission works, but it has to be listed for the purpose and monitored correctly.

Life safety gets its own migration plan and first priority. Everything else — phones, fax, POS, access control — can follow a simpler path behind it.

## Week 3: Get Competitive Quotes (and Don't Take the Carrier's Word)

The carrier that sent the notice will happily sell you their replacement. That's convenient, not competitive. In most cases their "replacement" is a pricier product that locks you into the same company that just orphaned your service.

Get at least three options: fixed wireless, fiber from a competing carrier, cellular gateways, managed LTE as primary, or an SD-WAN that aggregates whatever is available. The carrier retiring your copper is rarely the cheapest or best path forward.

## Week 4: Install in Parallel, Test in Parallel

The right way to migrate is to stand the new service up next to the old one and verify it before you commit. Install the new equipment, configure it, and run it side by side with the existing circuit for a week or two. Let both coexist until you're confident.

Then cut over once — on a scheduled weekend or off-hours window, with a rollback plan in your pocket. Not in pieces across three weeks of midnight outages.

## Weeks 5–6: Cut Over and Verify

After cutover, don't declare victory at "the phones ring." Test that the fire alarm communicator actually reaches the central station. Confirm the elevator phone calls out. Send a fax end to end if you still use fax. Verify POS transactions across every register. The things you skip verifying are the things that break on Monday morning.

## The Part Nobody Expects

The notice is usually the best thing to happen to your telecom budget. The copper circuits being disconnected are expensive, aging, and increasingly unreliable. The replacement is almost always cheaper, faster, and more resilient. Clients routinely turn a forced migration into a 40% cost cut and a network actually built for how they operate today.

## Don't Wait for the Letter

If you're still running copper POTS, legacy T1, or analog services, this notice is coming. The only question is whether you'll be reacting to a 45-day deadline — or executing a migration on your own timeline.

[Let's inventory what's connected in your facilities](/contact) before the letter shows up.
