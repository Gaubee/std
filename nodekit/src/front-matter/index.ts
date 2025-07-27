import {parse as yamlParse, stringify as yamlStringify, type ParseOptions, type StringifyOptions} from "@std/yaml";
const optionalByteOrderMark = "\\ufeff?";
const pattern = "^(" + optionalByteOrderMark + "(= yaml =|---)" + "$([\\s\\S]*?)" + "^(?:\\2|\\.\\.\\.)\\s*" + "$" + "\\r?" + "(?:\\n)?)";
// NOTE: If this pattern uses the 'g' flag the `regex` variable definition will
// need to be moved down into the functions that use it.
const regex = new RegExp(pattern, "m");

export interface FrontMatterResult<T = unknown> {
  readonly attributes: T;
  readonly body: string;
  readonly bodyBegin: number;
  readonly frontmatter?: string;
}

export interface FrontMatterParseOptions extends ParseOptions {}

let _u8d: TextDecoder | undefined;
const u8d = () => (_u8d ??= new TextDecoder());
function extractor<T>(string: string | Uint8Array, option?: FrontMatterParseOptions): FrontMatterResult<T> {
  string = typeof string === "string" ? string : u8d().decode(string);
  const lines = string.split(/(\r?\n)/);
  if (lines[0] && /= yaml =|---/.test(lines[0])) {
    return parse(string, option);
  } else {
    return {
      attributes: {} as T,
      body: string,
      bodyBegin: 1,
    };
  }
}

function computeLocation(match: RegExpExecArray, body: string) {
  let line = 1;
  let pos = body.indexOf("\n");
  const offset = match.index + match[0].length;

  while (pos !== -1) {
    if (pos >= offset) {
      return line;
    }
    line++;
    pos = body.indexOf("\n", pos + 1);
  }

  return line;
}

function parse<T>(string: string, options?: FrontMatterParseOptions): FrontMatterResult<T> {
  const match = regex.exec(string);
  if (!match) {
    return {
      attributes: {} as T,
      body: string,
      bodyBegin: 1,
    };
  }

  const yaml = match[match.length - 1].replace(/^\s+|\s+$/g, "");
  const attributes = yamlParse(yaml, options);
  const body = string.replace(match[0], "");
  const line = computeLocation(match, string);

  return {
    attributes: attributes as T,
    body: body,
    bodyBegin: line,
    frontmatter: yaml,
  };
}

function test(string: string) {
  string = string || "";

  return regex.test(string);
}

export interface FrontMatterStringifyOptions extends StringifyOptions {
  /**
   * Force the creation of a front-matter block even if the data is empty.
   * @default false
   */
  force?: boolean;
  /**
   * 确保结果拿去 parse 能有一致的结果
   */
  strict?: boolean;
}

/**
 * Checks if the data object should be considered empty for front-matter purposes.
 */
function isDataEmpty(data: unknown, strict = false): boolean {
  if (strict) {
    return data === null;
  }
  if (data == null) {
    return true;
  }
  // Check for an empty object
  if (typeof data === "object") {
    /// 不使用 Object.keys，可能会有很大的开销
    for (const _key in data) {
      return false;
    }
    return true;
  }
  return false;
}
function stringify(content: string, data: unknown, options: FrontMatterStringifyOptions = {}) {
  const {force = false, strict = false, ...stringifyOptions} = options;
  // 1. Remove any existing front-matter from the content to avoid duplication.
  if (test(content)) {
    content = content.replace(regex, "");
  }

  // 2. If data is empty and we are not forcing a block, return the cleaned content.
  if (force != true && isDataEmpty(data, strict)) {
    return content;
  }
  // 3. Stringify the data into a YAML string.
  // Using `skipInvalid: true` is a good default to avoid errors with `undefined` values.
  const matterStr = yamlStringify(data, {skipInvalid: !strict, ...stringifyOptions});

  // An empty string from yamlStringify (e.g., from an empty object) should also be handled.
  // If the resulting yaml is empty, and we are not forcing, we should not create the block.
  if (force !== true && matterStr.trim() === "") {
    return content;
  }
  // 4. Ensure the YAML block has exactly one trailing newline.
  const formattedMatter = matterStr.trimEnd() + "\n";

  // 5. Assemble the final string.
  return `---\n${formattedMatter}---\n\n${content.trimStart()}`;
}

export const matter = Object.assign(extractor, {
  parse: extractor,
  stringify,
  test,
});
export namespace matter {
  export type ParseOptions = FrontMatterParseOptions;
  export type StringifyOptions = FrontMatterStringifyOptions;
  export type Result<T> = FrontMatterResult<T>;
}
