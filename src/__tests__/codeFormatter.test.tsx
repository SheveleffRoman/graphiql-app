import { formatGraphQLCode } from '../pages/GraphiqlIDE/codeFormatter';

describe('formatGraphQLCode', () => {
    it('should format GraphQL code with proper indentation for opening and closing curly braces', async () => {
    const inputCode = 'query {results {name}}';
    const expectedFormattedCode = `query {\n  results {\n    name\n  }\n}`;

      const result = await formatGraphQLCode(inputCode);

      expect(result).toBe(expectedFormattedCode);
    });

  it('should handle empty input', async () => {
    const inputCode = `{}`;
    const expectedFormattedCode = `{\n  \n}`;

    const result = await formatGraphQLCode(inputCode);

    expect(result).toBe(expectedFormattedCode);
  });
});
