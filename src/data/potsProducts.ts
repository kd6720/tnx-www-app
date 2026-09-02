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
