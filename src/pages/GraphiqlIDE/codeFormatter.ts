export async function formatGraphQLCode(code: string) {
  let formattedCode = code;
  let currentIndentation = 0;

  formattedCode = formattedCode.replace(/(\{|})/g, (_match, p1) => {
    if (p1 === '{') {
      currentIndentation += 2;
      return `{\n${' '.repeat(currentIndentation)}`;
    } else {
      currentIndentation -= 2;
      return `\n${' '.repeat(currentIndentation)}}`;
    }
  });

  return formattedCode;
}
