import { Model, PaidModels } from "../types/brainConfig";

// masao : 14-oct-23 : localization
export const defineMaxTokens = (model: Model | PaidModels): number => {
  //At the moment is evaluating only models from OpenAI
  switch (model) {
    case "gpt-3.5-turbo":
      return 1500;   // 750;
    case "gpt-3.5-turbo-16k":
      return 4000;   // 2000;
    case "gpt-4":
      return 2000;   // 1000;
    default:
      return 1000;   // 500;
  }
};
