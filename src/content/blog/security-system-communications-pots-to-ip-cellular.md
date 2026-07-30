---
title: "Security System Communications: From POTS to IP to Cellular"
date: "2026-07-30"
category: "Compliance & Regulation"
description: "Security systems still running on POTS lines are a liability. Here's how to migrate alarm communications to IP and cellular without triggering false alarms or compliance gaps."
author: "Carter Dewey"
readTime: "5 min read"
image: "/blog-images/security-system-communications-pots-to-ip-cellular.png"
---

If your security system still communicates over a POTS line, you have a problem you probably don't know about yet.

Not because the system doesn't work. It probably still does. But because the infrastructure it depends on is deteriorating, the carriers want it gone, and your monitoring station is one line cut away from going dark on your property.

I've walked into facilities where the alarm panel sat in a closet, quietly connected to a copper pair installed in 1998, and nobody had thought about it in 15 years. That's not uncommon. It's also not safe.

## What's actually happening to those copper lines

The FCC's POTS forbearance orders gave carriers the green light to stop maintaining copper infrastructure. What that means on the ground: no new installs, no repairs after a certain threshold, and in many regions, tariffs that make keeping a POTS line financially punitive.

Carriers aren't ripping lines out of the ground — they're just letting them fail and not fixing them. When a backhoe takes out a trunk, if there aren't enough paying POTS customers on it, it doesn't get repaired. That's the quiet phase-out happening across the country right now.

For a security system, that's not an inconvenience. That's a coverage gap.

## The three paths forward

There are really only three viable communication paths for alarm panels today, and which one you pick depends on what's available at the site and what the panel supports.

**Cellular (primary or backup).** This is the most common migration path. Cellular communicators connect directly to the alarm panel and transmit signals over LTE networks. They're independent of the building's internet connection, which means they work when the power is out (battery-backed) and when the ISP goes down. Most UL-listed cellular communicators support AES encryption and are fully supervised — the monitoring station polls the communicator at regular intervals and gets an immediate alert if it stops responding.

The downside: signal strength matters. A panel in a basement mechanical room surrounded by concrete walls may need an external antenna. And cellular networks eventually sunset too — but 4G LTE has years of life left, and most communicators are modular enough to swap radios when the time comes.

**IP (wired Ethernet or Wi-Fi).** IP communicators use the building's internet connection. They're fast, reliable when paired with a backup path, and cheap to operate — no recurring cellular data plan. Most modern panels support IP natively or via an add-on module.

The catch: if the internet goes down and there's no backup path, neither does the alarm communication. Every IP-only installation I've seen that passed a real compliance audit had either a cellular backup or a second ISP on a diverse path. Don't skip the backup.

**Dual-path (cellular + IP).** This is the gold standard. The panel communicates over both paths simultaneously. If one fails, the other picks up without interruption. Most UL 864-compliant monitoring setups require supervised dual-path communication for fire alarm systems. Even for burglar alarm systems that don't require it, the incremental cost is low enough that it rarely makes sense to skip it.

## What the codes actually require

NFPA 72 demands that fire alarm communication paths be supervised. A POTS line satisfied that requirement for decades because the panel could detect line voltage and trigger a trouble signal if the voltage dropped — meaning the line was cut or disconnected.

IP and cellular paths need to provide equivalent supervision. That means the monitoring station must poll the communicator at intervals specified by the listing (typically every 200 seconds for fire, up to every 24 hours for burglar alarm). If the communicator misses a poll, the monitoring station generates a trouble signal. That's the digital equivalent of a cut phone line — and it's actually faster than the old voltage-sensing method.

UL 864, which governs fire alarm control units, has specific requirements for IP communicators including encryption, authentication, and resistance to denial-of-service attacks. Not every IP communicator on the market meets these requirements. Buy one that's listed for the application.

## The migration playbook

If you haven't touched your alarm communications in years, here's the sequence I'd follow:

**1. Inventory what you have.** Panel model, communicator model (if any), and how it's currently connected. If you don't know, get your alarm vendor on site.

**2. Check signal strength for cellular.** Before committing to cellular, do a site survey. A good alarm vendor will test signal strength at the panel location and recommend antenna placement if needed.

**3. Pick a dual-path communicator listed for your application.** Fire alarm? Needs to be UL 864 listed. Burglar alarm only? UL 1610 or UL 365. Don't mix and match — the listing matters.

**4. Coordinate the cutover with your monitoring station.** This is the step most people skip and regret. Your monitoring station needs the new communicator's account number, IP address (for IP paths), and cellular number before you install it. Schedule a test window. Expect to run through every zone and every signal type — alarm, trouble, supervisory, restore — before the tech leaves.

**5. Test, document, and test again.** A communication path migration isn't complete until the monitoring station confirms receipt of every signal type. Get that confirmation in writing. File it somewhere you can find it in three years when the AHJ asks.

## What this costs

A dual-path cellular/IP communicator runs $200–$500 for the hardware. Installation and programming from a qualified alarm vendor adds $300–$800 depending on the panel and complexity. The monthly monitoring cost doesn't change much — maybe $5–$15 more for cellular data. Compared to a dedicated POTS line at $60–$120 a month, the payback is under a year.

The real cost isn't the migration. It's not doing it and finding out your system wasn't communicating when it mattered.

---

*Need help migrating your security system communications? We work with facilities across hospitality, healthcare, multi-family, and commercial real estate to audit, plan, and execute alarm communication upgrades. [Get in touch](/contact) — we'll help you figure out what you have, what you need, and how to get there without disrupting your monitoring.*
