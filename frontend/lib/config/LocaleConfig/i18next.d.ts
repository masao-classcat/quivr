import { defaultNS, resources } from "./resources";

// masao : 09-oct-23
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["ja"];
  }
}
