import { LanguageSupport } from "@codemirror/language";
import { Language } from "../../store/sampleData/snippet";

export async function getLanguageExtension(
  language: Language
): Promise<LanguageSupport> {
  switch (language) {
    case Language.JSON:
      return (await import("@codemirror/lang-json")).json();

    case Language.JavaScript:
      return (await import("@codemirror/lang-javascript")).javascript();

    case Language.TypeScript:
      return (await import("@codemirror/lang-javascript")).javascript({
        typescript: true,
      });

    case Language.HTML:
      return (await import("@codemirror/lang-html")).html();

    case Language.CPP:
      return (await import("@codemirror/lang-cpp")).cpp();

    case Language.Markdown:
      return (await import("@codemirror/lang-markdown")).markdown();
  }

  throw new Error("Language not supported");
}
