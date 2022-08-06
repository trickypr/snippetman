import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { Language } from "../../store/sampleData/snippet";

export async function getLanguageExtension(
  language: Language
): Promise<LanguageSupport> {
  console.log(language);
  switch (language) {
    case Language.JSON:
      return (await import("@codemirror/lang-json")).json();

    case Language.JavaScript:
      return (await import("@codemirror/lang-javascript")).javascript();

    case Language.TypeScript:
      return (await import("@codemirror/lang-javascript")).javascript({
        typescript: true,
      });
  }

  throw new Error("Language not supported");
}
