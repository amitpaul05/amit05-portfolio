// Single source of truth for app icons.
//
// Style: the Solar icon set (rounded, macOS/SF-Symbols-like), rendered in the `linear`
// (outline) variant everywhere for a consistent resting style. Brand marks come from
// simple-icons. The mobile tab bar (TopNav) imports the `bold` (filled) variants directly
// for its active state. All are compiled offline and tree-shaken by unplugin-icons — only
// the icons re-exported here ship in the bundle.
//
// Names are kept generic/semantic so call sites read clearly; swap a mapping here to
// restyle an icon everywhere at once.

export { default as GithubLogo } from "~icons/simple-icons/github";
export { default as LinkedinLogo } from "~icons/simple-icons/linkedin";

export { default as ArrowSquareOut } from "~icons/solar/square-arrow-right-up-linear";
export { default as DownloadSimple } from "~icons/solar/download-minimalistic-linear";
export { default as UploadSimple } from "~icons/solar/upload-minimalistic-linear";
export { default as Moon } from "~icons/solar/moon-linear";
export { default as Sun } from "~icons/solar/sun-linear";
export { default as Lock } from "~icons/solar/lock-keyhole-minimalistic-linear";
export { default as Pulse } from "~icons/solar/pulse-2-linear";
export { default as TerminalWindow } from "~icons/solar/code-2-linear";
export { default as GraduationCap } from "~icons/solar/square-academic-cap-linear";
export { default as BookOpen } from "~icons/solar/book-2-linear";
export { default as Medal } from "~icons/solar/medal-ribbon-star-linear";
export { default as Certificate } from "~icons/solar/diploma-linear";
export { default as CalendarDots } from "~icons/solar/calendar-minimalistic-linear";
export { default as MapPin } from "~icons/solar/map-point-linear";
export { default as EnvelopeSimple } from "~icons/solar/letter-linear";
export { default as HardDrives } from "~icons/solar/database-linear";
export { default as Buildings } from "~icons/solar/buildings-2-linear";
export { default as CaretDown } from "~icons/solar/alt-arrow-down-linear";
export { default as CaretLeft } from "~icons/solar/alt-arrow-left-linear";
export { default as CaretRight } from "~icons/solar/alt-arrow-right-linear";
export { default as GearSix } from "~icons/solar/settings-linear";
export { default as Eye } from "~icons/solar/eye-linear";
export { default as EyeSlash } from "~icons/solar/eye-closed-linear";
export { default as CheckCircle } from "~icons/solar/check-circle-linear";
export { default as CircleNotch } from "~icons/solar/refresh-linear";
export { default as ArrowLeft } from "~icons/solar/arrow-left-linear";
export { default as PencilSimple } from "~icons/solar/pen-linear";
export { default as X } from "~icons/solar/close-circle-linear";
