/**
 * DataRemote POTS IN A BOX® product data.
 *
 * Every value here was taken from dataremote.com (fetched 2026-09-02) — nothing
 * is inferred. Two rules that have already been violated once on this site:
 *
 *  1. The model number is NOT the line count. 90X1 and 90X2 are both 8-line
 *     units; the 90X5 is 4 lines expandable to 8. The table this file replaced
 *     read one, two and five lines respectively, with part numbers invented to
 *     match. Do not reintroduce a line count that tracks the model number.
 *  2. DataRemote publishes no dimensions, weight, or operating temperature for
 *     any model. Do not add them.
 *
 * Compliance wording is deliberate and load-bearing — see the notes on
 * `certifications` and `complianceNote` below before editing any string.
 */

export type ProductSlug = '90x1' | '90x2' | '90x5' | 'ara';

export interface SpecRow {
  label: string;
  value: string;
}

export interface CertRow {
  standard: string;
  /** Real identifier, or an explicit statement that none is published. */
  identifier: string;
  /** Who holds the credential, when it isn't DataRemote. */
  holder?: string;
}

/**
 * Product photography. Every asset is a transparent WebP exported from the
 * manufacturer originals in the MIX Networks brand library, so the same file
 * sits correctly on the navy hero band and on white. Intrinsic width/height
 * are required — without them the image reserves no space and the page shifts
 * as it decodes.
 */
export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Feature {
  title: string;
  desc: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** 90X5 only — the independently swappable modules that make up the platform. */
export interface ProductModule {
  name: string;
  role: string;
  image?: ProductImage;
  rows: SpecRow[];
}

export interface Product {
  slug: ProductSlug;
  /** Short name used in nav, cards and cross-links. */
  name: string;
  /** Full product name for the H1. */
  title: string;
  /** Mono eyebrow above the H1. */
  eyebrow: string;
  /** One sentence under the H1. */
  lede: string;
  /** 3–4 short facts rendered as chips in the hero. */
  chips: string[];
  /** Banner above the hero copy, e.g. the 90X5 pre-order notice. */
  notice?: string;
  seoTitle: string;
  seoDescription: string;
  /** Two-sentence positioning paragraph opening the spec section. */
  positioning: string;
  specGroups: { heading: string; rows: SpecRow[] }[];
  certifications: CertRow[];
  /** Rendered under the certification table. Hedges are not optional. */
  complianceNote: string;
  carriers?: string[];
  /** Rendered as the "best fit" line on the hub card and the product hero. */
  bestFor: string;
  /** Hero product shot. */
  image?: ProductImage;
  /** Secondary shot rendered beside the spec table, with a caption. */
  detail?: ProductImage & { caption: string };
  /** Capability cards. Every claim traces to a published manufacturer spec. */
  features?: Feature[];
  /** 90X5 only. */
  modules?: ProductModule[];
  /** 90X5 only — orderable options beyond the base configuration. */
  expansion?: SpecRow[];
  /** Rendered as an FAQ section and emitted as FAQPage structured data. */
  faqs?: Faq[];
}

/** Endpoints the whole family replaces — shared by every product page. */
export const REPLACED_ENDPOINTS = [
  'Elevator emergency phones',
  'Fire alarm panels',
  'Burglar and intrusion alarms',
  'Fax machines',
  'POS terminals and ATMs',
  'Emergency call boxes',
  'Gate entry and callbox systems',
  'M2M and SCADA links',
  'Telemetry and remote sensors',
  'Utility meter reading',
];

/** Call features shared by the 90X1 and 90X2. */
export const CALL_FEATURES = [
  'Ring-down (auto-dial)',
  'DTMF, in-band and out-of-band',
  'G.711 and G.729 codecs',
  'G.168 echo cancellation',
  'CPC (Calling Party Control)',
  'E911 with GNSS geo-location',
  'TTY / TRS support',
  'Caller ID and CWCID',
  '3-way conference',
  'Hold, forward, transfer, waiting',
];

export const ARA_CAPABILITIES = [
  { title: 'Remote device access', desc: 'Reach any deployed unit in real time — no site visit, no on-site technician.' },
  { title: 'Reboot and firmware', desc: 'Remote reboot and firmware upgrade across the fleet or a single endpoint.' },
  { title: 'Parameter control', desc: 'Get and set parameters, upload or download configuration, factory reset.' },
  { title: 'Line-status monitoring', desc: 'Per-line status with alerts and live push notifications when a line changes state.' },
  { title: 'No-reboot configuration', desc: 'Configuration changes apply without restarting the device, so a fire panel never loses its path.' },
  { title: 'Syslog retrieval', desc: 'Pull device syslogs remotely for diagnostics and incident review.' },
  { title: 'RESTful API', desc: 'Provisioning, billing and OSS/BSS integration against a documented API.' },
  { title: 'Role-based access', desc: 'RBAC, end-to-end encryption and SSO across the management plane.' },
];

const SHARED_90X_POSITIONING =
  'The POTS IN A BOX® platform terminates real analog lines on real FXS ports, then carries them over a managed cellular path with code-relevant battery backup. It is a purpose-built line-replacement platform, not a consumer cellular adapter with an RJ-11 jack on it.';

export const PRODUCTS: Record<ProductSlug, Product> = {
  '90x1': {
    slug: '90x1',
    name: '90X1',
    title: 'POTS IN A BOX® 90X1',
    eyebrow: 'DataRemote · 5G',
    lede:
      'Eight analog lines on a 5G Sub-6 path with a 48-hour battery — the model we deploy when the site has 5G coverage and life-safety endpoints on the line.',
    chips: ['8 FXS lines', '5G Sub-6 (NSA + SA)', '48 hr battery', 'FCC grant held by DataRemote'],
    seoTitle: 'DataRemote POTS IN A BOX 90X1 — 5G POTS Replacement | TrustedNetworx',
    seoDescription:
      'The DataRemote 90X1 replaces eight analog lines over 5G Sub-6 with an 18-cell 15Ah battery and up to 48 hours of standby. UL 864 aligned, CSFM listed, deployed and monitored by TrustedNetworx.',
    positioning: SHARED_90X_POSITIONING,
    bestFor: 'Sites with 5G coverage carrying fire, elevator or emergency endpoints.',
    image: {
      src: '/product/90x1-hero.v2.webp',
      alt: 'DataRemote POTS IN A BOX 90X1 appliance, three-quarter view with the FXS, Ethernet and antenna ports visible',
      width: 1200,
      height: 1152,
    },
    detail: {
      src: '/product/90x1-front.v2.webp',
      alt: 'DataRemote 90X1 front view showing the status indicators and antenna placement',
      width: 1185,
      height: 1200,
      caption: 'Eight FXS ports, three Ethernet, dual SIM and four SMA antenna connections on a single chassis.',
    },
    features: [
      {
        title: 'Eight analog lines',
        desc: 'Eight RJ-11 FXS ports with surge protection retire up to eight copper lines from one appliance — no per-line adapter, no separate ATA to power and monitor.',
      },
      {
        title: '5G Sub-6, NSA and SA',
        desc: 'A 5G Sub-6 radio carries the lines, with LTE fallback and approvals across Verizon, AT&T, T-Mobile, UScellular and Webbing.',
      },
      {
        title: 'Up to 48 hours of standby',
        desc: 'An 18-cell 15Ah lithium-ion pack holds the site through a mains outage, and a 12VDC 3.0A UPS output powers approved connected devices from the same battery.',
      },
      {
        title: 'E911 with GNSS location',
        desc: 'Integrated GNSS supplies the geo-location an emergency call needs once the line no longer maps to a fixed street address in the carrier database.',
      },
      {
        title: 'Line-grade analog behaviour',
        desc: 'Ring-down, CPC, DTMF in and out of band and G.168 echo cancellation are what make a fire panel or elevator phone work on this path rather than merely connect to it.',
      },
      {
        title: 'Managed through Ara',
        desc: 'Every unit we deploy enrols in Ara for remote provisioning, firmware, line-state alerts and syslog retrieval — most faults are diagnosed without a truck.',
      },
    ],
    faqs: [
      {
        q: 'How many lines does one 90X1 replace?',
        a: 'Eight. The unit provides eight RJ-11 FXS ports with surge protection, and each one presents as a normal analog line to whatever is plugged into it. The model number is not the line count — the 90X1 and 90X2 are both eight-line units.',
      },
      {
        q: 'What happens when the power goes out?',
        a: 'The internal 18-cell 15Ah lithium-ion battery is rated for up to 48 hours of standby, and real runtime depends on line activity and load. A 12VDC 3.0A UPS output can carry approved connected equipment from the same pack, and the unit sends a low-battery alert before shutting down gracefully.',
      },
      {
        q: 'Can it carry fire alarm and elevator phone lines?',
        a: 'That is the primary use case. The 90X1 is aligned with UL 864 and NFPA 72 requirements for fire alarm signal transmission and is listed by the California State Fire Marshal under 7305-2384:0002. NFPA 72 applies to the installed system rather than to a product, so whether a specific installation satisfies it is determined by the authority having jurisdiction at the site.',
      },
      {
        q: 'How is 911 handled on a cellular line?',
        a: 'Two layers. On the device, integrated GNSS supplies geo-location with the call. On the network, MIX Networks meets the service obligations — E911 address association and dispatchable location, 911-call notification to designated contacts, and Kari’s Law and RAY BAUM’S Act support.',
      },
      {
        q: 'When would we choose the 90X2 instead?',
        a: 'When the site has no usable 5G coverage, when FirstNet band 14 priority access matters, or when the location is in Canada — the 90X2 is the model approved on Bell. The line count, battery and management are otherwise identical.',
      },
    ],
    specGroups: [
      {
        heading: 'Analog and network',
        rows: [
          { label: 'Analog lines', value: '8 × RJ-11 FXS ports with surge protection' },
          { label: 'Cellular', value: '5G Sub-6 module, NSA and SA' },
          { label: 'Ethernet', value: '3 × RJ-45 — 1 × 2.5GbE WAN/LAN, 2 × 1GbE LAN' },
          { label: 'SIM', value: '2 × SIM (2FF)' },
          { label: 'Antennas', value: '4 × SMA (5G / LTE / GNSS)' },
          { label: 'Other I/O', value: 'USB Type-A' },
        ],
      },
      {
        heading: 'Power and backup',
        rows: [
          { label: 'Battery', value: '18-cell 15Ah lithium-ion, up to 48 hr standby (runtime varies with load)' },
          { label: 'DC input', value: '19VDC 4A' },
          { label: 'AC adapter', value: '19V 3.3A' },
          { label: 'UPS power output', value: '12VDC 3.0A' },
          { label: 'Shutdown', value: 'Graceful shutdown with low-battery alert' },
        ],
      },
    ],
    certifications: [
      { standard: 'UL 864', identifier: 'Intertek report 105634656CHI-001' },
      { standard: 'UL 62368-1', identifier: 'UL-CA-2329074-0' },
      { standard: 'UL 2054', identifier: 'MH63085' },
      { standard: 'CSFM listing', identifier: '7305-2384:0002' },
      { standard: 'PTCRB', identifier: '122711, 118623' },
      { standard: 'FCC', identifier: '2AJLF-90X1', holder: 'DataRemote' },
      { standard: 'CEC', identifier: 'California Energy Commission appliance listing' },
    ],
    complianceNote:
      'The 90X1 is aligned with UL 864 and NFPA 72 requirements for fire alarm signal transmission. NFPA 72 is a code that applies to the installed system — it is not a product certification, and no device is "NFPA 72 certified." Whether a given installation satisfies it is determined by the authority having jurisdiction at the site.',
    carriers: [
      'Verizon Open Development (2024-02-06)',
      'AT&T (2024-08-09)',
      'T-Mobile IoT',
      'UScellular',
      'Webbing',
    ],
  },

  '90x2': {
    slug: '90x2',
    name: '90X2',
    title: 'POTS IN A BOX® 90X2',
    eyebrow: 'DataRemote · LTE',
    lede:
      'The 90X1’s LTE sibling — same eight lines, same 48-hour battery, FirstNet Trusted, and the only model in the family approved on Bell Canada.',
    chips: ['8 FXS lines', 'LTE incl. band 14 (FirstNet)', '48 hr battery', 'AT&T FirstNet Trusted'],
    seoTitle: 'DataRemote POTS IN A BOX 90X2 — LTE POTS Replacement | TrustedNetworx',
    seoDescription:
      'The DataRemote 90X2 replaces eight analog lines over LTE including band 14 for FirstNet, with a 48-hour battery and a 12VDC 4.0A UPS output. FirstNet Trusted and Bell Canada approved.',
    positioning: SHARED_90X_POSITIONING,
    bestFor: 'Sites without 5G, and anywhere FirstNet priority access matters.',
    image: {
      src: '/product/90x2-hero.v2.webp',
      alt: 'DataRemote POTS IN A BOX 90X2 LTE appliance with both antennas fitted and the port bank visible',
      width: 1200,
      height: 1122,
    },
    detail: {
      src: '/product/90x2-battery.v2.webp',
      alt: 'DataRemote 90X2 with the base removed, showing the internal lithium-ion battery pack and SIM slot',
      width: 1200,
      height: 932,
      caption: 'The 18-cell pack and SIM sit inside the chassis — nothing external to mount, cable or lose.',
    },
    features: [
      {
        title: 'Eight analog lines',
        desc: 'Eight RJ-11 FXS ports with surge protection, identical in capacity and behaviour to the 90X1 — the difference between the two models is the radio, not the line count.',
      },
      {
        title: 'LTE including band 14',
        desc: 'Bands 2, 4, 5, 12, 13, 14, 66 and 71 cover the mainstream North American carriers. Band 14 is FirstNet, and the unit is FirstNet Trusted.',
      },
      {
        title: 'Approved on Bell Canada',
        desc: 'The only model in the family carrying a Bell approval, which makes it the default choice for Canadian sites and cross-border portfolios.',
      },
      {
        title: 'Up to 48 hours of standby',
        desc: 'The same 18-cell 15Ah lithium-ion pack as the 90X1, with a higher 12VDC 4.0A UPS output for approved connected devices.',
      },
      {
        title: 'Line-grade analog behaviour',
        desc: 'Ring-down, CPC, DTMF in and out of band and G.168 echo cancellation — the call-handling detail that determines whether legacy endpoints actually work.',
      },
      {
        title: 'Managed through Ara',
        desc: 'Remote provisioning, firmware, line-state alerts, configuration changes without a reboot, and a documented API for OSS/BSS integration.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between the 90X2 and the 90X1?',
        a: 'The radio. The 90X2 runs on LTE bands 2, 4, 5, 12, 13, 14, 66 and 71; the 90X1 runs on 5G Sub-6. Both are eight-line units with the same 18-cell battery and the same Ara management. Choose the 90X2 for LTE-only coverage, FirstNet priority, or Canada.',
      },
      {
        q: 'Is the 90X2 FirstNet capable?',
        a: 'Yes. It supports band 14 and is AT&T FirstNet Trusted, which is what gives public-safety-adjacent sites priority and pre-emption on the network during an incident.',
      },
      {
        q: 'How long does it run without mains power?',
        a: 'The 18-cell 15Ah lithium-ion battery is rated for up to 48 hours of standby, with real runtime varying by line activity and load. A 12VDC 4.0A UPS output can power approved connected equipment from the same pack.',
      },
      {
        q: 'Can it carry fire alarm and elevator phone lines?',
        a: 'Yes. The 90X2 is aligned with UL 864 and NFPA 72 requirements for fire alarm signal transmission and is listed by the California State Fire Marshal under 7305-2384:0002. NFPA 72 is a code that applies to the installed system, not a product certification, so the authority having jurisdiction makes the final call on any given site.',
      },
      {
        q: 'Whose FCC grant does the 90X2 carry?',
        a: 'The FCC identifier on the 90X2 is a modular grant held by Quectel for the embedded cellular module, unlike the 90X1 which carries DataRemote’s own grant. We publish this because it is the kind of detail an AHJ or a procurement review will eventually ask about.',
      },
    ],
    specGroups: [
      {
        heading: 'Analog and network',
        rows: [
          { label: 'Analog lines', value: '8 × RJ-11 FXS ports with surge protection' },
          { label: 'Cellular', value: 'LTE bands 2, 4, 5, 12, 13, 14, 66, 71 — band 14 is FirstNet' },
          { label: 'Ethernet', value: '3 × RJ-45 — 1 × 2.5GbE WAN/LAN, 2 × 1GbE LAN' },
          { label: 'SIM', value: '2 × SIM (2FF)' },
          { label: 'Antennas', value: '2 × SMA (LTE / GNSS)' },
          { label: 'Other I/O', value: 'USB Type-A' },
        ],
      },
      {
        heading: 'Power and backup',
        rows: [
          { label: 'Battery', value: '18-cell 15Ah lithium-ion, up to 48 hr standby (runtime varies with load)' },
          { label: 'DC input', value: '19VDC 4A' },
          { label: 'AC adapter', value: '19V 3.3A' },
          { label: 'UPS power output', value: '12VDC 4.0A — DataRemote describes this UPS output as patented' },
          { label: 'Shutdown', value: 'Graceful shutdown with low-battery alert' },
        ],
      },
    ],
    certifications: [
      { standard: 'UL 864', identifier: 'Intertek reports 105634656CHI-001 and 105839662CHI-001' },
      { standard: 'UL 2054', identifier: 'MH63085' },
      { standard: 'CSFM listing', identifier: '7305-2384:0002' },
      { standard: 'PTCRB', identifier: '126020' },
      { standard: 'FCC', identifier: 'XMR201909EC25AFX', holder: 'Quectel — modular grant for the embedded cellular module' },
    ],
    complianceNote:
      'The 90X2 is aligned with UL 864 and NFPA 72 requirements for fire alarm signal transmission. NFPA 72 is a code that applies to the installed system, not a product certification. Note that the FCC identifier above is a modular grant held by Quectel for the embedded cellular module — unlike the 90X1, which carries DataRemote’s own grant. The 90X2 has no DOE or CEC appliance listing.',
    carriers: [
      'AT&T FirstNet Trusted',
      'Verizon Open Development (2024-10-04)',
      'AT&T (ref 224456)',
      'T-Mobile IoT',
      'Bell Canada',
    ],
  },

  '90x5': {
    slug: '90x5',
    name: '90X5',
    title: 'POTS IN A BOX® 90X5',
    eyebrow: 'DataRemote · Modular · 5G RedCap',
    lede:
      'A three-module platform whose cellular radio detaches and relocates over a standard PoE Ethernet run — so the antenna goes where the signal is, not where the cabinet is.',
    chips: ['Detachable PoE radio', '4 FXS, expandable to 8', '5G RedCap + LTE fallback', '24 hr / 87 Wh standard'],
    notice: 'Pre-order — specifications are preliminary (EVT stage) and subject to change.',
    seoTitle: 'DataRemote POTS IN A BOX 90X5 — Modular POTS Replacement | TrustedNetworx',
    seoDescription:
      'The DataRemote 90X5 is a modular POTS replacement platform: a PoE-detachable 5G RedCap radio, a 4-line gateway expandable to 8 via RJ-14, and a swappable battery module. Pre-order, specifications preliminary.',
    positioning:
      'Every other POTS replacement forces the same compromise: the box has to sit near the analog endpoints, but the radio needs to sit near a window. The 90X5 separates them. The cellular module detaches and mounts up to a standard PoE Ethernet run away, while the gateway and battery stay in the cabinet with the panel.',
    bestFor: 'Signal-difficult buildings — basements, interior cabinets, thick-wall construction.',
    image: {
      src: '/product/90x5-hero.v2.webp',
      alt: 'DataRemote POTS IN A BOX 90X5 modular gateway, assembled, showing the FXS and Ethernet port bank and OLED display',
      width: 701,
      height: 1000,
    },
    detail: {
      src: '/product/90x5-modules.v2.webp',
      alt: 'Exploded view of the 90X5 showing the WWAN module, core gateway and ATA, and battery pack and charger as three separate stacked units',
      width: 1097,
      height: 1400,
      caption: 'Three independent modules: cellular radio on top, gateway and ATA in the middle, power and battery at the base.',
    },
    features: [
      {
        title: 'The radio leaves the cabinet',
        desc: 'The cellular module detaches and mounts up to a standard PoE Ethernet run away from the chassis, so the antenna goes where the signal is while the gateway stays with the panel.',
      },
      {
        title: 'Four lines, expandable to eight',
        desc: 'Four FXS ports ship standard with POTS IN A BOX line technology, expandable to eight via RJ-14 without changing the chassis.',
      },
      {
        title: '5G RedCap with LTE fallback',
        desc: 'Dual-SIM — one physical, one eSIM — on a 5G RedCap radio that falls back to LTE, with an optional 5G NR Sub-6 module for sites that need the throughput.',
      },
      {
        title: 'Battery sized to the site',
        desc: 'A 24-hour 87Wh lithium-ion pack is standard, with 8-hour, 48-hour and no-battery configurations available, and the module is swappable in the field.',
      },
      {
        title: 'A 1 Gb/s router underneath',
        desc: 'Four WAN/LAN ports, two of them PoE, on a 1 Gb/s router platform — the same box can carry primary or backup internet for the whole site.',
      },
      {
        title: 'Same fleet, same management',
        desc: 'Full Ara support including provisioning across the modular hardware variants, so a 90X5 appears in the same console as every 90X1 and 90X2 you already run.',
      },
    ],
    modules: [
      {
        name: 'Cellular WWAN module',
        role: 'Detaches and relocates to the best signal position over a standard PoE Ethernet run.',
        image: {
          src: '/product/90x5-module-wwan.v2.webp',
          alt: 'The 90X5 detachable cellular WWAN module with its wall-mount bracket',
          width: 533,
          height: 800,
        },
        rows: [
          { label: 'Radio', value: '5G RedCap with LTE fallback' },
          { label: 'SIM', value: '1 physical SIM + 1 eSIM' },
          { label: 'Location', value: 'GNSS and E911' },
        ],
      },
      {
        name: 'Core gateway / ATA',
        role: 'The routing and voice core — where the analog lines and the Ethernet ports terminate.',
        rows: [
          { label: 'Analog lines', value: '4 FXS standard, expandable to 8 via RJ-14' },
          { label: 'Ethernet', value: '4 × WAN/LAN, 2 with PoE' },
          { label: 'Display', value: 'OLED status display' },
        ],
      },
      {
        name: 'Power / battery / charger',
        role: 'Swappable in the field, and sized to the runtime the site actually needs.',
        image: {
          src: '/product/90x5-module-battery.v2.webp',
          alt: 'The 90X5 battery pack and charger module shown separately from the chassis',
          width: 800,
          height: 526,
        },
        rows: [
          { label: 'Standard', value: '24 hr / 87 Wh lithium-ion' },
          { label: 'Options', value: '8 hr, 48 hr, or no battery' },
          { label: 'Mounting', value: 'Tabletop, or wall and board mount' },
        ],
      },
    ],
    expansion: [
      { label: 'Battery', value: '8-hour, 24-hour, 48-hour, or no-battery configuration' },
      { label: 'Wi-Fi', value: 'Optional Wi-Fi 6 module, 2×2 MIMO' },
      { label: 'Radio variant', value: 'Optional 5G NR Sub-6 WWAN module' },
      { label: 'Power', value: 'Optional PDU module' },
      { label: 'Accessories', value: 'Mounting brackets, 19V PSU, PoE / RJ-11 / RJ-14 cables, USB-PD cable' },
    ],
    faqs: [
      {
        q: 'Can we order the 90X5 today?',
        a: 'It is available for pre-order. DataRemote describes the specifications as preliminary and based on EVT-stage product planning, and subject to change without notice. For anything going live in the next quarter, we would deploy the 90X1 or 90X2 instead.',
      },
      {
        q: 'What does modular actually buy us?',
        a: 'It solves the placement conflict. Analog endpoints are usually in a basement or a riser cabinet; cellular signal is usually near a window. On every other appliance you have to compromise on one. On the 90X5 the cellular module detaches and mounts over a PoE Ethernet run, so the radio and the gateway can sit in different places.',
      },
      {
        q: 'How many phone lines does it support?',
        a: 'Four FXS ports are standard, with an eight-port configuration available via RJ-14. That is half the standard capacity of a 90X1 or 90X2 at base configuration, which matters when you are sizing a site.',
      },
      {
        q: 'Can we put fire alarm lines on it?',
        a: 'Not yet, in our view. Certifications on the 90X5 attach per module rather than to the chassis, and DataRemote publishes no certification identifiers for any module while the product sits at EVT stage. We will not represent this unit as fire-alarm capable until those identifiers exist. Life-safety endpoints go on a 90X1 or 90X2 today.',
      },
      {
        q: 'Does it work with the Ara fleet we already have?',
        a: 'Yes. Ara supports the 90X5 including provisioning across its modular hardware variants, so it appears alongside the rest of your deployed units rather than in a separate console.',
      },
    ],
    specGroups: [
      {
        heading: 'Module 1 — Cellular WWAN',
        rows: [
          { label: 'Radio', value: '5G RedCap with LTE fallback' },
          { label: 'SIM', value: '1 physical SIM + 1 eSIM' },
          { label: 'Location', value: 'GNSS and E911' },
          { label: 'Mounting', value: 'Detaches and relocates over a standard PoE Ethernet run' },
        ],
      },
      {
        heading: 'Module 2 — Core Gateway / ATA',
        rows: [
          { label: 'Analog lines', value: '4 FXS standard, expandable to 8 via RJ-14' },
          { label: 'Ethernet', value: '4 × WAN/LAN ports, 2 with PoE' },
          { label: 'Display', value: 'OLED status display' },
        ],
      },
      {
        heading: 'Module 3 — Power / Battery',
        rows: [
          { label: 'Standard', value: '24 hr / 87 Wh lithium-ion' },
          { label: 'Options', value: '8 hr, 48 hr, or no-battery configurations' },
        ],
      },
      {
        heading: 'Optional modules',
        rows: [
          { label: 'Wi-Fi', value: 'Wi-Fi 6, 2×2 MIMO module' },
          { label: 'Power', value: 'PDU module' },
          { label: 'Radio variant', value: '5G NR Sub-6' },
        ],
      },
    ],
    certifications: [],
    complianceNote:
      'Certifications on the 90X5 attach per module rather than to the chassis, and DataRemote publishes no certification identifiers for any module while the product is at EVT stage. We will not represent this unit as fire-alarm capable until those identifiers exist. For life-safety endpoints today, deploy the 90X1 or 90X2.',
  },

  ara: {
    slug: 'ara',
    name: 'Ara',
    title: 'Ara',
    eyebrow: 'DataRemote · Device management',
    lede:
      'The cloud management plane for the whole POTS IN A BOX® fleet — the reason a line fault becomes a ticket you close from a browser instead of a truck roll.',
    chips: ['Fleet-wide remote access', 'Line-status alerts', 'No-reboot config changes', 'RESTful API'],
    seoTitle: 'Ara — DataRemote POTS IN A BOX Device Management | TrustedNetworx',
    seoDescription:
      'Ara is DataRemote’s cloud device-management platform for the POTS IN A BOX family: remote access, firmware upgrade, line-status alerts, no-reboot configuration and a RESTful API for OSS/BSS integration.',
    positioning:
      'The expensive part of an analog line was never the line. It was the truck. Ara removes the diagnostic visit from the equation: line state, configuration, firmware and logs are all reachable remotely, so most faults are identified — and often resolved — before anyone is dispatched.',
    bestFor: 'Multi-site fleets where a truck roll costs more than the line does.',
    specGroups: [
      {
        heading: 'Device operations',
        rows: [
          { label: 'Access', value: 'Real-time device access across the deployed fleet' },
          { label: 'Lifecycle', value: 'Remote reboot, remote firmware upgrade, factory reset' },
          { label: 'Configuration', value: 'Get and set parameters, config upload and download' },
          { label: 'Change behaviour', value: 'Configuration changes apply without a device reboot' },
          { label: 'Diagnostics', value: 'Remote syslog download' },
        ],
      },
      {
        heading: 'Monitoring and integration',
        rows: [
          { label: 'Monitoring', value: 'Line-status monitoring with alerts and live push notifications' },
          { label: 'API', value: 'RESTful API for provisioning, billing and OSS/BSS integration' },
          { label: 'Access control', value: 'Role-based access control, SSO' },
          { label: 'Security', value: 'End-to-end encryption' },
        ],
      },
    ],
    certifications: [],
    complianceNote:
      'Ara is a management platform, not a signalling path. It does not carry alarm or 911 traffic and holds no equipment certification of its own — the certifications that matter for a life-safety installation belong to the hardware and to the network carrying the call.',
  },
};

export const PRODUCT_ORDER: ProductSlug[] = ['90x1', '90x2', '90x5', 'ara'];

/** Hub table — model, network, lines, battery, best fit. Corrected 2026-09-02. */
export const HUB_MODELS = [
  {
    slug: '90x1' as ProductSlug,
    model: '90X1',
    network: '5G Sub-6 (NSA + SA)',
    lines: '8 FXS',
    battery: 'Up to 48 hr',
    bestFor: 'Life-safety endpoints where 5G is available',
  },
  {
    slug: '90x2' as ProductSlug,
    model: '90X2',
    network: 'LTE incl. band 14 (FirstNet)',
    lines: '8 FXS',
    battery: 'Up to 48 hr',
    bestFor: 'FirstNet priority, LTE-only coverage, Canada',
  },
  {
    slug: '90x5' as ProductSlug,
    model: '90X5',
    network: '5G RedCap + LTE fallback',
    lines: '4 FXS, expandable to 8',
    battery: '24 hr standard',
    bestFor: 'Signal-difficult buildings (pre-order)',
  },
  {
    slug: 'ara' as ProductSlug,
    model: 'Ara',
    network: 'Cloud platform',
    lines: '—',
    battery: '—',
    bestFor: 'Fleet management across every deployed unit',
  },
];
