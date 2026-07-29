---
title: "UL 864 and Fire Alarm Monitoring: Staying Compliant During Migration"
date: "2026-07-29"
category: "Compliance & Regulation"
description: "Migrating fire alarm communications away from POTS doesn't have to trigger a compliance headache — here's what UL 864 actually requires and how to stay fully compliant."
author: "Carter Dewey"
readTime: "5 min read"
image: "/blog-images/ul-864-fire-alarm-monitoring-compliance-migration.png"
---

If you manage a commercial building, you've probably heard the warning: migrating your fire alarm system off POTS lines could break UL 864 compliance. For most facility managers, that sentence alone is enough to freeze a project in its tracks.

Here's the reality: UL 864 compliance during migration is entirely achievable. You just need to know what the standard actually requires — and what it doesn't.

## What UL 864 Actually Says About Communication Paths

UL 864 is the standard for control units and accessories for fire alarm systems. It governs how fire alarm panels communicate with monitoring stations — not what transport technology they use.

The key requirement: the communication path must be supervised. That means the panel needs to detect and report a failure in the communication link within a defined window (typically 90 seconds for DACT, 200 seconds for IP communicators).

UL 864 doesn't say "thou shalt use copper." It says the path must be reliable, supervised, and tested. If your replacement technology meets those three criteria, you're on solid ground.

## The Three Paths to a Compliant Migration

### Option 1: Cellular Communicators with Supervision

This is the most common replacement path today. A cellular communicator installs at the panel and connects directly to the monitoring station over LTE networks. Modern units include built-in line supervision — the communicator polls the network continuously and triggers a trouble signal if connectivity drops.

Cost: typically $300–$600 per unit. Installation takes under two hours. No trenching, no copper hunting.

### Option 2: IP Communicators with Encrypted Paths

If your building has reliable internet, an IP communicator can transmit signals over your existing network. The catch: the path needs encryption (AES-128 minimum) and the communicator must supervise the connection end-to-end. This means a heartbeat signal between the panel and the central station receiver.

Important: if your internet goes down during a fire, the communicator must buffer and retry. Most UL-listed IP communicators handle this automatically, but verify before buying.

### Option 3: Dual-Path Solutions

For high-risk or high-value facilities, dual-path communicators use both cellular and IP. If one path fails, the other takes over instantly. This exceeds UL 864 minimum requirements and often satisfies AHJ concerns about single points of failure.

## What Your AHJ Will Actually Ask For

The Authority Having Jurisdiction (your local fire marshal) is the person who signs off on your migration. Here's what they typically want to see:

1. **Proof the new communicator is UL 864 listed.** A spec sheet with the listing number is usually enough.
2. **A supervision test report.** Show that the panel correctly detects and reports a communication failure.
3. **Monitoring station confirmation.** A letter from your central station confirming they can receive signals from the new communicator format.

Most AHJs are pragmatic. They're not interested in blocking modernization — they want to ensure the fire alarm still calls for help when it needs to. Walk in with documentation, not arguments, and you'll get your approval.

## The Mistake That Triggers Compliance Violations

The most common problem we see: facility managers install a cellular communicator but don't verify the panel is properly configured to supervise the new path. A communicator that works in isolation but doesn't report to the panel's trouble relay isn't compliant — and the AHJ will catch it during the annual inspection.

Test supervision before you close the panel door. Disconnect the communicator, verify the panel goes into trouble within the required window, reconnect, verify the trouble clears. Document both results.

## One More Thing: POTS Sunset

The FCC POTS forbearance order means carriers are no longer required to maintain copper infrastructure. Your existing POTS lines are on borrowed time regardless of what UL 864 says about them. A POTS line that costs $800/month and fails randomly isn't compliant in any practical sense — even if it technically meets the letter of the standard.

Migration isn't optional. It's just a question of whether you do it on your schedule or the carrier's.

## Bottom Line

UL 864 compliance during migration comes down to three things: use listed equipment, supervise the path, and document everything. The standard exists to keep buildings safe, not to prevent modernization. Done right, your fire alarm will be more reliable after migration than before.

Need help navigating your fire alarm migration? [Let's talk →](/contact)
