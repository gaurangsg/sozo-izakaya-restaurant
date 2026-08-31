declare module "sql.js/dist/sql-asm.js" {
  type BindValue = string | number | null | Uint8Array;

  interface SqlDatabase {
    run(sql: string, params?: BindValue[]): void;
    export(): Uint8Array;
  }

  interface SqlJs {
    Database: new (data?: Uint8Array) => SqlDatabase;
  }

  function initSqlJs(): Promise<SqlJs>;
  export default initSqlJs;
}
