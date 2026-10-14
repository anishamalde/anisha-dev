import blogPostsData from "./blog-posts.json";

export type PageKey = "home" | "blog" | "talks" | "code" | "about" | "contact";

export type BlogPost = {
  title: string;
  tags: string[];
  date: string;
  reactions: number;
  comments: number;
  excerpt: string;
  devtoUrl: string;
  coverImage: string | null;
};

export type Talk = {
  title: string;
  venue: string;
  year: string;
  blurb: string;
  slidesUrl: string;
  videoUrl: string;
  grewFromPost: boolean;
  significance: number;
  kind?: "talk" | "workshop" | "podcast";
  coSpeaker?: string;
};

export type UpcomingTalk = {
  title: string;
  venue: string;
  date: string;
  location: string;
};

export type Project = {
  name: string;
  oneLiner: string;
  stack: string[];
  githubUrl: string;
  relatedLabel?: string;
  role?: "author" | "maintainer" | "contributor";
};

export type TimelineStep = {
  year: string;
  role: string;
  org: string;
  note: string;
};

export const NAV: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "blog", label: "Blog" },
  { key: "talks", label: "Talks" },
  { key: "code", label: "Code" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

export const GREETINGS: string[] = [
  "npx react-native run-android --variant=fireTv",
  'git commit -m "fix: d-pad focus on Fire TV"',
  "aws appstore submit --app vega-starter",
  "npm publish fire-tv-nav-kit",
  'echo "Hello, dev.to" | devto post --draft',
  "adb shell am start -n com.firetv.sample/.MainActivity",
  'console.log("hi, I\'m Anisha 👋");',
];

export const BLOG_POSTS: BlogPost[] = blogPostsData as BlogPost[];

export const TALKS: Talk[] = [
  {
    title: "Build Once, Watch Everywhere",
    venue: "next.app devcon",
    year: "2026",
    blurb:
      "A hands-on session on building a React Native app for TVs. Share a single codebase across Vega OS, Android TV, Web, and Apple TV, then layer in platform-specific dependencies for Fire TV to optimize for the Amazon Appstore and its hundreds of millions of devices.",
    slidesUrl: "",
    videoUrl: "",
    grewFromPost: false,
    significance: 10,
    kind: "workshop",
  },
  {
    title: "Agents FC: Harness Agents Into a Winning Team",
    venue: "Agent Conf",
    year: "2026",
    blurb:
      "Co-presented with Kourtney Meiss — how to harness AI agents into a team that actually ships, from orchestration to the guardrails that keep them on the pitch.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=vss3ra7FKTE",
    grewFromPost: false,
    significance: 10,
    kind: "talk",
    coSpeaker: "Kourtney Meiss",
  },
  {
    title: "The Generations of React",
    venue: "React Universe Conf",
    year: "2025",
    blurb:
      "A look at how React has evolved across its different eras — what changed, what stuck, and what it means for how we build today.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=9CHdcVq1rto",
    grewFromPost: false,
    significance: 9,
    kind: "talk",
  },
  {
    title: "The Bigger Picture",
    venue: "App.js Conf",
    year: "2025",
    blurb:
      "Co-presented with Łukasz Chludziński — stepping back from the day-to-day of React Native to look at the ecosystem, the tooling, and where the community is heading next.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=wQkKdBgWisM",
    grewFromPost: false,
    significance: 8,
    kind: "talk",
    coSpeaker: "Łukasz Chludziński",
  },
  {
    title: "React Native Beyond Mobile: TV, Tablets & Amazon Devices",
    venue: "reactCon",
    year: "2025",
    blurb:
      "Extending React Native beyond the phone — how the same app model scales to TVs, tablets, and Amazon Devices, and the platform-specific work you actually have to do.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=MVYnft6SyU4",
    grewFromPost: false,
    significance: 7,
    kind: "talk",
  },
  {
    title: "The Age of Universal React: What's the Catch?",
    venue: "React Day Berlin",
    year: "2024",
    blurb:
      "With Mo Khazali — testing the 'learn once, write once, run anywhere' promise against real universal React apps: what genuinely shares across web + iOS + Android, and where the seams show up.",
    slidesUrl:
      "https://gitnation.com/contents/the-age-of-universal-react-whats-the-catch",
    videoUrl: "",
    grewFromPost: false,
    significance: 7,
    kind: "talk",
    coSpeaker: "Mo Khazali",
  },
  {
    title: "Extending React Native Beyond Mobile & Desktop Apps",
    venue: "React Conf",
    year: "2024",
    blurb:
      "With Chris Traganos — the case for React Native as a surface layer for TV, ambient, and voice, not just phones and desktops.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=X2eJtxoLlb4",
    grewFromPost: false,
    significance: 7,
    kind: "talk",
    coSpeaker: "Chris Traganos",
  },
  {
    title: 'The "state" of React Native: 2024 edition',
    venue: "React Native Connection, Paris",
    year: "2024",
    blurb:
      "A yearly temperature-check on React Native — what shipped, what stalled, and what to actually pay attention to going into next year.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=o4kxwOCsDOg",
    grewFromPost: false,
    significance: 7,
    kind: "talk",
  },
  {
    title: "Building in React & React Native: 5 Years Ago & Now",
    venue: "React Universe On Air",
    year: "2024",
    blurb:
      "A conversation on how building with React and React Native has changed over the last five years — the tooling that stuck, and the habits worth updating.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=Pdwxy2fcYAM",
    grewFromPost: false,
    significance: 3,
    kind: "podcast",
  },
  {
    title: "Building a Personal AI Device",
    venue: "AWS Conference, Amsterdam",
    year: "2024",
    blurb:
      "What it takes to build a personal AI device — the hardware, the interaction model, and the developer surface behind it.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=_l6QRqCeTcg",
    grewFromPost: false,
    significance: 5,
    kind: "talk",
  },
  {
    title: "A Story(book) About Testing",
    venue: "React Native EU",
    year: "2023",
    blurb:
      "How Storybook slots into a React Native testing workflow — and why component-level stories change what you actually end up writing tests for.",
    slidesUrl: "",
    videoUrl: "https://www.youtube.com/watch?v=eaZ9MdRIbRQ",
    grewFromPost: false,
    significance: 6,
    kind: "talk",
  },
  {
    title: "Expand your Android app beyond the phone",
    venue: "droidcon London",
    year: "2022",
    blurb:
      "Co-presented with Gio Laquidara — extending Android apps to Fire devices, Windows 11 via Windows Subsystem for Android, and the Amazon Appstore beyond the phone.",
    slidesUrl:
      "https://dev.to/amazonappdev/expand-your-android-app-beyond-the-phone-slides-4l59",
    videoUrl: "https://www.youtube.com/watch?v=rH1XKFd18AM",
    grewFromPost: false,
    significance: 5,
    kind: "talk",
    coSpeaker: "Giovanni Laquidara",
  },
  {
    title: "Among Us: Identifying & Managing Imposter Syndrome",
    venue: "GDG DevFest London",
    year: "2022",
    blurb:
      "How imposter syndrome shows up differently across engineering and DevRel teams — with a set of tactics for managing it and building trust in your team.",
    slidesUrl:
      "https://dev.to/anishamalde/among-us-identifying-managing-imposter-syndrome-slides-595l",
    videoUrl: "",
    grewFromPost: true,
    significance: 4,
    kind: "talk",
  },
];

export const UPCOMING_TALKS: UpcomingTalk[] = [];

export const PROJECTS: Project[] = [
  {
    name: "react-native-multi-tv-helloworld",
    oneLiner:
      "A starter template for building React Native TV apps across Vega (Fire TV), Android TV, and Apple TV from a single shared codebase, using Yarn workspaces.",
    stack: ["React Native", "TV", "Vega", "Monorepo"],
    githubUrl:
      "https://github.com/AmazonAppDev/react-native-multi-tv-helloworld",
    role: "maintainer",
  },
  {
    name: "devices-agent-skills",
    oneLiner:
      "A collection of Amazon Devices community Agent Skills — packaged workflows that give AI assistants specialised knowledge for Vega OS migrations and TV UI patterns.",
    stack: ["Agent Skills", "AI", "TV"],
    githubUrl: "https://github.com/AmazonAppDev/devices-agent-skills",
    role: "maintainer",
  },
  {
    name: "maps-MCP-extapp-demo",
    oneLiner:
      "A Model Context Protocol server that serves an interactive Google Maps viewer as an MCP App — renders inside Claude Desktop and other MCP hosts.",
    stack: ["MCP", "TypeScript", "React"],
    githubUrl: "https://github.com/anishamalde/maps-MCP-extapp-demo",
    role: "author",
  },
  {
    name: "RNNewArchitectureApp",
    oneLiner:
      "A collection of sample React Native apps demonstrating the New Architecture (Fabric & TurboModules) step-by-step.",
    stack: ["React Native", "New Architecture"],
    githubUrl: "https://github.com/anishamalde/RNNewArchitectureApp",
    role: "author",
  },
  {
    name: "react-native-testing-library",
    oneLiner:
      "Contributed the toHaveAccessibleName matcher — an accessibility assertion for RNTL that mirrors the DOM Testing Library equivalent.",
    stack: ["React Native", "Testing", "Open Source"],
    githubUrl:
      "https://github.com/anishamalde/react-native-testing-library/tree/feat/add-toHaveAccessibleName-matcher",
    role: "contributor",
  },
];

export const TIMELINE: TimelineStep[] = [
  {
    year: "2021—Now",
    role: "Senior Developer Advocate",
    org: "Amazon Devices",
    note: "Leading the DevRel delivery of Vega OS. React Native across Fire TV, Fire Tablet, and Vega — sample code, talks, developer tooling, and AI tooling for the Amazon developer ecosystem.",
  },
  {
    year: "2017—2021",
    role: "Developer & Tech Lead",
    org: "IBM iX",
    note: "Rapid client work on the agency side of IBM — React and React Native builds for regulated enterprise clients. Grew from React developer into a technical lead role. AWS Certified Developer – Associate.",
  },
  {
    year: "Internship",
    role: "Software Intern",
    org: "Safaricom",
    note: "Nairobi. Building Android for low-end devices across East Africa — the constraints that made me care about performance, accessibility, and shipping small.",
  },
  {
    year: "Internship",
    role: "Software Intern",
    org: "Rolls-Royce",
    note: "Derby. Embedded and enterprise systems for aerospace — high-stakes software where testing isn't optional.",
  },
];

export type EducationStep = {
  year: string;
  qualification: string;
  org: string;
  note: string;
};

export const EDUCATION: EducationStep[] = [
  {
    year: "2013—2017",
    qualification: "MEng Biomedical Engineering",
    org: "Imperial College London",
    note: "1st Class Honours. Awarded the Old Centrilians Prize. Notable projects: a low-cost 3D-printed transtibial prosthetic socket designed for developing countries, and a children's game teaching atopic dermatitis prevention.",
  },
];
