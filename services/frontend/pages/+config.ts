import type { Config } from "vike/types";
import vikePhoton from "vike-photon/config";
import vikeSolid from "vike-solid/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",

  extends: [vikeSolid, vikePhoton],

  // https://vike.dev/vike-photon
  photon: {
    server: "../server/entry.ts",
  },
} satisfies Config;
