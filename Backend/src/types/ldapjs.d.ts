declare module "ldapjs" {
  export interface ClientOptions {
    url: string;
    connectTimeout?: number;
    timeout?: number;
    tlsOptions?: object;
  }

  export interface SearchOptions {
    filter?: string;
    scope?: "base" | "one" | "sub";
    attributes?: string[];
    sizeLimit?: number;
    timeLimit?: number;
  }

  export interface SearchEntry {
    pojo: {
      objectName: string;
      attributes: Array<{
        type: string;
        values: string[];
      }>;
    };
  }

  export interface SearchResult {
    on(event: "searchEntry", callback: (entry: SearchEntry) => void): void;
    on(event: "error", callback: (err: Error) => void): void;
    on(event: "end", callback: () => void): void;
  }

  export interface Client extends EventEmitter {
    bind(dn: string, password: string, callback: (err: Error | null) => void): void;
    search(baseDn: string, options: SearchOptions, callback: (err: Error | null, res: SearchResult) => void): void;
    unbind(callback: (err: Error | null) => void): void;
    destroy(): void;
  }

  export function createClient(options: ClientOptions): Client;
}

interface EventEmitter {
  on(event: "error", listener: (err: Error) => void): void;
  on(event: "searchEntry", listener: (entry: unknown) => void): void;
  on(event: "end", listener: () => void): void;
  on(event: string, listener: (...args: unknown[]) => void): void;
}

