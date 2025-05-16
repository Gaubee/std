export interface DenoJson extends ImportMap {
  compilerOptions?: {
    allowJs?: boolean;
    checkJs?: boolean;
    jsx?: "react" | "react-jsx" | "react-jsxdev" | "preserve";
    jsxFactory?: string;
    jsxFragmentFactory?: string;
    strict?: boolean;
    target?: "ES3" | "ES5" | "ES6" | "ES2015" | "ES2016" | "ES2017" | "ES2018" | "ES2019" | "ES2020" | "ES2021" | "ES2022" | "ESNext";
    [key: string]: unknown; // 其他 TypeScript 编译器选项
  };
  dnt?: object;
  importMap?: string;
  tasks?: Record<string, string>; // 自定义任务
  lint?: {
    files?: {
      include?: string[];
      exclude?: string[];
    };
    rules?: {
      tags?: string[];
      include?: string[];
      exclude?: string[];
    };
  };
  fmt?: {
    files?: {
      include?: string[];
      exclude?: string[];
    };
    options?: {
      useTabs?: boolean;
      lineWidth?: number;
      indentWidth?: number;
      singleQuote?: boolean;
      proseWrap?: "always" | "never" | "preserve";
    };
  };
  test?: {
    files?: string[];
    options?: {
      allowAll?: boolean;
      failFast?: boolean;
      filter?: string;
    };
  };
  unstable?: boolean;
  lock?: string;
  lockWrite?: boolean;
  permissions?: {
    read?: boolean | string[];
    write?: boolean | string[];
    net?: boolean | string[];
    env?: boolean | string[];
    run?: boolean | string[];
    ffi?: boolean | string[];
    hrtime?: boolean;
  };
  [key: string]: unknown; // 允许其他额外字段
}

export interface ImportMap {
  imports?: Record<string, string>;
  scopes?: Record<string, string>;
}
