
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectMember
 * 
 */
export type ProjectMember = $Result.DefaultSelection<Prisma.$ProjectMemberPayload>
/**
 * Model Scene
 * 
 */
export type Scene = $Result.DefaultSelection<Prisma.$ScenePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model SimulationRun
 * 
 */
export type SimulationRun = $Result.DefaultSelection<Prisma.$SimulationRunPayload>
/**
 * Model SimulationRunChunk
 * 
 */
export type SimulationRunChunk = $Result.DefaultSelection<Prisma.$SimulationRunChunkPayload>
/**
 * Model SimulationCheckpoint
 * 
 */
export type SimulationCheckpoint = $Result.DefaultSelection<Prisma.$SimulationCheckpointPayload>
/**
 * Model SimulationMetric
 * 
 */
export type SimulationMetric = $Result.DefaultSelection<Prisma.$SimulationMetricPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectRole: {
  VIEWER: 'VIEWER',
  EDITOR: 'EDITOR',
  OWNER: 'OWNER'
};

export type ProjectRole = (typeof ProjectRole)[keyof typeof ProjectRole]


export const SimulationRunStatus: {
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  INTERRUPTED: 'INTERRUPTED'
};

export type SimulationRunStatus = (typeof SimulationRunStatus)[keyof typeof SimulationRunStatus]

}

export type ProjectRole = $Enums.ProjectRole

export const ProjectRole: typeof $Enums.ProjectRole

export type SimulationRunStatus = $Enums.SimulationRunStatus

export const SimulationRunStatus: typeof $Enums.SimulationRunStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectMember`: Exposes CRUD operations for the **ProjectMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectMembers
    * const projectMembers = await prisma.projectMember.findMany()
    * ```
    */
  get projectMember(): Prisma.ProjectMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scene`: Exposes CRUD operations for the **Scene** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scenes
    * const scenes = await prisma.scene.findMany()
    * ```
    */
  get scene(): Prisma.SceneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.simulationRun`: Exposes CRUD operations for the **SimulationRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SimulationRuns
    * const simulationRuns = await prisma.simulationRun.findMany()
    * ```
    */
  get simulationRun(): Prisma.SimulationRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.simulationRunChunk`: Exposes CRUD operations for the **SimulationRunChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SimulationRunChunks
    * const simulationRunChunks = await prisma.simulationRunChunk.findMany()
    * ```
    */
  get simulationRunChunk(): Prisma.SimulationRunChunkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.simulationCheckpoint`: Exposes CRUD operations for the **SimulationCheckpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SimulationCheckpoints
    * const simulationCheckpoints = await prisma.simulationCheckpoint.findMany()
    * ```
    */
  get simulationCheckpoint(): Prisma.SimulationCheckpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.simulationMetric`: Exposes CRUD operations for the **SimulationMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SimulationMetrics
    * const simulationMetrics = await prisma.simulationMetric.findMany()
    * ```
    */
  get simulationMetric(): Prisma.SimulationMetricDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    ProjectMember: 'ProjectMember',
    Scene: 'Scene',
    Session: 'Session',
    SimulationRun: 'SimulationRun',
    SimulationRunChunk: 'SimulationRunChunk',
    SimulationCheckpoint: 'SimulationCheckpoint',
    SimulationMetric: 'SimulationMetric',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "projectMember" | "scene" | "session" | "simulationRun" | "simulationRunChunk" | "simulationCheckpoint" | "simulationMetric" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectMember: {
        payload: Prisma.$ProjectMemberPayload<ExtArgs>
        fields: Prisma.ProjectMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          findFirst: {
            args: Prisma.ProjectMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          findMany: {
            args: Prisma.ProjectMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          create: {
            args: Prisma.ProjectMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          createMany: {
            args: Prisma.ProjectMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          delete: {
            args: Prisma.ProjectMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          update: {
            args: Prisma.ProjectMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          deleteMany: {
            args: Prisma.ProjectMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          upsert: {
            args: Prisma.ProjectMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          aggregate: {
            args: Prisma.ProjectMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectMember>
          }
          groupBy: {
            args: Prisma.ProjectMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemberCountAggregateOutputType> | number
          }
        }
      }
      Scene: {
        payload: Prisma.$ScenePayload<ExtArgs>
        fields: Prisma.SceneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SceneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SceneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findFirst: {
            args: Prisma.SceneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SceneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findMany: {
            args: Prisma.SceneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          create: {
            args: Prisma.SceneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          createMany: {
            args: Prisma.SceneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SceneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          delete: {
            args: Prisma.SceneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          update: {
            args: Prisma.SceneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          deleteMany: {
            args: Prisma.SceneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SceneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SceneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          upsert: {
            args: Prisma.SceneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          aggregate: {
            args: Prisma.SceneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScene>
          }
          groupBy: {
            args: Prisma.SceneGroupByArgs<ExtArgs>
            result: $Utils.Optional<SceneGroupByOutputType>[]
          }
          count: {
            args: Prisma.SceneCountArgs<ExtArgs>
            result: $Utils.Optional<SceneCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      SimulationRun: {
        payload: Prisma.$SimulationRunPayload<ExtArgs>
        fields: Prisma.SimulationRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SimulationRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SimulationRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>
          }
          findFirst: {
            args: Prisma.SimulationRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SimulationRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>
          }
          findMany: {
            args: Prisma.SimulationRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>[]
          }
          create: {
            args: Prisma.SimulationRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>
          }
          createMany: {
            args: Prisma.SimulationRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SimulationRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>[]
          }
          delete: {
            args: Prisma.SimulationRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>
          }
          update: {
            args: Prisma.SimulationRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>
          }
          deleteMany: {
            args: Prisma.SimulationRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SimulationRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SimulationRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>[]
          }
          upsert: {
            args: Prisma.SimulationRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunPayload>
          }
          aggregate: {
            args: Prisma.SimulationRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSimulationRun>
          }
          groupBy: {
            args: Prisma.SimulationRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<SimulationRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.SimulationRunCountArgs<ExtArgs>
            result: $Utils.Optional<SimulationRunCountAggregateOutputType> | number
          }
        }
      }
      SimulationRunChunk: {
        payload: Prisma.$SimulationRunChunkPayload<ExtArgs>
        fields: Prisma.SimulationRunChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SimulationRunChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SimulationRunChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>
          }
          findFirst: {
            args: Prisma.SimulationRunChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SimulationRunChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>
          }
          findMany: {
            args: Prisma.SimulationRunChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>[]
          }
          create: {
            args: Prisma.SimulationRunChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>
          }
          createMany: {
            args: Prisma.SimulationRunChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SimulationRunChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>[]
          }
          delete: {
            args: Prisma.SimulationRunChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>
          }
          update: {
            args: Prisma.SimulationRunChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>
          }
          deleteMany: {
            args: Prisma.SimulationRunChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SimulationRunChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SimulationRunChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>[]
          }
          upsert: {
            args: Prisma.SimulationRunChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationRunChunkPayload>
          }
          aggregate: {
            args: Prisma.SimulationRunChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSimulationRunChunk>
          }
          groupBy: {
            args: Prisma.SimulationRunChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<SimulationRunChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.SimulationRunChunkCountArgs<ExtArgs>
            result: $Utils.Optional<SimulationRunChunkCountAggregateOutputType> | number
          }
        }
      }
      SimulationCheckpoint: {
        payload: Prisma.$SimulationCheckpointPayload<ExtArgs>
        fields: Prisma.SimulationCheckpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SimulationCheckpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SimulationCheckpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>
          }
          findFirst: {
            args: Prisma.SimulationCheckpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SimulationCheckpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>
          }
          findMany: {
            args: Prisma.SimulationCheckpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>[]
          }
          create: {
            args: Prisma.SimulationCheckpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>
          }
          createMany: {
            args: Prisma.SimulationCheckpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SimulationCheckpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>[]
          }
          delete: {
            args: Prisma.SimulationCheckpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>
          }
          update: {
            args: Prisma.SimulationCheckpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>
          }
          deleteMany: {
            args: Prisma.SimulationCheckpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SimulationCheckpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SimulationCheckpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>[]
          }
          upsert: {
            args: Prisma.SimulationCheckpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationCheckpointPayload>
          }
          aggregate: {
            args: Prisma.SimulationCheckpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSimulationCheckpoint>
          }
          groupBy: {
            args: Prisma.SimulationCheckpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<SimulationCheckpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.SimulationCheckpointCountArgs<ExtArgs>
            result: $Utils.Optional<SimulationCheckpointCountAggregateOutputType> | number
          }
        }
      }
      SimulationMetric: {
        payload: Prisma.$SimulationMetricPayload<ExtArgs>
        fields: Prisma.SimulationMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SimulationMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SimulationMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>
          }
          findFirst: {
            args: Prisma.SimulationMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SimulationMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>
          }
          findMany: {
            args: Prisma.SimulationMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>[]
          }
          create: {
            args: Prisma.SimulationMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>
          }
          createMany: {
            args: Prisma.SimulationMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SimulationMetricCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>[]
          }
          delete: {
            args: Prisma.SimulationMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>
          }
          update: {
            args: Prisma.SimulationMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>
          }
          deleteMany: {
            args: Prisma.SimulationMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SimulationMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SimulationMetricUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>[]
          }
          upsert: {
            args: Prisma.SimulationMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SimulationMetricPayload>
          }
          aggregate: {
            args: Prisma.SimulationMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSimulationMetric>
          }
          groupBy: {
            args: Prisma.SimulationMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<SimulationMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.SimulationMetricCountArgs<ExtArgs>
            result: $Utils.Optional<SimulationMetricCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    projectMember?: ProjectMemberOmit
    scene?: SceneOmit
    session?: SessionOmit
    simulationRun?: SimulationRunOmit
    simulationRunChunk?: SimulationRunChunkOmit
    simulationCheckpoint?: SimulationCheckpointOmit
    simulationMetric?: SimulationMetricOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    members: number
    scenes: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ProjectCountOutputTypeCountMembersArgs
    scenes?: boolean | ProjectCountOutputTypeCountScenesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountScenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
  }


  /**
   * Count Type SceneCountOutputType
   */

  export type SceneCountOutputType = {
    runs: number
  }

  export type SceneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runs?: boolean | SceneCountOutputTypeCountRunsArgs
  }

  // Custom InputTypes
  /**
   * SceneCountOutputType without action
   */
  export type SceneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneCountOutputType
     */
    select?: SceneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SceneCountOutputType without action
   */
  export type SceneCountOutputTypeCountRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationRunWhereInput
  }


  /**
   * Count Type SimulationRunCountOutputType
   */

  export type SimulationRunCountOutputType = {
    chunks: number
    checkpoints: number
    metrics: number
  }

  export type SimulationRunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | SimulationRunCountOutputTypeCountChunksArgs
    checkpoints?: boolean | SimulationRunCountOutputTypeCountCheckpointsArgs
    metrics?: boolean | SimulationRunCountOutputTypeCountMetricsArgs
  }

  // Custom InputTypes
  /**
   * SimulationRunCountOutputType without action
   */
  export type SimulationRunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunCountOutputType
     */
    select?: SimulationRunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SimulationRunCountOutputType without action
   */
  export type SimulationRunCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationRunChunkWhereInput
  }

  /**
   * SimulationRunCountOutputType without action
   */
  export type SimulationRunCountOutputTypeCountCheckpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationCheckpointWhereInput
  }

  /**
   * SimulationRunCountOutputType without action
   */
  export type SimulationRunCountOutputTypeCountMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationMetricWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    projects: number
    members: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    members?: boolean | UserCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Project$membersArgs<ExtArgs>
    scenes?: boolean | Project$scenesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Project$membersArgs<ExtArgs>
    scenes?: boolean | Project$scenesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$ProjectMemberPayload<ExtArgs>[]
      scenes: Prisma.$ScenePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Project$membersArgs<ExtArgs> = {}>(args?: Subset<T, Project$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scenes<T extends Project$scenesArgs<ExtArgs> = {}>(args?: Subset<T, Project$scenesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly userId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.members
   */
  export type Project$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    cursor?: ProjectMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * Project.scenes
   */
  export type Project$scenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    cursor?: SceneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectMember
   */

  export type AggregateProjectMember = {
    _count: ProjectMemberCountAggregateOutputType | null
    _min: ProjectMemberMinAggregateOutputType | null
    _max: ProjectMemberMaxAggregateOutputType | null
  }

  export type ProjectMemberMinAggregateOutputType = {
    projectId: string | null
    userId: string | null
    role: $Enums.ProjectRole | null
    createdAt: Date | null
  }

  export type ProjectMemberMaxAggregateOutputType = {
    projectId: string | null
    userId: string | null
    role: $Enums.ProjectRole | null
    createdAt: Date | null
  }

  export type ProjectMemberCountAggregateOutputType = {
    projectId: number
    userId: number
    role: number
    createdAt: number
    _all: number
  }


  export type ProjectMemberMinAggregateInputType = {
    projectId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type ProjectMemberMaxAggregateInputType = {
    projectId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type ProjectMemberCountAggregateInputType = {
    projectId?: true
    userId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMember to aggregate.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectMembers
    **/
    _count?: true | ProjectMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMemberMaxAggregateInputType
  }

  export type GetProjectMemberAggregateType<T extends ProjectMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectMember[P]>
      : GetScalarType<T[P], AggregateProjectMember[P]>
  }




  export type ProjectMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithAggregationInput | ProjectMemberOrderByWithAggregationInput[]
    by: ProjectMemberScalarFieldEnum[] | ProjectMemberScalarFieldEnum
    having?: ProjectMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectMemberCountAggregateInputType | true
    _min?: ProjectMemberMinAggregateInputType
    _max?: ProjectMemberMaxAggregateInputType
  }

  export type ProjectMemberGroupByOutputType = {
    projectId: string
    userId: string
    role: $Enums.ProjectRole
    createdAt: Date
    _count: ProjectMemberCountAggregateOutputType | null
    _min: ProjectMemberMinAggregateOutputType | null
    _max: ProjectMemberMaxAggregateOutputType | null
  }

  type GetProjectMemberGroupByPayload<T extends ProjectMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectMemberGroupByOutputType[P]>
        }
      >
    >


  export type ProjectMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    projectId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    projectId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    projectId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectScalar = {
    projectId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type ProjectMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"projectId" | "userId" | "role" | "createdAt", ExtArgs["result"]["projectMember"]>
  export type ProjectMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectMember"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      projectId: string
      userId: string
      role: $Enums.ProjectRole
      createdAt: Date
    }, ExtArgs["result"]["projectMember"]>
    composites: {}
  }

  type ProjectMemberGetPayload<S extends boolean | null | undefined | ProjectMemberDefaultArgs> = $Result.GetResult<Prisma.$ProjectMemberPayload, S>

  type ProjectMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectMemberCountAggregateInputType | true
    }

  export interface ProjectMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectMember'], meta: { name: 'ProjectMember' } }
    /**
     * Find zero or one ProjectMember that matches the filter.
     * @param {ProjectMemberFindUniqueArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectMemberFindUniqueArgs>(args: SelectSubset<T, ProjectMemberFindUniqueArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectMemberFindUniqueOrThrowArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindFirstArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectMemberFindFirstArgs>(args?: SelectSubset<T, ProjectMemberFindFirstArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindFirstOrThrowArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectMembers
     * const projectMembers = await prisma.projectMember.findMany()
     * 
     * // Get first 10 ProjectMembers
     * const projectMembers = await prisma.projectMember.findMany({ take: 10 })
     * 
     * // Only select the `projectId`
     * const projectMemberWithProjectIdOnly = await prisma.projectMember.findMany({ select: { projectId: true } })
     * 
     */
    findMany<T extends ProjectMemberFindManyArgs>(args?: SelectSubset<T, ProjectMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectMember.
     * @param {ProjectMemberCreateArgs} args - Arguments to create a ProjectMember.
     * @example
     * // Create one ProjectMember
     * const ProjectMember = await prisma.projectMember.create({
     *   data: {
     *     // ... data to create a ProjectMember
     *   }
     * })
     * 
     */
    create<T extends ProjectMemberCreateArgs>(args: SelectSubset<T, ProjectMemberCreateArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectMembers.
     * @param {ProjectMemberCreateManyArgs} args - Arguments to create many ProjectMembers.
     * @example
     * // Create many ProjectMembers
     * const projectMember = await prisma.projectMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectMemberCreateManyArgs>(args?: SelectSubset<T, ProjectMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectMembers and returns the data saved in the database.
     * @param {ProjectMemberCreateManyAndReturnArgs} args - Arguments to create many ProjectMembers.
     * @example
     * // Create many ProjectMembers
     * const projectMember = await prisma.projectMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectMembers and only return the `projectId`
     * const projectMemberWithProjectIdOnly = await prisma.projectMember.createManyAndReturn({
     *   select: { projectId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectMember.
     * @param {ProjectMemberDeleteArgs} args - Arguments to delete one ProjectMember.
     * @example
     * // Delete one ProjectMember
     * const ProjectMember = await prisma.projectMember.delete({
     *   where: {
     *     // ... filter to delete one ProjectMember
     *   }
     * })
     * 
     */
    delete<T extends ProjectMemberDeleteArgs>(args: SelectSubset<T, ProjectMemberDeleteArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectMember.
     * @param {ProjectMemberUpdateArgs} args - Arguments to update one ProjectMember.
     * @example
     * // Update one ProjectMember
     * const projectMember = await prisma.projectMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectMemberUpdateArgs>(args: SelectSubset<T, ProjectMemberUpdateArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectMembers.
     * @param {ProjectMemberDeleteManyArgs} args - Arguments to filter ProjectMembers to delete.
     * @example
     * // Delete a few ProjectMembers
     * const { count } = await prisma.projectMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectMemberDeleteManyArgs>(args?: SelectSubset<T, ProjectMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectMembers
     * const projectMember = await prisma.projectMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectMemberUpdateManyArgs>(args: SelectSubset<T, ProjectMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMembers and returns the data updated in the database.
     * @param {ProjectMemberUpdateManyAndReturnArgs} args - Arguments to update many ProjectMembers.
     * @example
     * // Update many ProjectMembers
     * const projectMember = await prisma.projectMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectMembers and only return the `projectId`
     * const projectMemberWithProjectIdOnly = await prisma.projectMember.updateManyAndReturn({
     *   select: { projectId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectMember.
     * @param {ProjectMemberUpsertArgs} args - Arguments to update or create a ProjectMember.
     * @example
     * // Update or create a ProjectMember
     * const projectMember = await prisma.projectMember.upsert({
     *   create: {
     *     // ... data to create a ProjectMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectMember we want to update
     *   }
     * })
     */
    upsert<T extends ProjectMemberUpsertArgs>(args: SelectSubset<T, ProjectMemberUpsertArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberCountArgs} args - Arguments to filter ProjectMembers to count.
     * @example
     * // Count the number of ProjectMembers
     * const count = await prisma.projectMember.count({
     *   where: {
     *     // ... the filter for the ProjectMembers we want to count
     *   }
     * })
    **/
    count<T extends ProjectMemberCountArgs>(
      args?: Subset<T, ProjectMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectMemberAggregateArgs>(args: Subset<T, ProjectMemberAggregateArgs>): Prisma.PrismaPromise<GetProjectMemberAggregateType<T>>

    /**
     * Group by ProjectMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectMemberGroupByArgs['orderBy'] }
        : { orderBy?: ProjectMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectMember model
   */
  readonly fields: ProjectMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectMember model
   */
  interface ProjectMemberFieldRefs {
    readonly projectId: FieldRef<"ProjectMember", 'String'>
    readonly userId: FieldRef<"ProjectMember", 'String'>
    readonly role: FieldRef<"ProjectMember", 'ProjectRole'>
    readonly createdAt: FieldRef<"ProjectMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectMember findUnique
   */
  export type ProjectMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember findUniqueOrThrow
   */
  export type ProjectMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember findFirst
   */
  export type ProjectMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMembers.
     */
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember findFirstOrThrow
   */
  export type ProjectMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMembers.
     */
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember findMany
   */
  export type ProjectMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMembers to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMembers.
     */
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember create
   */
  export type ProjectMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectMember.
     */
    data: XOR<ProjectMemberCreateInput, ProjectMemberUncheckedCreateInput>
  }

  /**
   * ProjectMember createMany
   */
  export type ProjectMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectMembers.
     */
    data: ProjectMemberCreateManyInput | ProjectMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectMember createManyAndReturn
   */
  export type ProjectMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectMembers.
     */
    data: ProjectMemberCreateManyInput | ProjectMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMember update
   */
  export type ProjectMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectMember.
     */
    data: XOR<ProjectMemberUpdateInput, ProjectMemberUncheckedUpdateInput>
    /**
     * Choose, which ProjectMember to update.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember updateMany
   */
  export type ProjectMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectMembers.
     */
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMembers to update
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to update.
     */
    limit?: number
  }

  /**
   * ProjectMember updateManyAndReturn
   */
  export type ProjectMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * The data used to update ProjectMembers.
     */
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMembers to update
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMember upsert
   */
  export type ProjectMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectMember to update in case it exists.
     */
    where: ProjectMemberWhereUniqueInput
    /**
     * In case the ProjectMember found by the `where` argument doesn't exist, create a new ProjectMember with this data.
     */
    create: XOR<ProjectMemberCreateInput, ProjectMemberUncheckedCreateInput>
    /**
     * In case the ProjectMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectMemberUpdateInput, ProjectMemberUncheckedUpdateInput>
  }

  /**
   * ProjectMember delete
   */
  export type ProjectMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter which ProjectMember to delete.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember deleteMany
   */
  export type ProjectMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMembers to delete
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to delete.
     */
    limit?: number
  }

  /**
   * ProjectMember without action
   */
  export type ProjectMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
  }


  /**
   * Model Scene
   */

  export type AggregateScene = {
    _count: SceneCountAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  export type SceneMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SceneMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SceneCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    data: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SceneMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SceneMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SceneCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SceneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scene to aggregate.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scenes
    **/
    _count?: true | SceneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SceneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SceneMaxAggregateInputType
  }

  export type GetSceneAggregateType<T extends SceneAggregateArgs> = {
        [P in keyof T & keyof AggregateScene]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScene[P]>
      : GetScalarType<T[P], AggregateScene[P]>
  }




  export type SceneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithAggregationInput | SceneOrderByWithAggregationInput[]
    by: SceneScalarFieldEnum[] | SceneScalarFieldEnum
    having?: SceneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SceneCountAggregateInputType | true
    _min?: SceneMinAggregateInputType
    _max?: SceneMaxAggregateInputType
  }

  export type SceneGroupByOutputType = {
    id: string
    projectId: string
    name: string
    data: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: SceneCountAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  type GetSceneGroupByPayload<T extends SceneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SceneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SceneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SceneGroupByOutputType[P]>
            : GetScalarType<T[P], SceneGroupByOutputType[P]>
        }
      >
    >


  export type SceneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    runs?: boolean | Scene$runsArgs<ExtArgs>
    _count?: boolean | SceneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SceneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "name" | "data" | "createdAt" | "updatedAt", ExtArgs["result"]["scene"]>
  export type SceneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    runs?: boolean | Scene$runsArgs<ExtArgs>
    _count?: boolean | SceneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SceneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SceneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ScenePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Scene"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      runs: Prisma.$SimulationRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      data: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["scene"]>
    composites: {}
  }

  type SceneGetPayload<S extends boolean | null | undefined | SceneDefaultArgs> = $Result.GetResult<Prisma.$ScenePayload, S>

  type SceneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SceneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SceneCountAggregateInputType | true
    }

  export interface SceneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Scene'], meta: { name: 'Scene' } }
    /**
     * Find zero or one Scene that matches the filter.
     * @param {SceneFindUniqueArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SceneFindUniqueArgs>(args: SelectSubset<T, SceneFindUniqueArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Scene that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SceneFindUniqueOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SceneFindUniqueOrThrowArgs>(args: SelectSubset<T, SceneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SceneFindFirstArgs>(args?: SelectSubset<T, SceneFindFirstArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SceneFindFirstOrThrowArgs>(args?: SelectSubset<T, SceneFindFirstOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Scenes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scenes
     * const scenes = await prisma.scene.findMany()
     * 
     * // Get first 10 Scenes
     * const scenes = await prisma.scene.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sceneWithIdOnly = await prisma.scene.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SceneFindManyArgs>(args?: SelectSubset<T, SceneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Scene.
     * @param {SceneCreateArgs} args - Arguments to create a Scene.
     * @example
     * // Create one Scene
     * const Scene = await prisma.scene.create({
     *   data: {
     *     // ... data to create a Scene
     *   }
     * })
     * 
     */
    create<T extends SceneCreateArgs>(args: SelectSubset<T, SceneCreateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Scenes.
     * @param {SceneCreateManyArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SceneCreateManyArgs>(args?: SelectSubset<T, SceneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scenes and returns the data saved in the database.
     * @param {SceneCreateManyAndReturnArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SceneCreateManyAndReturnArgs>(args?: SelectSubset<T, SceneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Scene.
     * @param {SceneDeleteArgs} args - Arguments to delete one Scene.
     * @example
     * // Delete one Scene
     * const Scene = await prisma.scene.delete({
     *   where: {
     *     // ... filter to delete one Scene
     *   }
     * })
     * 
     */
    delete<T extends SceneDeleteArgs>(args: SelectSubset<T, SceneDeleteArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Scene.
     * @param {SceneUpdateArgs} args - Arguments to update one Scene.
     * @example
     * // Update one Scene
     * const scene = await prisma.scene.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SceneUpdateArgs>(args: SelectSubset<T, SceneUpdateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Scenes.
     * @param {SceneDeleteManyArgs} args - Arguments to filter Scenes to delete.
     * @example
     * // Delete a few Scenes
     * const { count } = await prisma.scene.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SceneDeleteManyArgs>(args?: SelectSubset<T, SceneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SceneUpdateManyArgs>(args: SelectSubset<T, SceneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes and returns the data updated in the database.
     * @param {SceneUpdateManyAndReturnArgs} args - Arguments to update many Scenes.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SceneUpdateManyAndReturnArgs>(args: SelectSubset<T, SceneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Scene.
     * @param {SceneUpsertArgs} args - Arguments to update or create a Scene.
     * @example
     * // Update or create a Scene
     * const scene = await prisma.scene.upsert({
     *   create: {
     *     // ... data to create a Scene
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scene we want to update
     *   }
     * })
     */
    upsert<T extends SceneUpsertArgs>(args: SelectSubset<T, SceneUpsertArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneCountArgs} args - Arguments to filter Scenes to count.
     * @example
     * // Count the number of Scenes
     * const count = await prisma.scene.count({
     *   where: {
     *     // ... the filter for the Scenes we want to count
     *   }
     * })
    **/
    count<T extends SceneCountArgs>(
      args?: Subset<T, SceneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SceneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SceneAggregateArgs>(args: Subset<T, SceneAggregateArgs>): Prisma.PrismaPromise<GetSceneAggregateType<T>>

    /**
     * Group by Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SceneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SceneGroupByArgs['orderBy'] }
        : { orderBy?: SceneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SceneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSceneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Scene model
   */
  readonly fields: SceneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Scene.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SceneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    runs<T extends Scene$runsArgs<ExtArgs> = {}>(args?: Subset<T, Scene$runsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Scene model
   */
  interface SceneFieldRefs {
    readonly id: FieldRef<"Scene", 'String'>
    readonly projectId: FieldRef<"Scene", 'String'>
    readonly name: FieldRef<"Scene", 'String'>
    readonly data: FieldRef<"Scene", 'Json'>
    readonly createdAt: FieldRef<"Scene", 'DateTime'>
    readonly updatedAt: FieldRef<"Scene", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Scene findUnique
   */
  export type SceneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findUniqueOrThrow
   */
  export type SceneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findFirst
   */
  export type SceneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findFirstOrThrow
   */
  export type SceneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findMany
   */
  export type SceneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scenes to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene create
   */
  export type SceneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to create a Scene.
     */
    data: XOR<SceneCreateInput, SceneUncheckedCreateInput>
  }

  /**
   * Scene createMany
   */
  export type SceneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Scene createManyAndReturn
   */
  export type SceneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene update
   */
  export type SceneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to update a Scene.
     */
    data: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
    /**
     * Choose, which Scene to update.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene updateMany
   */
  export type SceneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
  }

  /**
   * Scene updateManyAndReturn
   */
  export type SceneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene upsert
   */
  export type SceneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The filter to search for the Scene to update in case it exists.
     */
    where: SceneWhereUniqueInput
    /**
     * In case the Scene found by the `where` argument doesn't exist, create a new Scene with this data.
     */
    create: XOR<SceneCreateInput, SceneUncheckedCreateInput>
    /**
     * In case the Scene was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
  }

  /**
   * Scene delete
   */
  export type SceneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter which Scene to delete.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene deleteMany
   */
  export type SceneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scenes to delete
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to delete.
     */
    limit?: number
  }

  /**
   * Scene.runs
   */
  export type Scene$runsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    where?: SimulationRunWhereInput
    orderBy?: SimulationRunOrderByWithRelationInput | SimulationRunOrderByWithRelationInput[]
    cursor?: SimulationRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SimulationRunScalarFieldEnum | SimulationRunScalarFieldEnum[]
  }

  /**
   * Scene without action
   */
  export type SceneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshHash: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshHash: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    refreshHash: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    refreshHash?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    refreshHash?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    refreshHash?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    refreshHash: string
    expiresAt: Date
    revokedAt: Date | null
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    refreshHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "refreshHash" | "expiresAt" | "revokedAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      refreshHash: string
      expiresAt: Date
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly refreshHash: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly revokedAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model SimulationRun
   */

  export type AggregateSimulationRun = {
    _count: SimulationRunCountAggregateOutputType | null
    _avg: SimulationRunAvgAggregateOutputType | null
    _sum: SimulationRunSumAggregateOutputType | null
    _min: SimulationRunMinAggregateOutputType | null
    _max: SimulationRunMaxAggregateOutputType | null
  }

  export type SimulationRunAvgAggregateOutputType = {
    engineVersion: number | null
    lastTick: number | null
  }

  export type SimulationRunSumAggregateOutputType = {
    engineVersion: number | null
    lastTick: number | null
  }

  export type SimulationRunMinAggregateOutputType = {
    id: string | null
    sceneId: string | null
    engineVersion: number | null
    status: $Enums.SimulationRunStatus | null
    lastTick: number | null
    startedAt: Date | null
    lastHeartbeatAt: Date | null
    endedAt: Date | null
  }

  export type SimulationRunMaxAggregateOutputType = {
    id: string | null
    sceneId: string | null
    engineVersion: number | null
    status: $Enums.SimulationRunStatus | null
    lastTick: number | null
    startedAt: Date | null
    lastHeartbeatAt: Date | null
    endedAt: Date | null
  }

  export type SimulationRunCountAggregateOutputType = {
    id: number
    sceneId: number
    setup: number
    engineVersion: number
    status: number
    lastTick: number
    startedAt: number
    lastHeartbeatAt: number
    endedAt: number
    _all: number
  }


  export type SimulationRunAvgAggregateInputType = {
    engineVersion?: true
    lastTick?: true
  }

  export type SimulationRunSumAggregateInputType = {
    engineVersion?: true
    lastTick?: true
  }

  export type SimulationRunMinAggregateInputType = {
    id?: true
    sceneId?: true
    engineVersion?: true
    status?: true
    lastTick?: true
    startedAt?: true
    lastHeartbeatAt?: true
    endedAt?: true
  }

  export type SimulationRunMaxAggregateInputType = {
    id?: true
    sceneId?: true
    engineVersion?: true
    status?: true
    lastTick?: true
    startedAt?: true
    lastHeartbeatAt?: true
    endedAt?: true
  }

  export type SimulationRunCountAggregateInputType = {
    id?: true
    sceneId?: true
    setup?: true
    engineVersion?: true
    status?: true
    lastTick?: true
    startedAt?: true
    lastHeartbeatAt?: true
    endedAt?: true
    _all?: true
  }

  export type SimulationRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationRun to aggregate.
     */
    where?: SimulationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRuns to fetch.
     */
    orderBy?: SimulationRunOrderByWithRelationInput | SimulationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SimulationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SimulationRuns
    **/
    _count?: true | SimulationRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SimulationRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SimulationRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SimulationRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SimulationRunMaxAggregateInputType
  }

  export type GetSimulationRunAggregateType<T extends SimulationRunAggregateArgs> = {
        [P in keyof T & keyof AggregateSimulationRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSimulationRun[P]>
      : GetScalarType<T[P], AggregateSimulationRun[P]>
  }




  export type SimulationRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationRunWhereInput
    orderBy?: SimulationRunOrderByWithAggregationInput | SimulationRunOrderByWithAggregationInput[]
    by: SimulationRunScalarFieldEnum[] | SimulationRunScalarFieldEnum
    having?: SimulationRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SimulationRunCountAggregateInputType | true
    _avg?: SimulationRunAvgAggregateInputType
    _sum?: SimulationRunSumAggregateInputType
    _min?: SimulationRunMinAggregateInputType
    _max?: SimulationRunMaxAggregateInputType
  }

  export type SimulationRunGroupByOutputType = {
    id: string
    sceneId: string
    setup: JsonValue
    engineVersion: number
    status: $Enums.SimulationRunStatus
    lastTick: number
    startedAt: Date
    lastHeartbeatAt: Date
    endedAt: Date | null
    _count: SimulationRunCountAggregateOutputType | null
    _avg: SimulationRunAvgAggregateOutputType | null
    _sum: SimulationRunSumAggregateOutputType | null
    _min: SimulationRunMinAggregateOutputType | null
    _max: SimulationRunMaxAggregateOutputType | null
  }

  type GetSimulationRunGroupByPayload<T extends SimulationRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SimulationRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SimulationRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SimulationRunGroupByOutputType[P]>
            : GetScalarType<T[P], SimulationRunGroupByOutputType[P]>
        }
      >
    >


  export type SimulationRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sceneId?: boolean
    setup?: boolean
    engineVersion?: boolean
    status?: boolean
    lastTick?: boolean
    startedAt?: boolean
    lastHeartbeatAt?: boolean
    endedAt?: boolean
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    chunks?: boolean | SimulationRun$chunksArgs<ExtArgs>
    checkpoints?: boolean | SimulationRun$checkpointsArgs<ExtArgs>
    metrics?: boolean | SimulationRun$metricsArgs<ExtArgs>
    _count?: boolean | SimulationRunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationRun"]>

  export type SimulationRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sceneId?: boolean
    setup?: boolean
    engineVersion?: boolean
    status?: boolean
    lastTick?: boolean
    startedAt?: boolean
    lastHeartbeatAt?: boolean
    endedAt?: boolean
    scene?: boolean | SceneDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationRun"]>

  export type SimulationRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sceneId?: boolean
    setup?: boolean
    engineVersion?: boolean
    status?: boolean
    lastTick?: boolean
    startedAt?: boolean
    lastHeartbeatAt?: boolean
    endedAt?: boolean
    scene?: boolean | SceneDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationRun"]>

  export type SimulationRunSelectScalar = {
    id?: boolean
    sceneId?: boolean
    setup?: boolean
    engineVersion?: boolean
    status?: boolean
    lastTick?: boolean
    startedAt?: boolean
    lastHeartbeatAt?: boolean
    endedAt?: boolean
  }

  export type SimulationRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sceneId" | "setup" | "engineVersion" | "status" | "lastTick" | "startedAt" | "lastHeartbeatAt" | "endedAt", ExtArgs["result"]["simulationRun"]>
  export type SimulationRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    chunks?: boolean | SimulationRun$chunksArgs<ExtArgs>
    checkpoints?: boolean | SimulationRun$checkpointsArgs<ExtArgs>
    metrics?: boolean | SimulationRun$metricsArgs<ExtArgs>
    _count?: boolean | SimulationRunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SimulationRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scene?: boolean | SceneDefaultArgs<ExtArgs>
  }
  export type SimulationRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scene?: boolean | SceneDefaultArgs<ExtArgs>
  }

  export type $SimulationRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SimulationRun"
    objects: {
      scene: Prisma.$ScenePayload<ExtArgs>
      chunks: Prisma.$SimulationRunChunkPayload<ExtArgs>[]
      checkpoints: Prisma.$SimulationCheckpointPayload<ExtArgs>[]
      metrics: Prisma.$SimulationMetricPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sceneId: string
      setup: Prisma.JsonValue
      engineVersion: number
      status: $Enums.SimulationRunStatus
      lastTick: number
      startedAt: Date
      lastHeartbeatAt: Date
      endedAt: Date | null
    }, ExtArgs["result"]["simulationRun"]>
    composites: {}
  }

  type SimulationRunGetPayload<S extends boolean | null | undefined | SimulationRunDefaultArgs> = $Result.GetResult<Prisma.$SimulationRunPayload, S>

  type SimulationRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SimulationRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SimulationRunCountAggregateInputType | true
    }

  export interface SimulationRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SimulationRun'], meta: { name: 'SimulationRun' } }
    /**
     * Find zero or one SimulationRun that matches the filter.
     * @param {SimulationRunFindUniqueArgs} args - Arguments to find a SimulationRun
     * @example
     * // Get one SimulationRun
     * const simulationRun = await prisma.simulationRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SimulationRunFindUniqueArgs>(args: SelectSubset<T, SimulationRunFindUniqueArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SimulationRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SimulationRunFindUniqueOrThrowArgs} args - Arguments to find a SimulationRun
     * @example
     * // Get one SimulationRun
     * const simulationRun = await prisma.simulationRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SimulationRunFindUniqueOrThrowArgs>(args: SelectSubset<T, SimulationRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunFindFirstArgs} args - Arguments to find a SimulationRun
     * @example
     * // Get one SimulationRun
     * const simulationRun = await prisma.simulationRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SimulationRunFindFirstArgs>(args?: SelectSubset<T, SimulationRunFindFirstArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunFindFirstOrThrowArgs} args - Arguments to find a SimulationRun
     * @example
     * // Get one SimulationRun
     * const simulationRun = await prisma.simulationRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SimulationRunFindFirstOrThrowArgs>(args?: SelectSubset<T, SimulationRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SimulationRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SimulationRuns
     * const simulationRuns = await prisma.simulationRun.findMany()
     * 
     * // Get first 10 SimulationRuns
     * const simulationRuns = await prisma.simulationRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const simulationRunWithIdOnly = await prisma.simulationRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SimulationRunFindManyArgs>(args?: SelectSubset<T, SimulationRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SimulationRun.
     * @param {SimulationRunCreateArgs} args - Arguments to create a SimulationRun.
     * @example
     * // Create one SimulationRun
     * const SimulationRun = await prisma.simulationRun.create({
     *   data: {
     *     // ... data to create a SimulationRun
     *   }
     * })
     * 
     */
    create<T extends SimulationRunCreateArgs>(args: SelectSubset<T, SimulationRunCreateArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SimulationRuns.
     * @param {SimulationRunCreateManyArgs} args - Arguments to create many SimulationRuns.
     * @example
     * // Create many SimulationRuns
     * const simulationRun = await prisma.simulationRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SimulationRunCreateManyArgs>(args?: SelectSubset<T, SimulationRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SimulationRuns and returns the data saved in the database.
     * @param {SimulationRunCreateManyAndReturnArgs} args - Arguments to create many SimulationRuns.
     * @example
     * // Create many SimulationRuns
     * const simulationRun = await prisma.simulationRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SimulationRuns and only return the `id`
     * const simulationRunWithIdOnly = await prisma.simulationRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SimulationRunCreateManyAndReturnArgs>(args?: SelectSubset<T, SimulationRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SimulationRun.
     * @param {SimulationRunDeleteArgs} args - Arguments to delete one SimulationRun.
     * @example
     * // Delete one SimulationRun
     * const SimulationRun = await prisma.simulationRun.delete({
     *   where: {
     *     // ... filter to delete one SimulationRun
     *   }
     * })
     * 
     */
    delete<T extends SimulationRunDeleteArgs>(args: SelectSubset<T, SimulationRunDeleteArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SimulationRun.
     * @param {SimulationRunUpdateArgs} args - Arguments to update one SimulationRun.
     * @example
     * // Update one SimulationRun
     * const simulationRun = await prisma.simulationRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SimulationRunUpdateArgs>(args: SelectSubset<T, SimulationRunUpdateArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SimulationRuns.
     * @param {SimulationRunDeleteManyArgs} args - Arguments to filter SimulationRuns to delete.
     * @example
     * // Delete a few SimulationRuns
     * const { count } = await prisma.simulationRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SimulationRunDeleteManyArgs>(args?: SelectSubset<T, SimulationRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SimulationRuns
     * const simulationRun = await prisma.simulationRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SimulationRunUpdateManyArgs>(args: SelectSubset<T, SimulationRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationRuns and returns the data updated in the database.
     * @param {SimulationRunUpdateManyAndReturnArgs} args - Arguments to update many SimulationRuns.
     * @example
     * // Update many SimulationRuns
     * const simulationRun = await prisma.simulationRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SimulationRuns and only return the `id`
     * const simulationRunWithIdOnly = await prisma.simulationRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SimulationRunUpdateManyAndReturnArgs>(args: SelectSubset<T, SimulationRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SimulationRun.
     * @param {SimulationRunUpsertArgs} args - Arguments to update or create a SimulationRun.
     * @example
     * // Update or create a SimulationRun
     * const simulationRun = await prisma.simulationRun.upsert({
     *   create: {
     *     // ... data to create a SimulationRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SimulationRun we want to update
     *   }
     * })
     */
    upsert<T extends SimulationRunUpsertArgs>(args: SelectSubset<T, SimulationRunUpsertArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SimulationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunCountArgs} args - Arguments to filter SimulationRuns to count.
     * @example
     * // Count the number of SimulationRuns
     * const count = await prisma.simulationRun.count({
     *   where: {
     *     // ... the filter for the SimulationRuns we want to count
     *   }
     * })
    **/
    count<T extends SimulationRunCountArgs>(
      args?: Subset<T, SimulationRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SimulationRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SimulationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SimulationRunAggregateArgs>(args: Subset<T, SimulationRunAggregateArgs>): Prisma.PrismaPromise<GetSimulationRunAggregateType<T>>

    /**
     * Group by SimulationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SimulationRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SimulationRunGroupByArgs['orderBy'] }
        : { orderBy?: SimulationRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SimulationRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSimulationRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SimulationRun model
   */
  readonly fields: SimulationRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SimulationRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SimulationRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scene<T extends SceneDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SceneDefaultArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chunks<T extends SimulationRun$chunksArgs<ExtArgs> = {}>(args?: Subset<T, SimulationRun$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checkpoints<T extends SimulationRun$checkpointsArgs<ExtArgs> = {}>(args?: Subset<T, SimulationRun$checkpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    metrics<T extends SimulationRun$metricsArgs<ExtArgs> = {}>(args?: Subset<T, SimulationRun$metricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SimulationRun model
   */
  interface SimulationRunFieldRefs {
    readonly id: FieldRef<"SimulationRun", 'String'>
    readonly sceneId: FieldRef<"SimulationRun", 'String'>
    readonly setup: FieldRef<"SimulationRun", 'Json'>
    readonly engineVersion: FieldRef<"SimulationRun", 'Int'>
    readonly status: FieldRef<"SimulationRun", 'SimulationRunStatus'>
    readonly lastTick: FieldRef<"SimulationRun", 'Int'>
    readonly startedAt: FieldRef<"SimulationRun", 'DateTime'>
    readonly lastHeartbeatAt: FieldRef<"SimulationRun", 'DateTime'>
    readonly endedAt: FieldRef<"SimulationRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SimulationRun findUnique
   */
  export type SimulationRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRun to fetch.
     */
    where: SimulationRunWhereUniqueInput
  }

  /**
   * SimulationRun findUniqueOrThrow
   */
  export type SimulationRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRun to fetch.
     */
    where: SimulationRunWhereUniqueInput
  }

  /**
   * SimulationRun findFirst
   */
  export type SimulationRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRun to fetch.
     */
    where?: SimulationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRuns to fetch.
     */
    orderBy?: SimulationRunOrderByWithRelationInput | SimulationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationRuns.
     */
    cursor?: SimulationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationRuns.
     */
    distinct?: SimulationRunScalarFieldEnum | SimulationRunScalarFieldEnum[]
  }

  /**
   * SimulationRun findFirstOrThrow
   */
  export type SimulationRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRun to fetch.
     */
    where?: SimulationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRuns to fetch.
     */
    orderBy?: SimulationRunOrderByWithRelationInput | SimulationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationRuns.
     */
    cursor?: SimulationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationRuns.
     */
    distinct?: SimulationRunScalarFieldEnum | SimulationRunScalarFieldEnum[]
  }

  /**
   * SimulationRun findMany
   */
  export type SimulationRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRuns to fetch.
     */
    where?: SimulationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRuns to fetch.
     */
    orderBy?: SimulationRunOrderByWithRelationInput | SimulationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SimulationRuns.
     */
    cursor?: SimulationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationRuns.
     */
    distinct?: SimulationRunScalarFieldEnum | SimulationRunScalarFieldEnum[]
  }

  /**
   * SimulationRun create
   */
  export type SimulationRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * The data needed to create a SimulationRun.
     */
    data: XOR<SimulationRunCreateInput, SimulationRunUncheckedCreateInput>
  }

  /**
   * SimulationRun createMany
   */
  export type SimulationRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SimulationRuns.
     */
    data: SimulationRunCreateManyInput | SimulationRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SimulationRun createManyAndReturn
   */
  export type SimulationRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * The data used to create many SimulationRuns.
     */
    data: SimulationRunCreateManyInput | SimulationRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationRun update
   */
  export type SimulationRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * The data needed to update a SimulationRun.
     */
    data: XOR<SimulationRunUpdateInput, SimulationRunUncheckedUpdateInput>
    /**
     * Choose, which SimulationRun to update.
     */
    where: SimulationRunWhereUniqueInput
  }

  /**
   * SimulationRun updateMany
   */
  export type SimulationRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SimulationRuns.
     */
    data: XOR<SimulationRunUpdateManyMutationInput, SimulationRunUncheckedUpdateManyInput>
    /**
     * Filter which SimulationRuns to update
     */
    where?: SimulationRunWhereInput
    /**
     * Limit how many SimulationRuns to update.
     */
    limit?: number
  }

  /**
   * SimulationRun updateManyAndReturn
   */
  export type SimulationRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * The data used to update SimulationRuns.
     */
    data: XOR<SimulationRunUpdateManyMutationInput, SimulationRunUncheckedUpdateManyInput>
    /**
     * Filter which SimulationRuns to update
     */
    where?: SimulationRunWhereInput
    /**
     * Limit how many SimulationRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationRun upsert
   */
  export type SimulationRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * The filter to search for the SimulationRun to update in case it exists.
     */
    where: SimulationRunWhereUniqueInput
    /**
     * In case the SimulationRun found by the `where` argument doesn't exist, create a new SimulationRun with this data.
     */
    create: XOR<SimulationRunCreateInput, SimulationRunUncheckedCreateInput>
    /**
     * In case the SimulationRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SimulationRunUpdateInput, SimulationRunUncheckedUpdateInput>
  }

  /**
   * SimulationRun delete
   */
  export type SimulationRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
    /**
     * Filter which SimulationRun to delete.
     */
    where: SimulationRunWhereUniqueInput
  }

  /**
   * SimulationRun deleteMany
   */
  export type SimulationRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationRuns to delete
     */
    where?: SimulationRunWhereInput
    /**
     * Limit how many SimulationRuns to delete.
     */
    limit?: number
  }

  /**
   * SimulationRun.chunks
   */
  export type SimulationRun$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    where?: SimulationRunChunkWhereInput
    orderBy?: SimulationRunChunkOrderByWithRelationInput | SimulationRunChunkOrderByWithRelationInput[]
    cursor?: SimulationRunChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SimulationRunChunkScalarFieldEnum | SimulationRunChunkScalarFieldEnum[]
  }

  /**
   * SimulationRun.checkpoints
   */
  export type SimulationRun$checkpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    where?: SimulationCheckpointWhereInput
    orderBy?: SimulationCheckpointOrderByWithRelationInput | SimulationCheckpointOrderByWithRelationInput[]
    cursor?: SimulationCheckpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SimulationCheckpointScalarFieldEnum | SimulationCheckpointScalarFieldEnum[]
  }

  /**
   * SimulationRun.metrics
   */
  export type SimulationRun$metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    where?: SimulationMetricWhereInput
    orderBy?: SimulationMetricOrderByWithRelationInput | SimulationMetricOrderByWithRelationInput[]
    cursor?: SimulationMetricWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SimulationMetricScalarFieldEnum | SimulationMetricScalarFieldEnum[]
  }

  /**
   * SimulationRun without action
   */
  export type SimulationRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRun
     */
    select?: SimulationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRun
     */
    omit?: SimulationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunInclude<ExtArgs> | null
  }


  /**
   * Model SimulationRunChunk
   */

  export type AggregateSimulationRunChunk = {
    _count: SimulationRunChunkCountAggregateOutputType | null
    _avg: SimulationRunChunkAvgAggregateOutputType | null
    _sum: SimulationRunChunkSumAggregateOutputType | null
    _min: SimulationRunChunkMinAggregateOutputType | null
    _max: SimulationRunChunkMaxAggregateOutputType | null
  }

  export type SimulationRunChunkAvgAggregateOutputType = {
    seq: number | null
    fromTick: number | null
    toTick: number | null
  }

  export type SimulationRunChunkSumAggregateOutputType = {
    seq: number | null
    fromTick: number | null
    toTick: number | null
  }

  export type SimulationRunChunkMinAggregateOutputType = {
    runId: string | null
    seq: number | null
    fromTick: number | null
    toTick: number | null
    createdAt: Date | null
  }

  export type SimulationRunChunkMaxAggregateOutputType = {
    runId: string | null
    seq: number | null
    fromTick: number | null
    toTick: number | null
    createdAt: Date | null
  }

  export type SimulationRunChunkCountAggregateOutputType = {
    runId: number
    seq: number
    fromTick: number
    toTick: number
    commands: number
    events: number
    createdAt: number
    _all: number
  }


  export type SimulationRunChunkAvgAggregateInputType = {
    seq?: true
    fromTick?: true
    toTick?: true
  }

  export type SimulationRunChunkSumAggregateInputType = {
    seq?: true
    fromTick?: true
    toTick?: true
  }

  export type SimulationRunChunkMinAggregateInputType = {
    runId?: true
    seq?: true
    fromTick?: true
    toTick?: true
    createdAt?: true
  }

  export type SimulationRunChunkMaxAggregateInputType = {
    runId?: true
    seq?: true
    fromTick?: true
    toTick?: true
    createdAt?: true
  }

  export type SimulationRunChunkCountAggregateInputType = {
    runId?: true
    seq?: true
    fromTick?: true
    toTick?: true
    commands?: true
    events?: true
    createdAt?: true
    _all?: true
  }

  export type SimulationRunChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationRunChunk to aggregate.
     */
    where?: SimulationRunChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRunChunks to fetch.
     */
    orderBy?: SimulationRunChunkOrderByWithRelationInput | SimulationRunChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SimulationRunChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRunChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRunChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SimulationRunChunks
    **/
    _count?: true | SimulationRunChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SimulationRunChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SimulationRunChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SimulationRunChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SimulationRunChunkMaxAggregateInputType
  }

  export type GetSimulationRunChunkAggregateType<T extends SimulationRunChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateSimulationRunChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSimulationRunChunk[P]>
      : GetScalarType<T[P], AggregateSimulationRunChunk[P]>
  }




  export type SimulationRunChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationRunChunkWhereInput
    orderBy?: SimulationRunChunkOrderByWithAggregationInput | SimulationRunChunkOrderByWithAggregationInput[]
    by: SimulationRunChunkScalarFieldEnum[] | SimulationRunChunkScalarFieldEnum
    having?: SimulationRunChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SimulationRunChunkCountAggregateInputType | true
    _avg?: SimulationRunChunkAvgAggregateInputType
    _sum?: SimulationRunChunkSumAggregateInputType
    _min?: SimulationRunChunkMinAggregateInputType
    _max?: SimulationRunChunkMaxAggregateInputType
  }

  export type SimulationRunChunkGroupByOutputType = {
    runId: string
    seq: number
    fromTick: number
    toTick: number
    commands: JsonValue
    events: JsonValue
    createdAt: Date
    _count: SimulationRunChunkCountAggregateOutputType | null
    _avg: SimulationRunChunkAvgAggregateOutputType | null
    _sum: SimulationRunChunkSumAggregateOutputType | null
    _min: SimulationRunChunkMinAggregateOutputType | null
    _max: SimulationRunChunkMaxAggregateOutputType | null
  }

  type GetSimulationRunChunkGroupByPayload<T extends SimulationRunChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SimulationRunChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SimulationRunChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SimulationRunChunkGroupByOutputType[P]>
            : GetScalarType<T[P], SimulationRunChunkGroupByOutputType[P]>
        }
      >
    >


  export type SimulationRunChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    seq?: boolean
    fromTick?: boolean
    toTick?: boolean
    commands?: boolean
    events?: boolean
    createdAt?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationRunChunk"]>

  export type SimulationRunChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    seq?: boolean
    fromTick?: boolean
    toTick?: boolean
    commands?: boolean
    events?: boolean
    createdAt?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationRunChunk"]>

  export type SimulationRunChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    seq?: boolean
    fromTick?: boolean
    toTick?: boolean
    commands?: boolean
    events?: boolean
    createdAt?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationRunChunk"]>

  export type SimulationRunChunkSelectScalar = {
    runId?: boolean
    seq?: boolean
    fromTick?: boolean
    toTick?: boolean
    commands?: boolean
    events?: boolean
    createdAt?: boolean
  }

  export type SimulationRunChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"runId" | "seq" | "fromTick" | "toTick" | "commands" | "events" | "createdAt", ExtArgs["result"]["simulationRunChunk"]>
  export type SimulationRunChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }
  export type SimulationRunChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }
  export type SimulationRunChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }

  export type $SimulationRunChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SimulationRunChunk"
    objects: {
      run: Prisma.$SimulationRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      runId: string
      seq: number
      fromTick: number
      toTick: number
      commands: Prisma.JsonValue
      events: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["simulationRunChunk"]>
    composites: {}
  }

  type SimulationRunChunkGetPayload<S extends boolean | null | undefined | SimulationRunChunkDefaultArgs> = $Result.GetResult<Prisma.$SimulationRunChunkPayload, S>

  type SimulationRunChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SimulationRunChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SimulationRunChunkCountAggregateInputType | true
    }

  export interface SimulationRunChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SimulationRunChunk'], meta: { name: 'SimulationRunChunk' } }
    /**
     * Find zero or one SimulationRunChunk that matches the filter.
     * @param {SimulationRunChunkFindUniqueArgs} args - Arguments to find a SimulationRunChunk
     * @example
     * // Get one SimulationRunChunk
     * const simulationRunChunk = await prisma.simulationRunChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SimulationRunChunkFindUniqueArgs>(args: SelectSubset<T, SimulationRunChunkFindUniqueArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SimulationRunChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SimulationRunChunkFindUniqueOrThrowArgs} args - Arguments to find a SimulationRunChunk
     * @example
     * // Get one SimulationRunChunk
     * const simulationRunChunk = await prisma.simulationRunChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SimulationRunChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, SimulationRunChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationRunChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunChunkFindFirstArgs} args - Arguments to find a SimulationRunChunk
     * @example
     * // Get one SimulationRunChunk
     * const simulationRunChunk = await prisma.simulationRunChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SimulationRunChunkFindFirstArgs>(args?: SelectSubset<T, SimulationRunChunkFindFirstArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationRunChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunChunkFindFirstOrThrowArgs} args - Arguments to find a SimulationRunChunk
     * @example
     * // Get one SimulationRunChunk
     * const simulationRunChunk = await prisma.simulationRunChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SimulationRunChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, SimulationRunChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SimulationRunChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SimulationRunChunks
     * const simulationRunChunks = await prisma.simulationRunChunk.findMany()
     * 
     * // Get first 10 SimulationRunChunks
     * const simulationRunChunks = await prisma.simulationRunChunk.findMany({ take: 10 })
     * 
     * // Only select the `runId`
     * const simulationRunChunkWithRunIdOnly = await prisma.simulationRunChunk.findMany({ select: { runId: true } })
     * 
     */
    findMany<T extends SimulationRunChunkFindManyArgs>(args?: SelectSubset<T, SimulationRunChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SimulationRunChunk.
     * @param {SimulationRunChunkCreateArgs} args - Arguments to create a SimulationRunChunk.
     * @example
     * // Create one SimulationRunChunk
     * const SimulationRunChunk = await prisma.simulationRunChunk.create({
     *   data: {
     *     // ... data to create a SimulationRunChunk
     *   }
     * })
     * 
     */
    create<T extends SimulationRunChunkCreateArgs>(args: SelectSubset<T, SimulationRunChunkCreateArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SimulationRunChunks.
     * @param {SimulationRunChunkCreateManyArgs} args - Arguments to create many SimulationRunChunks.
     * @example
     * // Create many SimulationRunChunks
     * const simulationRunChunk = await prisma.simulationRunChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SimulationRunChunkCreateManyArgs>(args?: SelectSubset<T, SimulationRunChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SimulationRunChunks and returns the data saved in the database.
     * @param {SimulationRunChunkCreateManyAndReturnArgs} args - Arguments to create many SimulationRunChunks.
     * @example
     * // Create many SimulationRunChunks
     * const simulationRunChunk = await prisma.simulationRunChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SimulationRunChunks and only return the `runId`
     * const simulationRunChunkWithRunIdOnly = await prisma.simulationRunChunk.createManyAndReturn({
     *   select: { runId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SimulationRunChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, SimulationRunChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SimulationRunChunk.
     * @param {SimulationRunChunkDeleteArgs} args - Arguments to delete one SimulationRunChunk.
     * @example
     * // Delete one SimulationRunChunk
     * const SimulationRunChunk = await prisma.simulationRunChunk.delete({
     *   where: {
     *     // ... filter to delete one SimulationRunChunk
     *   }
     * })
     * 
     */
    delete<T extends SimulationRunChunkDeleteArgs>(args: SelectSubset<T, SimulationRunChunkDeleteArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SimulationRunChunk.
     * @param {SimulationRunChunkUpdateArgs} args - Arguments to update one SimulationRunChunk.
     * @example
     * // Update one SimulationRunChunk
     * const simulationRunChunk = await prisma.simulationRunChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SimulationRunChunkUpdateArgs>(args: SelectSubset<T, SimulationRunChunkUpdateArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SimulationRunChunks.
     * @param {SimulationRunChunkDeleteManyArgs} args - Arguments to filter SimulationRunChunks to delete.
     * @example
     * // Delete a few SimulationRunChunks
     * const { count } = await prisma.simulationRunChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SimulationRunChunkDeleteManyArgs>(args?: SelectSubset<T, SimulationRunChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationRunChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SimulationRunChunks
     * const simulationRunChunk = await prisma.simulationRunChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SimulationRunChunkUpdateManyArgs>(args: SelectSubset<T, SimulationRunChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationRunChunks and returns the data updated in the database.
     * @param {SimulationRunChunkUpdateManyAndReturnArgs} args - Arguments to update many SimulationRunChunks.
     * @example
     * // Update many SimulationRunChunks
     * const simulationRunChunk = await prisma.simulationRunChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SimulationRunChunks and only return the `runId`
     * const simulationRunChunkWithRunIdOnly = await prisma.simulationRunChunk.updateManyAndReturn({
     *   select: { runId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SimulationRunChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, SimulationRunChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SimulationRunChunk.
     * @param {SimulationRunChunkUpsertArgs} args - Arguments to update or create a SimulationRunChunk.
     * @example
     * // Update or create a SimulationRunChunk
     * const simulationRunChunk = await prisma.simulationRunChunk.upsert({
     *   create: {
     *     // ... data to create a SimulationRunChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SimulationRunChunk we want to update
     *   }
     * })
     */
    upsert<T extends SimulationRunChunkUpsertArgs>(args: SelectSubset<T, SimulationRunChunkUpsertArgs<ExtArgs>>): Prisma__SimulationRunChunkClient<$Result.GetResult<Prisma.$SimulationRunChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SimulationRunChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunChunkCountArgs} args - Arguments to filter SimulationRunChunks to count.
     * @example
     * // Count the number of SimulationRunChunks
     * const count = await prisma.simulationRunChunk.count({
     *   where: {
     *     // ... the filter for the SimulationRunChunks we want to count
     *   }
     * })
    **/
    count<T extends SimulationRunChunkCountArgs>(
      args?: Subset<T, SimulationRunChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SimulationRunChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SimulationRunChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SimulationRunChunkAggregateArgs>(args: Subset<T, SimulationRunChunkAggregateArgs>): Prisma.PrismaPromise<GetSimulationRunChunkAggregateType<T>>

    /**
     * Group by SimulationRunChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationRunChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SimulationRunChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SimulationRunChunkGroupByArgs['orderBy'] }
        : { orderBy?: SimulationRunChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SimulationRunChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSimulationRunChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SimulationRunChunk model
   */
  readonly fields: SimulationRunChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SimulationRunChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SimulationRunChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends SimulationRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SimulationRunDefaultArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SimulationRunChunk model
   */
  interface SimulationRunChunkFieldRefs {
    readonly runId: FieldRef<"SimulationRunChunk", 'String'>
    readonly seq: FieldRef<"SimulationRunChunk", 'Int'>
    readonly fromTick: FieldRef<"SimulationRunChunk", 'Int'>
    readonly toTick: FieldRef<"SimulationRunChunk", 'Int'>
    readonly commands: FieldRef<"SimulationRunChunk", 'Json'>
    readonly events: FieldRef<"SimulationRunChunk", 'Json'>
    readonly createdAt: FieldRef<"SimulationRunChunk", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SimulationRunChunk findUnique
   */
  export type SimulationRunChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRunChunk to fetch.
     */
    where: SimulationRunChunkWhereUniqueInput
  }

  /**
   * SimulationRunChunk findUniqueOrThrow
   */
  export type SimulationRunChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRunChunk to fetch.
     */
    where: SimulationRunChunkWhereUniqueInput
  }

  /**
   * SimulationRunChunk findFirst
   */
  export type SimulationRunChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRunChunk to fetch.
     */
    where?: SimulationRunChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRunChunks to fetch.
     */
    orderBy?: SimulationRunChunkOrderByWithRelationInput | SimulationRunChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationRunChunks.
     */
    cursor?: SimulationRunChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRunChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRunChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationRunChunks.
     */
    distinct?: SimulationRunChunkScalarFieldEnum | SimulationRunChunkScalarFieldEnum[]
  }

  /**
   * SimulationRunChunk findFirstOrThrow
   */
  export type SimulationRunChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRunChunk to fetch.
     */
    where?: SimulationRunChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRunChunks to fetch.
     */
    orderBy?: SimulationRunChunkOrderByWithRelationInput | SimulationRunChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationRunChunks.
     */
    cursor?: SimulationRunChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRunChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRunChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationRunChunks.
     */
    distinct?: SimulationRunChunkScalarFieldEnum | SimulationRunChunkScalarFieldEnum[]
  }

  /**
   * SimulationRunChunk findMany
   */
  export type SimulationRunChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * Filter, which SimulationRunChunks to fetch.
     */
    where?: SimulationRunChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationRunChunks to fetch.
     */
    orderBy?: SimulationRunChunkOrderByWithRelationInput | SimulationRunChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SimulationRunChunks.
     */
    cursor?: SimulationRunChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationRunChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationRunChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationRunChunks.
     */
    distinct?: SimulationRunChunkScalarFieldEnum | SimulationRunChunkScalarFieldEnum[]
  }

  /**
   * SimulationRunChunk create
   */
  export type SimulationRunChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a SimulationRunChunk.
     */
    data: XOR<SimulationRunChunkCreateInput, SimulationRunChunkUncheckedCreateInput>
  }

  /**
   * SimulationRunChunk createMany
   */
  export type SimulationRunChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SimulationRunChunks.
     */
    data: SimulationRunChunkCreateManyInput | SimulationRunChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SimulationRunChunk createManyAndReturn
   */
  export type SimulationRunChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * The data used to create many SimulationRunChunks.
     */
    data: SimulationRunChunkCreateManyInput | SimulationRunChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationRunChunk update
   */
  export type SimulationRunChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a SimulationRunChunk.
     */
    data: XOR<SimulationRunChunkUpdateInput, SimulationRunChunkUncheckedUpdateInput>
    /**
     * Choose, which SimulationRunChunk to update.
     */
    where: SimulationRunChunkWhereUniqueInput
  }

  /**
   * SimulationRunChunk updateMany
   */
  export type SimulationRunChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SimulationRunChunks.
     */
    data: XOR<SimulationRunChunkUpdateManyMutationInput, SimulationRunChunkUncheckedUpdateManyInput>
    /**
     * Filter which SimulationRunChunks to update
     */
    where?: SimulationRunChunkWhereInput
    /**
     * Limit how many SimulationRunChunks to update.
     */
    limit?: number
  }

  /**
   * SimulationRunChunk updateManyAndReturn
   */
  export type SimulationRunChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * The data used to update SimulationRunChunks.
     */
    data: XOR<SimulationRunChunkUpdateManyMutationInput, SimulationRunChunkUncheckedUpdateManyInput>
    /**
     * Filter which SimulationRunChunks to update
     */
    where?: SimulationRunChunkWhereInput
    /**
     * Limit how many SimulationRunChunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationRunChunk upsert
   */
  export type SimulationRunChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the SimulationRunChunk to update in case it exists.
     */
    where: SimulationRunChunkWhereUniqueInput
    /**
     * In case the SimulationRunChunk found by the `where` argument doesn't exist, create a new SimulationRunChunk with this data.
     */
    create: XOR<SimulationRunChunkCreateInput, SimulationRunChunkUncheckedCreateInput>
    /**
     * In case the SimulationRunChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SimulationRunChunkUpdateInput, SimulationRunChunkUncheckedUpdateInput>
  }

  /**
   * SimulationRunChunk delete
   */
  export type SimulationRunChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
    /**
     * Filter which SimulationRunChunk to delete.
     */
    where: SimulationRunChunkWhereUniqueInput
  }

  /**
   * SimulationRunChunk deleteMany
   */
  export type SimulationRunChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationRunChunks to delete
     */
    where?: SimulationRunChunkWhereInput
    /**
     * Limit how many SimulationRunChunks to delete.
     */
    limit?: number
  }

  /**
   * SimulationRunChunk without action
   */
  export type SimulationRunChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationRunChunk
     */
    select?: SimulationRunChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationRunChunk
     */
    omit?: SimulationRunChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationRunChunkInclude<ExtArgs> | null
  }


  /**
   * Model SimulationCheckpoint
   */

  export type AggregateSimulationCheckpoint = {
    _count: SimulationCheckpointCountAggregateOutputType | null
    _avg: SimulationCheckpointAvgAggregateOutputType | null
    _sum: SimulationCheckpointSumAggregateOutputType | null
    _min: SimulationCheckpointMinAggregateOutputType | null
    _max: SimulationCheckpointMaxAggregateOutputType | null
  }

  export type SimulationCheckpointAvgAggregateOutputType = {
    tick: number | null
  }

  export type SimulationCheckpointSumAggregateOutputType = {
    tick: number | null
  }

  export type SimulationCheckpointMinAggregateOutputType = {
    runId: string | null
    tick: number | null
    hash: string | null
  }

  export type SimulationCheckpointMaxAggregateOutputType = {
    runId: string | null
    tick: number | null
    hash: string | null
  }

  export type SimulationCheckpointCountAggregateOutputType = {
    runId: number
    tick: number
    hash: number
    state: number
    _all: number
  }


  export type SimulationCheckpointAvgAggregateInputType = {
    tick?: true
  }

  export type SimulationCheckpointSumAggregateInputType = {
    tick?: true
  }

  export type SimulationCheckpointMinAggregateInputType = {
    runId?: true
    tick?: true
    hash?: true
  }

  export type SimulationCheckpointMaxAggregateInputType = {
    runId?: true
    tick?: true
    hash?: true
  }

  export type SimulationCheckpointCountAggregateInputType = {
    runId?: true
    tick?: true
    hash?: true
    state?: true
    _all?: true
  }

  export type SimulationCheckpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationCheckpoint to aggregate.
     */
    where?: SimulationCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationCheckpoints to fetch.
     */
    orderBy?: SimulationCheckpointOrderByWithRelationInput | SimulationCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SimulationCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SimulationCheckpoints
    **/
    _count?: true | SimulationCheckpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SimulationCheckpointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SimulationCheckpointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SimulationCheckpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SimulationCheckpointMaxAggregateInputType
  }

  export type GetSimulationCheckpointAggregateType<T extends SimulationCheckpointAggregateArgs> = {
        [P in keyof T & keyof AggregateSimulationCheckpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSimulationCheckpoint[P]>
      : GetScalarType<T[P], AggregateSimulationCheckpoint[P]>
  }




  export type SimulationCheckpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationCheckpointWhereInput
    orderBy?: SimulationCheckpointOrderByWithAggregationInput | SimulationCheckpointOrderByWithAggregationInput[]
    by: SimulationCheckpointScalarFieldEnum[] | SimulationCheckpointScalarFieldEnum
    having?: SimulationCheckpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SimulationCheckpointCountAggregateInputType | true
    _avg?: SimulationCheckpointAvgAggregateInputType
    _sum?: SimulationCheckpointSumAggregateInputType
    _min?: SimulationCheckpointMinAggregateInputType
    _max?: SimulationCheckpointMaxAggregateInputType
  }

  export type SimulationCheckpointGroupByOutputType = {
    runId: string
    tick: number
    hash: string
    state: JsonValue
    _count: SimulationCheckpointCountAggregateOutputType | null
    _avg: SimulationCheckpointAvgAggregateOutputType | null
    _sum: SimulationCheckpointSumAggregateOutputType | null
    _min: SimulationCheckpointMinAggregateOutputType | null
    _max: SimulationCheckpointMaxAggregateOutputType | null
  }

  type GetSimulationCheckpointGroupByPayload<T extends SimulationCheckpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SimulationCheckpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SimulationCheckpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SimulationCheckpointGroupByOutputType[P]>
            : GetScalarType<T[P], SimulationCheckpointGroupByOutputType[P]>
        }
      >
    >


  export type SimulationCheckpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    tick?: boolean
    hash?: boolean
    state?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationCheckpoint"]>

  export type SimulationCheckpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    tick?: boolean
    hash?: boolean
    state?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationCheckpoint"]>

  export type SimulationCheckpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    tick?: boolean
    hash?: boolean
    state?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationCheckpoint"]>

  export type SimulationCheckpointSelectScalar = {
    runId?: boolean
    tick?: boolean
    hash?: boolean
    state?: boolean
  }

  export type SimulationCheckpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"runId" | "tick" | "hash" | "state", ExtArgs["result"]["simulationCheckpoint"]>
  export type SimulationCheckpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }
  export type SimulationCheckpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }
  export type SimulationCheckpointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }

  export type $SimulationCheckpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SimulationCheckpoint"
    objects: {
      run: Prisma.$SimulationRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      runId: string
      tick: number
      hash: string
      state: Prisma.JsonValue
    }, ExtArgs["result"]["simulationCheckpoint"]>
    composites: {}
  }

  type SimulationCheckpointGetPayload<S extends boolean | null | undefined | SimulationCheckpointDefaultArgs> = $Result.GetResult<Prisma.$SimulationCheckpointPayload, S>

  type SimulationCheckpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SimulationCheckpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SimulationCheckpointCountAggregateInputType | true
    }

  export interface SimulationCheckpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SimulationCheckpoint'], meta: { name: 'SimulationCheckpoint' } }
    /**
     * Find zero or one SimulationCheckpoint that matches the filter.
     * @param {SimulationCheckpointFindUniqueArgs} args - Arguments to find a SimulationCheckpoint
     * @example
     * // Get one SimulationCheckpoint
     * const simulationCheckpoint = await prisma.simulationCheckpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SimulationCheckpointFindUniqueArgs>(args: SelectSubset<T, SimulationCheckpointFindUniqueArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SimulationCheckpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SimulationCheckpointFindUniqueOrThrowArgs} args - Arguments to find a SimulationCheckpoint
     * @example
     * // Get one SimulationCheckpoint
     * const simulationCheckpoint = await prisma.simulationCheckpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SimulationCheckpointFindUniqueOrThrowArgs>(args: SelectSubset<T, SimulationCheckpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationCheckpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationCheckpointFindFirstArgs} args - Arguments to find a SimulationCheckpoint
     * @example
     * // Get one SimulationCheckpoint
     * const simulationCheckpoint = await prisma.simulationCheckpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SimulationCheckpointFindFirstArgs>(args?: SelectSubset<T, SimulationCheckpointFindFirstArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationCheckpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationCheckpointFindFirstOrThrowArgs} args - Arguments to find a SimulationCheckpoint
     * @example
     * // Get one SimulationCheckpoint
     * const simulationCheckpoint = await prisma.simulationCheckpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SimulationCheckpointFindFirstOrThrowArgs>(args?: SelectSubset<T, SimulationCheckpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SimulationCheckpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationCheckpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SimulationCheckpoints
     * const simulationCheckpoints = await prisma.simulationCheckpoint.findMany()
     * 
     * // Get first 10 SimulationCheckpoints
     * const simulationCheckpoints = await prisma.simulationCheckpoint.findMany({ take: 10 })
     * 
     * // Only select the `runId`
     * const simulationCheckpointWithRunIdOnly = await prisma.simulationCheckpoint.findMany({ select: { runId: true } })
     * 
     */
    findMany<T extends SimulationCheckpointFindManyArgs>(args?: SelectSubset<T, SimulationCheckpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SimulationCheckpoint.
     * @param {SimulationCheckpointCreateArgs} args - Arguments to create a SimulationCheckpoint.
     * @example
     * // Create one SimulationCheckpoint
     * const SimulationCheckpoint = await prisma.simulationCheckpoint.create({
     *   data: {
     *     // ... data to create a SimulationCheckpoint
     *   }
     * })
     * 
     */
    create<T extends SimulationCheckpointCreateArgs>(args: SelectSubset<T, SimulationCheckpointCreateArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SimulationCheckpoints.
     * @param {SimulationCheckpointCreateManyArgs} args - Arguments to create many SimulationCheckpoints.
     * @example
     * // Create many SimulationCheckpoints
     * const simulationCheckpoint = await prisma.simulationCheckpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SimulationCheckpointCreateManyArgs>(args?: SelectSubset<T, SimulationCheckpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SimulationCheckpoints and returns the data saved in the database.
     * @param {SimulationCheckpointCreateManyAndReturnArgs} args - Arguments to create many SimulationCheckpoints.
     * @example
     * // Create many SimulationCheckpoints
     * const simulationCheckpoint = await prisma.simulationCheckpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SimulationCheckpoints and only return the `runId`
     * const simulationCheckpointWithRunIdOnly = await prisma.simulationCheckpoint.createManyAndReturn({
     *   select: { runId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SimulationCheckpointCreateManyAndReturnArgs>(args?: SelectSubset<T, SimulationCheckpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SimulationCheckpoint.
     * @param {SimulationCheckpointDeleteArgs} args - Arguments to delete one SimulationCheckpoint.
     * @example
     * // Delete one SimulationCheckpoint
     * const SimulationCheckpoint = await prisma.simulationCheckpoint.delete({
     *   where: {
     *     // ... filter to delete one SimulationCheckpoint
     *   }
     * })
     * 
     */
    delete<T extends SimulationCheckpointDeleteArgs>(args: SelectSubset<T, SimulationCheckpointDeleteArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SimulationCheckpoint.
     * @param {SimulationCheckpointUpdateArgs} args - Arguments to update one SimulationCheckpoint.
     * @example
     * // Update one SimulationCheckpoint
     * const simulationCheckpoint = await prisma.simulationCheckpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SimulationCheckpointUpdateArgs>(args: SelectSubset<T, SimulationCheckpointUpdateArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SimulationCheckpoints.
     * @param {SimulationCheckpointDeleteManyArgs} args - Arguments to filter SimulationCheckpoints to delete.
     * @example
     * // Delete a few SimulationCheckpoints
     * const { count } = await prisma.simulationCheckpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SimulationCheckpointDeleteManyArgs>(args?: SelectSubset<T, SimulationCheckpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationCheckpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SimulationCheckpoints
     * const simulationCheckpoint = await prisma.simulationCheckpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SimulationCheckpointUpdateManyArgs>(args: SelectSubset<T, SimulationCheckpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationCheckpoints and returns the data updated in the database.
     * @param {SimulationCheckpointUpdateManyAndReturnArgs} args - Arguments to update many SimulationCheckpoints.
     * @example
     * // Update many SimulationCheckpoints
     * const simulationCheckpoint = await prisma.simulationCheckpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SimulationCheckpoints and only return the `runId`
     * const simulationCheckpointWithRunIdOnly = await prisma.simulationCheckpoint.updateManyAndReturn({
     *   select: { runId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SimulationCheckpointUpdateManyAndReturnArgs>(args: SelectSubset<T, SimulationCheckpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SimulationCheckpoint.
     * @param {SimulationCheckpointUpsertArgs} args - Arguments to update or create a SimulationCheckpoint.
     * @example
     * // Update or create a SimulationCheckpoint
     * const simulationCheckpoint = await prisma.simulationCheckpoint.upsert({
     *   create: {
     *     // ... data to create a SimulationCheckpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SimulationCheckpoint we want to update
     *   }
     * })
     */
    upsert<T extends SimulationCheckpointUpsertArgs>(args: SelectSubset<T, SimulationCheckpointUpsertArgs<ExtArgs>>): Prisma__SimulationCheckpointClient<$Result.GetResult<Prisma.$SimulationCheckpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SimulationCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationCheckpointCountArgs} args - Arguments to filter SimulationCheckpoints to count.
     * @example
     * // Count the number of SimulationCheckpoints
     * const count = await prisma.simulationCheckpoint.count({
     *   where: {
     *     // ... the filter for the SimulationCheckpoints we want to count
     *   }
     * })
    **/
    count<T extends SimulationCheckpointCountArgs>(
      args?: Subset<T, SimulationCheckpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SimulationCheckpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SimulationCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationCheckpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SimulationCheckpointAggregateArgs>(args: Subset<T, SimulationCheckpointAggregateArgs>): Prisma.PrismaPromise<GetSimulationCheckpointAggregateType<T>>

    /**
     * Group by SimulationCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationCheckpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SimulationCheckpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SimulationCheckpointGroupByArgs['orderBy'] }
        : { orderBy?: SimulationCheckpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SimulationCheckpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSimulationCheckpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SimulationCheckpoint model
   */
  readonly fields: SimulationCheckpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SimulationCheckpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SimulationCheckpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends SimulationRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SimulationRunDefaultArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SimulationCheckpoint model
   */
  interface SimulationCheckpointFieldRefs {
    readonly runId: FieldRef<"SimulationCheckpoint", 'String'>
    readonly tick: FieldRef<"SimulationCheckpoint", 'Int'>
    readonly hash: FieldRef<"SimulationCheckpoint", 'String'>
    readonly state: FieldRef<"SimulationCheckpoint", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * SimulationCheckpoint findUnique
   */
  export type SimulationCheckpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which SimulationCheckpoint to fetch.
     */
    where: SimulationCheckpointWhereUniqueInput
  }

  /**
   * SimulationCheckpoint findUniqueOrThrow
   */
  export type SimulationCheckpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which SimulationCheckpoint to fetch.
     */
    where: SimulationCheckpointWhereUniqueInput
  }

  /**
   * SimulationCheckpoint findFirst
   */
  export type SimulationCheckpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which SimulationCheckpoint to fetch.
     */
    where?: SimulationCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationCheckpoints to fetch.
     */
    orderBy?: SimulationCheckpointOrderByWithRelationInput | SimulationCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationCheckpoints.
     */
    cursor?: SimulationCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationCheckpoints.
     */
    distinct?: SimulationCheckpointScalarFieldEnum | SimulationCheckpointScalarFieldEnum[]
  }

  /**
   * SimulationCheckpoint findFirstOrThrow
   */
  export type SimulationCheckpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which SimulationCheckpoint to fetch.
     */
    where?: SimulationCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationCheckpoints to fetch.
     */
    orderBy?: SimulationCheckpointOrderByWithRelationInput | SimulationCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationCheckpoints.
     */
    cursor?: SimulationCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationCheckpoints.
     */
    distinct?: SimulationCheckpointScalarFieldEnum | SimulationCheckpointScalarFieldEnum[]
  }

  /**
   * SimulationCheckpoint findMany
   */
  export type SimulationCheckpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which SimulationCheckpoints to fetch.
     */
    where?: SimulationCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationCheckpoints to fetch.
     */
    orderBy?: SimulationCheckpointOrderByWithRelationInput | SimulationCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SimulationCheckpoints.
     */
    cursor?: SimulationCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationCheckpoints.
     */
    distinct?: SimulationCheckpointScalarFieldEnum | SimulationCheckpointScalarFieldEnum[]
  }

  /**
   * SimulationCheckpoint create
   */
  export type SimulationCheckpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to create a SimulationCheckpoint.
     */
    data: XOR<SimulationCheckpointCreateInput, SimulationCheckpointUncheckedCreateInput>
  }

  /**
   * SimulationCheckpoint createMany
   */
  export type SimulationCheckpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SimulationCheckpoints.
     */
    data: SimulationCheckpointCreateManyInput | SimulationCheckpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SimulationCheckpoint createManyAndReturn
   */
  export type SimulationCheckpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * The data used to create many SimulationCheckpoints.
     */
    data: SimulationCheckpointCreateManyInput | SimulationCheckpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationCheckpoint update
   */
  export type SimulationCheckpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to update a SimulationCheckpoint.
     */
    data: XOR<SimulationCheckpointUpdateInput, SimulationCheckpointUncheckedUpdateInput>
    /**
     * Choose, which SimulationCheckpoint to update.
     */
    where: SimulationCheckpointWhereUniqueInput
  }

  /**
   * SimulationCheckpoint updateMany
   */
  export type SimulationCheckpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SimulationCheckpoints.
     */
    data: XOR<SimulationCheckpointUpdateManyMutationInput, SimulationCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which SimulationCheckpoints to update
     */
    where?: SimulationCheckpointWhereInput
    /**
     * Limit how many SimulationCheckpoints to update.
     */
    limit?: number
  }

  /**
   * SimulationCheckpoint updateManyAndReturn
   */
  export type SimulationCheckpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * The data used to update SimulationCheckpoints.
     */
    data: XOR<SimulationCheckpointUpdateManyMutationInput, SimulationCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which SimulationCheckpoints to update
     */
    where?: SimulationCheckpointWhereInput
    /**
     * Limit how many SimulationCheckpoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationCheckpoint upsert
   */
  export type SimulationCheckpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * The filter to search for the SimulationCheckpoint to update in case it exists.
     */
    where: SimulationCheckpointWhereUniqueInput
    /**
     * In case the SimulationCheckpoint found by the `where` argument doesn't exist, create a new SimulationCheckpoint with this data.
     */
    create: XOR<SimulationCheckpointCreateInput, SimulationCheckpointUncheckedCreateInput>
    /**
     * In case the SimulationCheckpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SimulationCheckpointUpdateInput, SimulationCheckpointUncheckedUpdateInput>
  }

  /**
   * SimulationCheckpoint delete
   */
  export type SimulationCheckpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
    /**
     * Filter which SimulationCheckpoint to delete.
     */
    where: SimulationCheckpointWhereUniqueInput
  }

  /**
   * SimulationCheckpoint deleteMany
   */
  export type SimulationCheckpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationCheckpoints to delete
     */
    where?: SimulationCheckpointWhereInput
    /**
     * Limit how many SimulationCheckpoints to delete.
     */
    limit?: number
  }

  /**
   * SimulationCheckpoint without action
   */
  export type SimulationCheckpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationCheckpoint
     */
    select?: SimulationCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationCheckpoint
     */
    omit?: SimulationCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationCheckpointInclude<ExtArgs> | null
  }


  /**
   * Model SimulationMetric
   */

  export type AggregateSimulationMetric = {
    _count: SimulationMetricCountAggregateOutputType | null
    _avg: SimulationMetricAvgAggregateOutputType | null
    _sum: SimulationMetricSumAggregateOutputType | null
    _min: SimulationMetricMinAggregateOutputType | null
    _max: SimulationMetricMaxAggregateOutputType | null
  }

  export type SimulationMetricAvgAggregateOutputType = {
    tick: number | null
  }

  export type SimulationMetricSumAggregateOutputType = {
    tick: number | null
  }

  export type SimulationMetricMinAggregateOutputType = {
    runId: string | null
    tick: number | null
  }

  export type SimulationMetricMaxAggregateOutputType = {
    runId: string | null
    tick: number | null
  }

  export type SimulationMetricCountAggregateOutputType = {
    runId: number
    tick: number
    values: number
    _all: number
  }


  export type SimulationMetricAvgAggregateInputType = {
    tick?: true
  }

  export type SimulationMetricSumAggregateInputType = {
    tick?: true
  }

  export type SimulationMetricMinAggregateInputType = {
    runId?: true
    tick?: true
  }

  export type SimulationMetricMaxAggregateInputType = {
    runId?: true
    tick?: true
  }

  export type SimulationMetricCountAggregateInputType = {
    runId?: true
    tick?: true
    values?: true
    _all?: true
  }

  export type SimulationMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationMetric to aggregate.
     */
    where?: SimulationMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationMetrics to fetch.
     */
    orderBy?: SimulationMetricOrderByWithRelationInput | SimulationMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SimulationMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SimulationMetrics
    **/
    _count?: true | SimulationMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SimulationMetricAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SimulationMetricSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SimulationMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SimulationMetricMaxAggregateInputType
  }

  export type GetSimulationMetricAggregateType<T extends SimulationMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateSimulationMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSimulationMetric[P]>
      : GetScalarType<T[P], AggregateSimulationMetric[P]>
  }




  export type SimulationMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SimulationMetricWhereInput
    orderBy?: SimulationMetricOrderByWithAggregationInput | SimulationMetricOrderByWithAggregationInput[]
    by: SimulationMetricScalarFieldEnum[] | SimulationMetricScalarFieldEnum
    having?: SimulationMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SimulationMetricCountAggregateInputType | true
    _avg?: SimulationMetricAvgAggregateInputType
    _sum?: SimulationMetricSumAggregateInputType
    _min?: SimulationMetricMinAggregateInputType
    _max?: SimulationMetricMaxAggregateInputType
  }

  export type SimulationMetricGroupByOutputType = {
    runId: string
    tick: number
    values: JsonValue
    _count: SimulationMetricCountAggregateOutputType | null
    _avg: SimulationMetricAvgAggregateOutputType | null
    _sum: SimulationMetricSumAggregateOutputType | null
    _min: SimulationMetricMinAggregateOutputType | null
    _max: SimulationMetricMaxAggregateOutputType | null
  }

  type GetSimulationMetricGroupByPayload<T extends SimulationMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SimulationMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SimulationMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SimulationMetricGroupByOutputType[P]>
            : GetScalarType<T[P], SimulationMetricGroupByOutputType[P]>
        }
      >
    >


  export type SimulationMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    tick?: boolean
    values?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationMetric"]>

  export type SimulationMetricSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    tick?: boolean
    values?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationMetric"]>

  export type SimulationMetricSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    tick?: boolean
    values?: boolean
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["simulationMetric"]>

  export type SimulationMetricSelectScalar = {
    runId?: boolean
    tick?: boolean
    values?: boolean
  }

  export type SimulationMetricOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"runId" | "tick" | "values", ExtArgs["result"]["simulationMetric"]>
  export type SimulationMetricInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }
  export type SimulationMetricIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }
  export type SimulationMetricIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | SimulationRunDefaultArgs<ExtArgs>
  }

  export type $SimulationMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SimulationMetric"
    objects: {
      run: Prisma.$SimulationRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      runId: string
      tick: number
      values: Prisma.JsonValue
    }, ExtArgs["result"]["simulationMetric"]>
    composites: {}
  }

  type SimulationMetricGetPayload<S extends boolean | null | undefined | SimulationMetricDefaultArgs> = $Result.GetResult<Prisma.$SimulationMetricPayload, S>

  type SimulationMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SimulationMetricFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SimulationMetricCountAggregateInputType | true
    }

  export interface SimulationMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SimulationMetric'], meta: { name: 'SimulationMetric' } }
    /**
     * Find zero or one SimulationMetric that matches the filter.
     * @param {SimulationMetricFindUniqueArgs} args - Arguments to find a SimulationMetric
     * @example
     * // Get one SimulationMetric
     * const simulationMetric = await prisma.simulationMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SimulationMetricFindUniqueArgs>(args: SelectSubset<T, SimulationMetricFindUniqueArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SimulationMetric that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SimulationMetricFindUniqueOrThrowArgs} args - Arguments to find a SimulationMetric
     * @example
     * // Get one SimulationMetric
     * const simulationMetric = await prisma.simulationMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SimulationMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, SimulationMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationMetricFindFirstArgs} args - Arguments to find a SimulationMetric
     * @example
     * // Get one SimulationMetric
     * const simulationMetric = await prisma.simulationMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SimulationMetricFindFirstArgs>(args?: SelectSubset<T, SimulationMetricFindFirstArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SimulationMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationMetricFindFirstOrThrowArgs} args - Arguments to find a SimulationMetric
     * @example
     * // Get one SimulationMetric
     * const simulationMetric = await prisma.simulationMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SimulationMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, SimulationMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SimulationMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SimulationMetrics
     * const simulationMetrics = await prisma.simulationMetric.findMany()
     * 
     * // Get first 10 SimulationMetrics
     * const simulationMetrics = await prisma.simulationMetric.findMany({ take: 10 })
     * 
     * // Only select the `runId`
     * const simulationMetricWithRunIdOnly = await prisma.simulationMetric.findMany({ select: { runId: true } })
     * 
     */
    findMany<T extends SimulationMetricFindManyArgs>(args?: SelectSubset<T, SimulationMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SimulationMetric.
     * @param {SimulationMetricCreateArgs} args - Arguments to create a SimulationMetric.
     * @example
     * // Create one SimulationMetric
     * const SimulationMetric = await prisma.simulationMetric.create({
     *   data: {
     *     // ... data to create a SimulationMetric
     *   }
     * })
     * 
     */
    create<T extends SimulationMetricCreateArgs>(args: SelectSubset<T, SimulationMetricCreateArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SimulationMetrics.
     * @param {SimulationMetricCreateManyArgs} args - Arguments to create many SimulationMetrics.
     * @example
     * // Create many SimulationMetrics
     * const simulationMetric = await prisma.simulationMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SimulationMetricCreateManyArgs>(args?: SelectSubset<T, SimulationMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SimulationMetrics and returns the data saved in the database.
     * @param {SimulationMetricCreateManyAndReturnArgs} args - Arguments to create many SimulationMetrics.
     * @example
     * // Create many SimulationMetrics
     * const simulationMetric = await prisma.simulationMetric.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SimulationMetrics and only return the `runId`
     * const simulationMetricWithRunIdOnly = await prisma.simulationMetric.createManyAndReturn({
     *   select: { runId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SimulationMetricCreateManyAndReturnArgs>(args?: SelectSubset<T, SimulationMetricCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SimulationMetric.
     * @param {SimulationMetricDeleteArgs} args - Arguments to delete one SimulationMetric.
     * @example
     * // Delete one SimulationMetric
     * const SimulationMetric = await prisma.simulationMetric.delete({
     *   where: {
     *     // ... filter to delete one SimulationMetric
     *   }
     * })
     * 
     */
    delete<T extends SimulationMetricDeleteArgs>(args: SelectSubset<T, SimulationMetricDeleteArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SimulationMetric.
     * @param {SimulationMetricUpdateArgs} args - Arguments to update one SimulationMetric.
     * @example
     * // Update one SimulationMetric
     * const simulationMetric = await prisma.simulationMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SimulationMetricUpdateArgs>(args: SelectSubset<T, SimulationMetricUpdateArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SimulationMetrics.
     * @param {SimulationMetricDeleteManyArgs} args - Arguments to filter SimulationMetrics to delete.
     * @example
     * // Delete a few SimulationMetrics
     * const { count } = await prisma.simulationMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SimulationMetricDeleteManyArgs>(args?: SelectSubset<T, SimulationMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SimulationMetrics
     * const simulationMetric = await prisma.simulationMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SimulationMetricUpdateManyArgs>(args: SelectSubset<T, SimulationMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SimulationMetrics and returns the data updated in the database.
     * @param {SimulationMetricUpdateManyAndReturnArgs} args - Arguments to update many SimulationMetrics.
     * @example
     * // Update many SimulationMetrics
     * const simulationMetric = await prisma.simulationMetric.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SimulationMetrics and only return the `runId`
     * const simulationMetricWithRunIdOnly = await prisma.simulationMetric.updateManyAndReturn({
     *   select: { runId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SimulationMetricUpdateManyAndReturnArgs>(args: SelectSubset<T, SimulationMetricUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SimulationMetric.
     * @param {SimulationMetricUpsertArgs} args - Arguments to update or create a SimulationMetric.
     * @example
     * // Update or create a SimulationMetric
     * const simulationMetric = await prisma.simulationMetric.upsert({
     *   create: {
     *     // ... data to create a SimulationMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SimulationMetric we want to update
     *   }
     * })
     */
    upsert<T extends SimulationMetricUpsertArgs>(args: SelectSubset<T, SimulationMetricUpsertArgs<ExtArgs>>): Prisma__SimulationMetricClient<$Result.GetResult<Prisma.$SimulationMetricPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SimulationMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationMetricCountArgs} args - Arguments to filter SimulationMetrics to count.
     * @example
     * // Count the number of SimulationMetrics
     * const count = await prisma.simulationMetric.count({
     *   where: {
     *     // ... the filter for the SimulationMetrics we want to count
     *   }
     * })
    **/
    count<T extends SimulationMetricCountArgs>(
      args?: Subset<T, SimulationMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SimulationMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SimulationMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SimulationMetricAggregateArgs>(args: Subset<T, SimulationMetricAggregateArgs>): Prisma.PrismaPromise<GetSimulationMetricAggregateType<T>>

    /**
     * Group by SimulationMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SimulationMetricGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SimulationMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SimulationMetricGroupByArgs['orderBy'] }
        : { orderBy?: SimulationMetricGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SimulationMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSimulationMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SimulationMetric model
   */
  readonly fields: SimulationMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SimulationMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SimulationMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends SimulationRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SimulationRunDefaultArgs<ExtArgs>>): Prisma__SimulationRunClient<$Result.GetResult<Prisma.$SimulationRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SimulationMetric model
   */
  interface SimulationMetricFieldRefs {
    readonly runId: FieldRef<"SimulationMetric", 'String'>
    readonly tick: FieldRef<"SimulationMetric", 'Int'>
    readonly values: FieldRef<"SimulationMetric", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * SimulationMetric findUnique
   */
  export type SimulationMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * Filter, which SimulationMetric to fetch.
     */
    where: SimulationMetricWhereUniqueInput
  }

  /**
   * SimulationMetric findUniqueOrThrow
   */
  export type SimulationMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * Filter, which SimulationMetric to fetch.
     */
    where: SimulationMetricWhereUniqueInput
  }

  /**
   * SimulationMetric findFirst
   */
  export type SimulationMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * Filter, which SimulationMetric to fetch.
     */
    where?: SimulationMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationMetrics to fetch.
     */
    orderBy?: SimulationMetricOrderByWithRelationInput | SimulationMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationMetrics.
     */
    cursor?: SimulationMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationMetrics.
     */
    distinct?: SimulationMetricScalarFieldEnum | SimulationMetricScalarFieldEnum[]
  }

  /**
   * SimulationMetric findFirstOrThrow
   */
  export type SimulationMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * Filter, which SimulationMetric to fetch.
     */
    where?: SimulationMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationMetrics to fetch.
     */
    orderBy?: SimulationMetricOrderByWithRelationInput | SimulationMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SimulationMetrics.
     */
    cursor?: SimulationMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationMetrics.
     */
    distinct?: SimulationMetricScalarFieldEnum | SimulationMetricScalarFieldEnum[]
  }

  /**
   * SimulationMetric findMany
   */
  export type SimulationMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * Filter, which SimulationMetrics to fetch.
     */
    where?: SimulationMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SimulationMetrics to fetch.
     */
    orderBy?: SimulationMetricOrderByWithRelationInput | SimulationMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SimulationMetrics.
     */
    cursor?: SimulationMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SimulationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SimulationMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SimulationMetrics.
     */
    distinct?: SimulationMetricScalarFieldEnum | SimulationMetricScalarFieldEnum[]
  }

  /**
   * SimulationMetric create
   */
  export type SimulationMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * The data needed to create a SimulationMetric.
     */
    data: XOR<SimulationMetricCreateInput, SimulationMetricUncheckedCreateInput>
  }

  /**
   * SimulationMetric createMany
   */
  export type SimulationMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SimulationMetrics.
     */
    data: SimulationMetricCreateManyInput | SimulationMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SimulationMetric createManyAndReturn
   */
  export type SimulationMetricCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * The data used to create many SimulationMetrics.
     */
    data: SimulationMetricCreateManyInput | SimulationMetricCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationMetric update
   */
  export type SimulationMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * The data needed to update a SimulationMetric.
     */
    data: XOR<SimulationMetricUpdateInput, SimulationMetricUncheckedUpdateInput>
    /**
     * Choose, which SimulationMetric to update.
     */
    where: SimulationMetricWhereUniqueInput
  }

  /**
   * SimulationMetric updateMany
   */
  export type SimulationMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SimulationMetrics.
     */
    data: XOR<SimulationMetricUpdateManyMutationInput, SimulationMetricUncheckedUpdateManyInput>
    /**
     * Filter which SimulationMetrics to update
     */
    where?: SimulationMetricWhereInput
    /**
     * Limit how many SimulationMetrics to update.
     */
    limit?: number
  }

  /**
   * SimulationMetric updateManyAndReturn
   */
  export type SimulationMetricUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * The data used to update SimulationMetrics.
     */
    data: XOR<SimulationMetricUpdateManyMutationInput, SimulationMetricUncheckedUpdateManyInput>
    /**
     * Filter which SimulationMetrics to update
     */
    where?: SimulationMetricWhereInput
    /**
     * Limit how many SimulationMetrics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SimulationMetric upsert
   */
  export type SimulationMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * The filter to search for the SimulationMetric to update in case it exists.
     */
    where: SimulationMetricWhereUniqueInput
    /**
     * In case the SimulationMetric found by the `where` argument doesn't exist, create a new SimulationMetric with this data.
     */
    create: XOR<SimulationMetricCreateInput, SimulationMetricUncheckedCreateInput>
    /**
     * In case the SimulationMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SimulationMetricUpdateInput, SimulationMetricUncheckedUpdateInput>
  }

  /**
   * SimulationMetric delete
   */
  export type SimulationMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
    /**
     * Filter which SimulationMetric to delete.
     */
    where: SimulationMetricWhereUniqueInput
  }

  /**
   * SimulationMetric deleteMany
   */
  export type SimulationMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SimulationMetrics to delete
     */
    where?: SimulationMetricWhereInput
    /**
     * Limit how many SimulationMetrics to delete.
     */
    limit?: number
  }

  /**
   * SimulationMetric without action
   */
  export type SimulationMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SimulationMetric
     */
    select?: SimulationMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SimulationMetric
     */
    omit?: SimulationMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SimulationMetricInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    username: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    username: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    username: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    username?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    username?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    username?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    username: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    username?: boolean
    createdAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    members?: boolean | User$membersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    username?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    username?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    username?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "username" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    members?: boolean | User$membersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      members: Prisma.$ProjectMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      username: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends User$membersArgs<ExtArgs> = {}>(args?: Subset<T, User$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.members
   */
  export type User$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    cursor?: ProjectMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectMemberScalarFieldEnum: {
    projectId: 'projectId',
    userId: 'userId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type ProjectMemberScalarFieldEnum = (typeof ProjectMemberScalarFieldEnum)[keyof typeof ProjectMemberScalarFieldEnum]


  export const SceneScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    data: 'data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SceneScalarFieldEnum = (typeof SceneScalarFieldEnum)[keyof typeof SceneScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    refreshHash: 'refreshHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SimulationRunScalarFieldEnum: {
    id: 'id',
    sceneId: 'sceneId',
    setup: 'setup',
    engineVersion: 'engineVersion',
    status: 'status',
    lastTick: 'lastTick',
    startedAt: 'startedAt',
    lastHeartbeatAt: 'lastHeartbeatAt',
    endedAt: 'endedAt'
  };

  export type SimulationRunScalarFieldEnum = (typeof SimulationRunScalarFieldEnum)[keyof typeof SimulationRunScalarFieldEnum]


  export const SimulationRunChunkScalarFieldEnum: {
    runId: 'runId',
    seq: 'seq',
    fromTick: 'fromTick',
    toTick: 'toTick',
    commands: 'commands',
    events: 'events',
    createdAt: 'createdAt'
  };

  export type SimulationRunChunkScalarFieldEnum = (typeof SimulationRunChunkScalarFieldEnum)[keyof typeof SimulationRunChunkScalarFieldEnum]


  export const SimulationCheckpointScalarFieldEnum: {
    runId: 'runId',
    tick: 'tick',
    hash: 'hash',
    state: 'state'
  };

  export type SimulationCheckpointScalarFieldEnum = (typeof SimulationCheckpointScalarFieldEnum)[keyof typeof SimulationCheckpointScalarFieldEnum]


  export const SimulationMetricScalarFieldEnum: {
    runId: 'runId',
    tick: 'tick',
    values: 'values'
  };

  export type SimulationMetricScalarFieldEnum = (typeof SimulationMetricScalarFieldEnum)[keyof typeof SimulationMetricScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    username: 'username',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ProjectRole'
   */
  export type EnumProjectRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectRole'>
    


  /**
   * Reference to a field of type 'ProjectRole[]'
   */
  export type ListEnumProjectRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectRole[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SimulationRunStatus'
   */
  export type EnumSimulationRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SimulationRunStatus'>
    


  /**
   * Reference to a field of type 'SimulationRunStatus[]'
   */
  export type ListEnumSimulationRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SimulationRunStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: UuidFilter<"Project"> | string
    userId?: UuidFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: ProjectMemberListRelationFilter
    scenes?: SceneListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    members?: ProjectMemberOrderByRelationAggregateInput
    scenes?: SceneOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    userId?: UuidFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: ProjectMemberListRelationFilter
    scenes?: SceneListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Project"> | string
    userId?: UuidWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectMemberWhereInput = {
    AND?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    OR?: ProjectMemberWhereInput[]
    NOT?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    projectId?: UuidFilter<"ProjectMember"> | string
    userId?: UuidFilter<"ProjectMember"> | string
    role?: EnumProjectRoleFilter<"ProjectMember"> | $Enums.ProjectRole
    createdAt?: DateTimeFilter<"ProjectMember"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectMemberOrderByWithRelationInput = {
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ProjectMemberWhereUniqueInput = Prisma.AtLeast<{
    projectId_userId?: ProjectMemberProjectIdUserIdCompoundUniqueInput
    AND?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    OR?: ProjectMemberWhereInput[]
    NOT?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    projectId?: UuidFilter<"ProjectMember"> | string
    userId?: UuidFilter<"ProjectMember"> | string
    role?: EnumProjectRoleFilter<"ProjectMember"> | $Enums.ProjectRole
    createdAt?: DateTimeFilter<"ProjectMember"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "projectId_userId">

  export type ProjectMemberOrderByWithAggregationInput = {
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectMemberCountOrderByAggregateInput
    _max?: ProjectMemberMaxOrderByAggregateInput
    _min?: ProjectMemberMinOrderByAggregateInput
  }

  export type ProjectMemberScalarWhereWithAggregatesInput = {
    AND?: ProjectMemberScalarWhereWithAggregatesInput | ProjectMemberScalarWhereWithAggregatesInput[]
    OR?: ProjectMemberScalarWhereWithAggregatesInput[]
    NOT?: ProjectMemberScalarWhereWithAggregatesInput | ProjectMemberScalarWhereWithAggregatesInput[]
    projectId?: UuidWithAggregatesFilter<"ProjectMember"> | string
    userId?: UuidWithAggregatesFilter<"ProjectMember"> | string
    role?: EnumProjectRoleWithAggregatesFilter<"ProjectMember"> | $Enums.ProjectRole
    createdAt?: DateTimeWithAggregatesFilter<"ProjectMember"> | Date | string
  }

  export type SceneWhereInput = {
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    id?: UuidFilter<"Scene"> | string
    projectId?: UuidFilter<"Scene"> | string
    name?: StringFilter<"Scene"> | string
    data?: JsonFilter<"Scene">
    createdAt?: DateTimeFilter<"Scene"> | Date | string
    updatedAt?: DateTimeFilter<"Scene"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    runs?: SimulationRunListRelationFilter
  }

  export type SceneOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    runs?: SimulationRunOrderByRelationAggregateInput
  }

  export type SceneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    projectId?: UuidFilter<"Scene"> | string
    name?: StringFilter<"Scene"> | string
    data?: JsonFilter<"Scene">
    createdAt?: DateTimeFilter<"Scene"> | Date | string
    updatedAt?: DateTimeFilter<"Scene"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    runs?: SimulationRunListRelationFilter
  }, "id">

  export type SceneOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SceneCountOrderByAggregateInput
    _max?: SceneMaxOrderByAggregateInput
    _min?: SceneMinOrderByAggregateInput
  }

  export type SceneScalarWhereWithAggregatesInput = {
    AND?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    OR?: SceneScalarWhereWithAggregatesInput[]
    NOT?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Scene"> | string
    projectId?: UuidWithAggregatesFilter<"Scene"> | string
    name?: StringWithAggregatesFilter<"Scene"> | string
    data?: JsonWithAggregatesFilter<"Scene">
    createdAt?: DateTimeWithAggregatesFilter<"Scene"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Scene"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: UuidFilter<"Session"> | string
    userId?: UuidFilter<"Session"> | string
    refreshHash?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: UuidFilter<"Session"> | string
    refreshHash?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Session"> | string
    userId?: UuidWithAggregatesFilter<"Session"> | string
    refreshHash?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type SimulationRunWhereInput = {
    AND?: SimulationRunWhereInput | SimulationRunWhereInput[]
    OR?: SimulationRunWhereInput[]
    NOT?: SimulationRunWhereInput | SimulationRunWhereInput[]
    id?: UuidFilter<"SimulationRun"> | string
    sceneId?: UuidFilter<"SimulationRun"> | string
    setup?: JsonFilter<"SimulationRun">
    engineVersion?: IntFilter<"SimulationRun"> | number
    status?: EnumSimulationRunStatusFilter<"SimulationRun"> | $Enums.SimulationRunStatus
    lastTick?: IntFilter<"SimulationRun"> | number
    startedAt?: DateTimeFilter<"SimulationRun"> | Date | string
    lastHeartbeatAt?: DateTimeFilter<"SimulationRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"SimulationRun"> | Date | string | null
    scene?: XOR<SceneScalarRelationFilter, SceneWhereInput>
    chunks?: SimulationRunChunkListRelationFilter
    checkpoints?: SimulationCheckpointListRelationFilter
    metrics?: SimulationMetricListRelationFilter
  }

  export type SimulationRunOrderByWithRelationInput = {
    id?: SortOrder
    sceneId?: SortOrder
    setup?: SortOrder
    engineVersion?: SortOrder
    status?: SortOrder
    lastTick?: SortOrder
    startedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    scene?: SceneOrderByWithRelationInput
    chunks?: SimulationRunChunkOrderByRelationAggregateInput
    checkpoints?: SimulationCheckpointOrderByRelationAggregateInput
    metrics?: SimulationMetricOrderByRelationAggregateInput
  }

  export type SimulationRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SimulationRunWhereInput | SimulationRunWhereInput[]
    OR?: SimulationRunWhereInput[]
    NOT?: SimulationRunWhereInput | SimulationRunWhereInput[]
    sceneId?: UuidFilter<"SimulationRun"> | string
    setup?: JsonFilter<"SimulationRun">
    engineVersion?: IntFilter<"SimulationRun"> | number
    status?: EnumSimulationRunStatusFilter<"SimulationRun"> | $Enums.SimulationRunStatus
    lastTick?: IntFilter<"SimulationRun"> | number
    startedAt?: DateTimeFilter<"SimulationRun"> | Date | string
    lastHeartbeatAt?: DateTimeFilter<"SimulationRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"SimulationRun"> | Date | string | null
    scene?: XOR<SceneScalarRelationFilter, SceneWhereInput>
    chunks?: SimulationRunChunkListRelationFilter
    checkpoints?: SimulationCheckpointListRelationFilter
    metrics?: SimulationMetricListRelationFilter
  }, "id">

  export type SimulationRunOrderByWithAggregationInput = {
    id?: SortOrder
    sceneId?: SortOrder
    setup?: SortOrder
    engineVersion?: SortOrder
    status?: SortOrder
    lastTick?: SortOrder
    startedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    _count?: SimulationRunCountOrderByAggregateInput
    _avg?: SimulationRunAvgOrderByAggregateInput
    _max?: SimulationRunMaxOrderByAggregateInput
    _min?: SimulationRunMinOrderByAggregateInput
    _sum?: SimulationRunSumOrderByAggregateInput
  }

  export type SimulationRunScalarWhereWithAggregatesInput = {
    AND?: SimulationRunScalarWhereWithAggregatesInput | SimulationRunScalarWhereWithAggregatesInput[]
    OR?: SimulationRunScalarWhereWithAggregatesInput[]
    NOT?: SimulationRunScalarWhereWithAggregatesInput | SimulationRunScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SimulationRun"> | string
    sceneId?: UuidWithAggregatesFilter<"SimulationRun"> | string
    setup?: JsonWithAggregatesFilter<"SimulationRun">
    engineVersion?: IntWithAggregatesFilter<"SimulationRun"> | number
    status?: EnumSimulationRunStatusWithAggregatesFilter<"SimulationRun"> | $Enums.SimulationRunStatus
    lastTick?: IntWithAggregatesFilter<"SimulationRun"> | number
    startedAt?: DateTimeWithAggregatesFilter<"SimulationRun"> | Date | string
    lastHeartbeatAt?: DateTimeWithAggregatesFilter<"SimulationRun"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"SimulationRun"> | Date | string | null
  }

  export type SimulationRunChunkWhereInput = {
    AND?: SimulationRunChunkWhereInput | SimulationRunChunkWhereInput[]
    OR?: SimulationRunChunkWhereInput[]
    NOT?: SimulationRunChunkWhereInput | SimulationRunChunkWhereInput[]
    runId?: UuidFilter<"SimulationRunChunk"> | string
    seq?: IntFilter<"SimulationRunChunk"> | number
    fromTick?: IntFilter<"SimulationRunChunk"> | number
    toTick?: IntFilter<"SimulationRunChunk"> | number
    commands?: JsonFilter<"SimulationRunChunk">
    events?: JsonFilter<"SimulationRunChunk">
    createdAt?: DateTimeFilter<"SimulationRunChunk"> | Date | string
    run?: XOR<SimulationRunScalarRelationFilter, SimulationRunWhereInput>
  }

  export type SimulationRunChunkOrderByWithRelationInput = {
    runId?: SortOrder
    seq?: SortOrder
    fromTick?: SortOrder
    toTick?: SortOrder
    commands?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
    run?: SimulationRunOrderByWithRelationInput
  }

  export type SimulationRunChunkWhereUniqueInput = Prisma.AtLeast<{
    runId_seq?: SimulationRunChunkRunIdSeqCompoundUniqueInput
    AND?: SimulationRunChunkWhereInput | SimulationRunChunkWhereInput[]
    OR?: SimulationRunChunkWhereInput[]
    NOT?: SimulationRunChunkWhereInput | SimulationRunChunkWhereInput[]
    runId?: UuidFilter<"SimulationRunChunk"> | string
    seq?: IntFilter<"SimulationRunChunk"> | number
    fromTick?: IntFilter<"SimulationRunChunk"> | number
    toTick?: IntFilter<"SimulationRunChunk"> | number
    commands?: JsonFilter<"SimulationRunChunk">
    events?: JsonFilter<"SimulationRunChunk">
    createdAt?: DateTimeFilter<"SimulationRunChunk"> | Date | string
    run?: XOR<SimulationRunScalarRelationFilter, SimulationRunWhereInput>
  }, "runId_seq">

  export type SimulationRunChunkOrderByWithAggregationInput = {
    runId?: SortOrder
    seq?: SortOrder
    fromTick?: SortOrder
    toTick?: SortOrder
    commands?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
    _count?: SimulationRunChunkCountOrderByAggregateInput
    _avg?: SimulationRunChunkAvgOrderByAggregateInput
    _max?: SimulationRunChunkMaxOrderByAggregateInput
    _min?: SimulationRunChunkMinOrderByAggregateInput
    _sum?: SimulationRunChunkSumOrderByAggregateInput
  }

  export type SimulationRunChunkScalarWhereWithAggregatesInput = {
    AND?: SimulationRunChunkScalarWhereWithAggregatesInput | SimulationRunChunkScalarWhereWithAggregatesInput[]
    OR?: SimulationRunChunkScalarWhereWithAggregatesInput[]
    NOT?: SimulationRunChunkScalarWhereWithAggregatesInput | SimulationRunChunkScalarWhereWithAggregatesInput[]
    runId?: UuidWithAggregatesFilter<"SimulationRunChunk"> | string
    seq?: IntWithAggregatesFilter<"SimulationRunChunk"> | number
    fromTick?: IntWithAggregatesFilter<"SimulationRunChunk"> | number
    toTick?: IntWithAggregatesFilter<"SimulationRunChunk"> | number
    commands?: JsonWithAggregatesFilter<"SimulationRunChunk">
    events?: JsonWithAggregatesFilter<"SimulationRunChunk">
    createdAt?: DateTimeWithAggregatesFilter<"SimulationRunChunk"> | Date | string
  }

  export type SimulationCheckpointWhereInput = {
    AND?: SimulationCheckpointWhereInput | SimulationCheckpointWhereInput[]
    OR?: SimulationCheckpointWhereInput[]
    NOT?: SimulationCheckpointWhereInput | SimulationCheckpointWhereInput[]
    runId?: UuidFilter<"SimulationCheckpoint"> | string
    tick?: IntFilter<"SimulationCheckpoint"> | number
    hash?: StringFilter<"SimulationCheckpoint"> | string
    state?: JsonFilter<"SimulationCheckpoint">
    run?: XOR<SimulationRunScalarRelationFilter, SimulationRunWhereInput>
  }

  export type SimulationCheckpointOrderByWithRelationInput = {
    runId?: SortOrder
    tick?: SortOrder
    hash?: SortOrder
    state?: SortOrder
    run?: SimulationRunOrderByWithRelationInput
  }

  export type SimulationCheckpointWhereUniqueInput = Prisma.AtLeast<{
    runId_tick?: SimulationCheckpointRunIdTickCompoundUniqueInput
    AND?: SimulationCheckpointWhereInput | SimulationCheckpointWhereInput[]
    OR?: SimulationCheckpointWhereInput[]
    NOT?: SimulationCheckpointWhereInput | SimulationCheckpointWhereInput[]
    runId?: UuidFilter<"SimulationCheckpoint"> | string
    tick?: IntFilter<"SimulationCheckpoint"> | number
    hash?: StringFilter<"SimulationCheckpoint"> | string
    state?: JsonFilter<"SimulationCheckpoint">
    run?: XOR<SimulationRunScalarRelationFilter, SimulationRunWhereInput>
  }, "runId_tick">

  export type SimulationCheckpointOrderByWithAggregationInput = {
    runId?: SortOrder
    tick?: SortOrder
    hash?: SortOrder
    state?: SortOrder
    _count?: SimulationCheckpointCountOrderByAggregateInput
    _avg?: SimulationCheckpointAvgOrderByAggregateInput
    _max?: SimulationCheckpointMaxOrderByAggregateInput
    _min?: SimulationCheckpointMinOrderByAggregateInput
    _sum?: SimulationCheckpointSumOrderByAggregateInput
  }

  export type SimulationCheckpointScalarWhereWithAggregatesInput = {
    AND?: SimulationCheckpointScalarWhereWithAggregatesInput | SimulationCheckpointScalarWhereWithAggregatesInput[]
    OR?: SimulationCheckpointScalarWhereWithAggregatesInput[]
    NOT?: SimulationCheckpointScalarWhereWithAggregatesInput | SimulationCheckpointScalarWhereWithAggregatesInput[]
    runId?: UuidWithAggregatesFilter<"SimulationCheckpoint"> | string
    tick?: IntWithAggregatesFilter<"SimulationCheckpoint"> | number
    hash?: StringWithAggregatesFilter<"SimulationCheckpoint"> | string
    state?: JsonWithAggregatesFilter<"SimulationCheckpoint">
  }

  export type SimulationMetricWhereInput = {
    AND?: SimulationMetricWhereInput | SimulationMetricWhereInput[]
    OR?: SimulationMetricWhereInput[]
    NOT?: SimulationMetricWhereInput | SimulationMetricWhereInput[]
    runId?: UuidFilter<"SimulationMetric"> | string
    tick?: IntFilter<"SimulationMetric"> | number
    values?: JsonFilter<"SimulationMetric">
    run?: XOR<SimulationRunScalarRelationFilter, SimulationRunWhereInput>
  }

  export type SimulationMetricOrderByWithRelationInput = {
    runId?: SortOrder
    tick?: SortOrder
    values?: SortOrder
    run?: SimulationRunOrderByWithRelationInput
  }

  export type SimulationMetricWhereUniqueInput = Prisma.AtLeast<{
    runId_tick?: SimulationMetricRunIdTickCompoundUniqueInput
    AND?: SimulationMetricWhereInput | SimulationMetricWhereInput[]
    OR?: SimulationMetricWhereInput[]
    NOT?: SimulationMetricWhereInput | SimulationMetricWhereInput[]
    runId?: UuidFilter<"SimulationMetric"> | string
    tick?: IntFilter<"SimulationMetric"> | number
    values?: JsonFilter<"SimulationMetric">
    run?: XOR<SimulationRunScalarRelationFilter, SimulationRunWhereInput>
  }, "runId_tick">

  export type SimulationMetricOrderByWithAggregationInput = {
    runId?: SortOrder
    tick?: SortOrder
    values?: SortOrder
    _count?: SimulationMetricCountOrderByAggregateInput
    _avg?: SimulationMetricAvgOrderByAggregateInput
    _max?: SimulationMetricMaxOrderByAggregateInput
    _min?: SimulationMetricMinOrderByAggregateInput
    _sum?: SimulationMetricSumOrderByAggregateInput
  }

  export type SimulationMetricScalarWhereWithAggregatesInput = {
    AND?: SimulationMetricScalarWhereWithAggregatesInput | SimulationMetricScalarWhereWithAggregatesInput[]
    OR?: SimulationMetricScalarWhereWithAggregatesInput[]
    NOT?: SimulationMetricScalarWhereWithAggregatesInput | SimulationMetricScalarWhereWithAggregatesInput[]
    runId?: UuidWithAggregatesFilter<"SimulationMetric"> | string
    tick?: IntWithAggregatesFilter<"SimulationMetric"> | number
    values?: JsonWithAggregatesFilter<"SimulationMetric">
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    projects?: ProjectListRelationFilter
    members?: ProjectMemberListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    members?: ProjectMemberOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    projects?: ProjectListRelationFilter
    members?: ProjectMemberListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    members?: ProjectMemberCreateNestedManyWithoutProjectInput
    scenes?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    scenes?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    members?: ProjectMemberUpdateManyWithoutProjectNestedInput
    scenes?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    scenes?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberCreateInput = {
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutMembersInput
  }

  export type ProjectMemberUncheckedCreateInput = {
    projectId: string
    userId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
  }

  export type ProjectMemberUpdateInput = {
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberCreateManyInput = {
    projectId: string
    userId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
  }

  export type ProjectMemberUpdateManyMutationInput = {
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUncheckedUpdateManyInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneCreateInput = {
    id?: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutScenesInput
    runs?: SimulationRunCreateNestedManyWithoutSceneInput
  }

  export type SceneUncheckedCreateInput = {
    id?: string
    projectId: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: SimulationRunUncheckedCreateNestedManyWithoutSceneInput
  }

  export type SceneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutScenesNestedInput
    runs?: SimulationRunUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: SimulationRunUncheckedUpdateManyWithoutSceneNestedInput
  }

  export type SceneCreateManyInput = {
    id?: string
    projectId: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SceneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    refreshHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    refreshHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    refreshHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationRunCreateInput = {
    id?: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    scene: SceneCreateNestedOneWithoutRunsInput
    chunks?: SimulationRunChunkCreateNestedManyWithoutRunInput
    checkpoints?: SimulationCheckpointCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricCreateNestedManyWithoutRunInput
  }

  export type SimulationRunUncheckedCreateInput = {
    id?: string
    sceneId: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    chunks?: SimulationRunChunkUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: SimulationCheckpointUncheckedCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricUncheckedCreateNestedManyWithoutRunInput
  }

  export type SimulationRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scene?: SceneUpdateOneRequiredWithoutRunsNestedInput
    chunks?: SimulationRunChunkUpdateManyWithoutRunNestedInput
    checkpoints?: SimulationCheckpointUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneId?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: SimulationRunChunkUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: SimulationCheckpointUncheckedUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUncheckedUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunCreateManyInput = {
    id?: string
    sceneId: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
  }

  export type SimulationRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SimulationRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneId?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SimulationRunChunkCreateInput = {
    seq: number
    fromTick: number
    toTick: number
    commands: JsonNullValueInput | InputJsonValue
    events: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: SimulationRunCreateNestedOneWithoutChunksInput
  }

  export type SimulationRunChunkUncheckedCreateInput = {
    runId: string
    seq: number
    fromTick: number
    toTick: number
    commands: JsonNullValueInput | InputJsonValue
    events: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SimulationRunChunkUpdateInput = {
    seq?: IntFieldUpdateOperationsInput | number
    fromTick?: IntFieldUpdateOperationsInput | number
    toTick?: IntFieldUpdateOperationsInput | number
    commands?: JsonNullValueInput | InputJsonValue
    events?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: SimulationRunUpdateOneRequiredWithoutChunksNestedInput
  }

  export type SimulationRunChunkUncheckedUpdateInput = {
    runId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    fromTick?: IntFieldUpdateOperationsInput | number
    toTick?: IntFieldUpdateOperationsInput | number
    commands?: JsonNullValueInput | InputJsonValue
    events?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationRunChunkCreateManyInput = {
    runId: string
    seq: number
    fromTick: number
    toTick: number
    commands: JsonNullValueInput | InputJsonValue
    events: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SimulationRunChunkUpdateManyMutationInput = {
    seq?: IntFieldUpdateOperationsInput | number
    fromTick?: IntFieldUpdateOperationsInput | number
    toTick?: IntFieldUpdateOperationsInput | number
    commands?: JsonNullValueInput | InputJsonValue
    events?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationRunChunkUncheckedUpdateManyInput = {
    runId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    fromTick?: IntFieldUpdateOperationsInput | number
    toTick?: IntFieldUpdateOperationsInput | number
    commands?: JsonNullValueInput | InputJsonValue
    events?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationCheckpointCreateInput = {
    tick: number
    hash: string
    state: JsonNullValueInput | InputJsonValue
    run: SimulationRunCreateNestedOneWithoutCheckpointsInput
  }

  export type SimulationCheckpointUncheckedCreateInput = {
    runId: string
    tick: number
    hash: string
    state: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointUpdateInput = {
    tick?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
    run?: SimulationRunUpdateOneRequiredWithoutCheckpointsNestedInput
  }

  export type SimulationCheckpointUncheckedUpdateInput = {
    runId?: StringFieldUpdateOperationsInput | string
    tick?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointCreateManyInput = {
    runId: string
    tick: number
    hash: string
    state: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointUpdateManyMutationInput = {
    tick?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointUncheckedUpdateManyInput = {
    runId?: StringFieldUpdateOperationsInput | string
    tick?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricCreateInput = {
    tick: number
    values: JsonNullValueInput | InputJsonValue
    run: SimulationRunCreateNestedOneWithoutMetricsInput
  }

  export type SimulationMetricUncheckedCreateInput = {
    runId: string
    tick: number
    values: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricUpdateInput = {
    tick?: IntFieldUpdateOperationsInput | number
    values?: JsonNullValueInput | InputJsonValue
    run?: SimulationRunUpdateOneRequiredWithoutMetricsNestedInput
  }

  export type SimulationMetricUncheckedUpdateInput = {
    runId?: StringFieldUpdateOperationsInput | string
    tick?: IntFieldUpdateOperationsInput | number
    values?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricCreateManyInput = {
    runId: string
    tick: number
    values: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricUpdateManyMutationInput = {
    tick?: IntFieldUpdateOperationsInput | number
    values?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricUncheckedUpdateManyInput = {
    runId?: StringFieldUpdateOperationsInput | string
    tick?: IntFieldUpdateOperationsInput | number
    values?: JsonNullValueInput | InputJsonValue
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    members?: ProjectMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    members?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    members?: ProjectMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    members?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectMemberListRelationFilter = {
    every?: ProjectMemberWhereInput
    some?: ProjectMemberWhereInput
    none?: ProjectMemberWhereInput
  }

  export type SceneListRelationFilter = {
    every?: SceneWhereInput
    some?: SceneWhereInput
    none?: SceneWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SceneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumProjectRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectRoleFilter<$PrismaModel> | $Enums.ProjectRole
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectMemberProjectIdUserIdCompoundUniqueInput = {
    projectId: string
    userId: string
  }

  export type ProjectMemberCountOrderByAggregateInput = {
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectMemberMaxOrderByAggregateInput = {
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectMemberMinOrderByAggregateInput = {
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumProjectRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel> | $Enums.ProjectRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectRoleFilter<$PrismaModel>
    _max?: NestedEnumProjectRoleFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SimulationRunListRelationFilter = {
    every?: SimulationRunWhereInput
    some?: SimulationRunWhereInput
    none?: SimulationRunWhereInput
  }

  export type SimulationRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SceneCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SceneMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SceneMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumSimulationRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SimulationRunStatus | EnumSimulationRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSimulationRunStatusFilter<$PrismaModel> | $Enums.SimulationRunStatus
  }

  export type SceneScalarRelationFilter = {
    is?: SceneWhereInput
    isNot?: SceneWhereInput
  }

  export type SimulationRunChunkListRelationFilter = {
    every?: SimulationRunChunkWhereInput
    some?: SimulationRunChunkWhereInput
    none?: SimulationRunChunkWhereInput
  }

  export type SimulationCheckpointListRelationFilter = {
    every?: SimulationCheckpointWhereInput
    some?: SimulationCheckpointWhereInput
    none?: SimulationCheckpointWhereInput
  }

  export type SimulationMetricListRelationFilter = {
    every?: SimulationMetricWhereInput
    some?: SimulationMetricWhereInput
    none?: SimulationMetricWhereInput
  }

  export type SimulationRunChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SimulationCheckpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SimulationMetricOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SimulationRunCountOrderByAggregateInput = {
    id?: SortOrder
    sceneId?: SortOrder
    setup?: SortOrder
    engineVersion?: SortOrder
    status?: SortOrder
    lastTick?: SortOrder
    startedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    endedAt?: SortOrder
  }

  export type SimulationRunAvgOrderByAggregateInput = {
    engineVersion?: SortOrder
    lastTick?: SortOrder
  }

  export type SimulationRunMaxOrderByAggregateInput = {
    id?: SortOrder
    sceneId?: SortOrder
    engineVersion?: SortOrder
    status?: SortOrder
    lastTick?: SortOrder
    startedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    endedAt?: SortOrder
  }

  export type SimulationRunMinOrderByAggregateInput = {
    id?: SortOrder
    sceneId?: SortOrder
    engineVersion?: SortOrder
    status?: SortOrder
    lastTick?: SortOrder
    startedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    endedAt?: SortOrder
  }

  export type SimulationRunSumOrderByAggregateInput = {
    engineVersion?: SortOrder
    lastTick?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumSimulationRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SimulationRunStatus | EnumSimulationRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSimulationRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.SimulationRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSimulationRunStatusFilter<$PrismaModel>
    _max?: NestedEnumSimulationRunStatusFilter<$PrismaModel>
  }

  export type SimulationRunScalarRelationFilter = {
    is?: SimulationRunWhereInput
    isNot?: SimulationRunWhereInput
  }

  export type SimulationRunChunkRunIdSeqCompoundUniqueInput = {
    runId: string
    seq: number
  }

  export type SimulationRunChunkCountOrderByAggregateInput = {
    runId?: SortOrder
    seq?: SortOrder
    fromTick?: SortOrder
    toTick?: SortOrder
    commands?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
  }

  export type SimulationRunChunkAvgOrderByAggregateInput = {
    seq?: SortOrder
    fromTick?: SortOrder
    toTick?: SortOrder
  }

  export type SimulationRunChunkMaxOrderByAggregateInput = {
    runId?: SortOrder
    seq?: SortOrder
    fromTick?: SortOrder
    toTick?: SortOrder
    createdAt?: SortOrder
  }

  export type SimulationRunChunkMinOrderByAggregateInput = {
    runId?: SortOrder
    seq?: SortOrder
    fromTick?: SortOrder
    toTick?: SortOrder
    createdAt?: SortOrder
  }

  export type SimulationRunChunkSumOrderByAggregateInput = {
    seq?: SortOrder
    fromTick?: SortOrder
    toTick?: SortOrder
  }

  export type SimulationCheckpointRunIdTickCompoundUniqueInput = {
    runId: string
    tick: number
  }

  export type SimulationCheckpointCountOrderByAggregateInput = {
    runId?: SortOrder
    tick?: SortOrder
    hash?: SortOrder
    state?: SortOrder
  }

  export type SimulationCheckpointAvgOrderByAggregateInput = {
    tick?: SortOrder
  }

  export type SimulationCheckpointMaxOrderByAggregateInput = {
    runId?: SortOrder
    tick?: SortOrder
    hash?: SortOrder
  }

  export type SimulationCheckpointMinOrderByAggregateInput = {
    runId?: SortOrder
    tick?: SortOrder
    hash?: SortOrder
  }

  export type SimulationCheckpointSumOrderByAggregateInput = {
    tick?: SortOrder
  }

  export type SimulationMetricRunIdTickCompoundUniqueInput = {
    runId: string
    tick: number
  }

  export type SimulationMetricCountOrderByAggregateInput = {
    runId?: SortOrder
    tick?: SortOrder
    values?: SortOrder
  }

  export type SimulationMetricAvgOrderByAggregateInput = {
    tick?: SortOrder
  }

  export type SimulationMetricMaxOrderByAggregateInput = {
    runId?: SortOrder
    tick?: SortOrder
  }

  export type SimulationMetricMinOrderByAggregateInput = {
    runId?: SortOrder
    tick?: SortOrder
  }

  export type SimulationMetricSumOrderByAggregateInput = {
    tick?: SortOrder
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectMemberCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type SceneCreateNestedManyWithoutProjectInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type ProjectMemberUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type SceneUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectMemberUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutProjectInput | ProjectMemberUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutProjectInput | ProjectMemberUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutProjectInput | ProjectMemberUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type SceneUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutProjectInput | SceneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutProjectInput | SceneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutProjectInput | SceneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutProjectInput | ProjectMemberUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutProjectInput | ProjectMemberUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutProjectInput | ProjectMemberUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type SceneUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutProjectInput | SceneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutProjectInput | SceneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutProjectInput | SceneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutMembersInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembersInput = {
    create?: XOR<UserCreateWithoutMembersInput, UserUncheckedCreateWithoutMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumProjectRoleFieldUpdateOperationsInput = {
    set?: $Enums.ProjectRole
  }

  export type ProjectUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput
    upsert?: ProjectUpsertWithoutMembersInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMembersInput, ProjectUpdateWithoutMembersInput>, ProjectUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<UserCreateWithoutMembersInput, UserUncheckedCreateWithoutMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembersInput
    upsert?: UserUpsertWithoutMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembersInput, UserUpdateWithoutMembersInput>, UserUncheckedUpdateWithoutMembersInput>
  }

  export type ProjectCreateNestedOneWithoutScenesInput = {
    create?: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutScenesInput
    connect?: ProjectWhereUniqueInput
  }

  export type SimulationRunCreateNestedManyWithoutSceneInput = {
    create?: XOR<SimulationRunCreateWithoutSceneInput, SimulationRunUncheckedCreateWithoutSceneInput> | SimulationRunCreateWithoutSceneInput[] | SimulationRunUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SimulationRunCreateOrConnectWithoutSceneInput | SimulationRunCreateOrConnectWithoutSceneInput[]
    createMany?: SimulationRunCreateManySceneInputEnvelope
    connect?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
  }

  export type SimulationRunUncheckedCreateNestedManyWithoutSceneInput = {
    create?: XOR<SimulationRunCreateWithoutSceneInput, SimulationRunUncheckedCreateWithoutSceneInput> | SimulationRunCreateWithoutSceneInput[] | SimulationRunUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SimulationRunCreateOrConnectWithoutSceneInput | SimulationRunCreateOrConnectWithoutSceneInput[]
    createMany?: SimulationRunCreateManySceneInputEnvelope
    connect?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
  }

  export type ProjectUpdateOneRequiredWithoutScenesNestedInput = {
    create?: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutScenesInput
    upsert?: ProjectUpsertWithoutScenesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutScenesInput, ProjectUpdateWithoutScenesInput>, ProjectUncheckedUpdateWithoutScenesInput>
  }

  export type SimulationRunUpdateManyWithoutSceneNestedInput = {
    create?: XOR<SimulationRunCreateWithoutSceneInput, SimulationRunUncheckedCreateWithoutSceneInput> | SimulationRunCreateWithoutSceneInput[] | SimulationRunUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SimulationRunCreateOrConnectWithoutSceneInput | SimulationRunCreateOrConnectWithoutSceneInput[]
    upsert?: SimulationRunUpsertWithWhereUniqueWithoutSceneInput | SimulationRunUpsertWithWhereUniqueWithoutSceneInput[]
    createMany?: SimulationRunCreateManySceneInputEnvelope
    set?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    disconnect?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    delete?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    connect?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    update?: SimulationRunUpdateWithWhereUniqueWithoutSceneInput | SimulationRunUpdateWithWhereUniqueWithoutSceneInput[]
    updateMany?: SimulationRunUpdateManyWithWhereWithoutSceneInput | SimulationRunUpdateManyWithWhereWithoutSceneInput[]
    deleteMany?: SimulationRunScalarWhereInput | SimulationRunScalarWhereInput[]
  }

  export type SimulationRunUncheckedUpdateManyWithoutSceneNestedInput = {
    create?: XOR<SimulationRunCreateWithoutSceneInput, SimulationRunUncheckedCreateWithoutSceneInput> | SimulationRunCreateWithoutSceneInput[] | SimulationRunUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SimulationRunCreateOrConnectWithoutSceneInput | SimulationRunCreateOrConnectWithoutSceneInput[]
    upsert?: SimulationRunUpsertWithWhereUniqueWithoutSceneInput | SimulationRunUpsertWithWhereUniqueWithoutSceneInput[]
    createMany?: SimulationRunCreateManySceneInputEnvelope
    set?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    disconnect?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    delete?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    connect?: SimulationRunWhereUniqueInput | SimulationRunWhereUniqueInput[]
    update?: SimulationRunUpdateWithWhereUniqueWithoutSceneInput | SimulationRunUpdateWithWhereUniqueWithoutSceneInput[]
    updateMany?: SimulationRunUpdateManyWithWhereWithoutSceneInput | SimulationRunUpdateManyWithWhereWithoutSceneInput[]
    deleteMany?: SimulationRunScalarWhereInput | SimulationRunScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type SceneCreateNestedOneWithoutRunsInput = {
    create?: XOR<SceneCreateWithoutRunsInput, SceneUncheckedCreateWithoutRunsInput>
    connectOrCreate?: SceneCreateOrConnectWithoutRunsInput
    connect?: SceneWhereUniqueInput
  }

  export type SimulationRunChunkCreateNestedManyWithoutRunInput = {
    create?: XOR<SimulationRunChunkCreateWithoutRunInput, SimulationRunChunkUncheckedCreateWithoutRunInput> | SimulationRunChunkCreateWithoutRunInput[] | SimulationRunChunkUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationRunChunkCreateOrConnectWithoutRunInput | SimulationRunChunkCreateOrConnectWithoutRunInput[]
    createMany?: SimulationRunChunkCreateManyRunInputEnvelope
    connect?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
  }

  export type SimulationCheckpointCreateNestedManyWithoutRunInput = {
    create?: XOR<SimulationCheckpointCreateWithoutRunInput, SimulationCheckpointUncheckedCreateWithoutRunInput> | SimulationCheckpointCreateWithoutRunInput[] | SimulationCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationCheckpointCreateOrConnectWithoutRunInput | SimulationCheckpointCreateOrConnectWithoutRunInput[]
    createMany?: SimulationCheckpointCreateManyRunInputEnvelope
    connect?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
  }

  export type SimulationMetricCreateNestedManyWithoutRunInput = {
    create?: XOR<SimulationMetricCreateWithoutRunInput, SimulationMetricUncheckedCreateWithoutRunInput> | SimulationMetricCreateWithoutRunInput[] | SimulationMetricUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationMetricCreateOrConnectWithoutRunInput | SimulationMetricCreateOrConnectWithoutRunInput[]
    createMany?: SimulationMetricCreateManyRunInputEnvelope
    connect?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
  }

  export type SimulationRunChunkUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<SimulationRunChunkCreateWithoutRunInput, SimulationRunChunkUncheckedCreateWithoutRunInput> | SimulationRunChunkCreateWithoutRunInput[] | SimulationRunChunkUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationRunChunkCreateOrConnectWithoutRunInput | SimulationRunChunkCreateOrConnectWithoutRunInput[]
    createMany?: SimulationRunChunkCreateManyRunInputEnvelope
    connect?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
  }

  export type SimulationCheckpointUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<SimulationCheckpointCreateWithoutRunInput, SimulationCheckpointUncheckedCreateWithoutRunInput> | SimulationCheckpointCreateWithoutRunInput[] | SimulationCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationCheckpointCreateOrConnectWithoutRunInput | SimulationCheckpointCreateOrConnectWithoutRunInput[]
    createMany?: SimulationCheckpointCreateManyRunInputEnvelope
    connect?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
  }

  export type SimulationMetricUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<SimulationMetricCreateWithoutRunInput, SimulationMetricUncheckedCreateWithoutRunInput> | SimulationMetricCreateWithoutRunInput[] | SimulationMetricUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationMetricCreateOrConnectWithoutRunInput | SimulationMetricCreateOrConnectWithoutRunInput[]
    createMany?: SimulationMetricCreateManyRunInputEnvelope
    connect?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSimulationRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.SimulationRunStatus
  }

  export type SceneUpdateOneRequiredWithoutRunsNestedInput = {
    create?: XOR<SceneCreateWithoutRunsInput, SceneUncheckedCreateWithoutRunsInput>
    connectOrCreate?: SceneCreateOrConnectWithoutRunsInput
    upsert?: SceneUpsertWithoutRunsInput
    connect?: SceneWhereUniqueInput
    update?: XOR<XOR<SceneUpdateToOneWithWhereWithoutRunsInput, SceneUpdateWithoutRunsInput>, SceneUncheckedUpdateWithoutRunsInput>
  }

  export type SimulationRunChunkUpdateManyWithoutRunNestedInput = {
    create?: XOR<SimulationRunChunkCreateWithoutRunInput, SimulationRunChunkUncheckedCreateWithoutRunInput> | SimulationRunChunkCreateWithoutRunInput[] | SimulationRunChunkUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationRunChunkCreateOrConnectWithoutRunInput | SimulationRunChunkCreateOrConnectWithoutRunInput[]
    upsert?: SimulationRunChunkUpsertWithWhereUniqueWithoutRunInput | SimulationRunChunkUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: SimulationRunChunkCreateManyRunInputEnvelope
    set?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    disconnect?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    delete?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    connect?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    update?: SimulationRunChunkUpdateWithWhereUniqueWithoutRunInput | SimulationRunChunkUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: SimulationRunChunkUpdateManyWithWhereWithoutRunInput | SimulationRunChunkUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: SimulationRunChunkScalarWhereInput | SimulationRunChunkScalarWhereInput[]
  }

  export type SimulationCheckpointUpdateManyWithoutRunNestedInput = {
    create?: XOR<SimulationCheckpointCreateWithoutRunInput, SimulationCheckpointUncheckedCreateWithoutRunInput> | SimulationCheckpointCreateWithoutRunInput[] | SimulationCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationCheckpointCreateOrConnectWithoutRunInput | SimulationCheckpointCreateOrConnectWithoutRunInput[]
    upsert?: SimulationCheckpointUpsertWithWhereUniqueWithoutRunInput | SimulationCheckpointUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: SimulationCheckpointCreateManyRunInputEnvelope
    set?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    disconnect?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    delete?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    connect?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    update?: SimulationCheckpointUpdateWithWhereUniqueWithoutRunInput | SimulationCheckpointUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: SimulationCheckpointUpdateManyWithWhereWithoutRunInput | SimulationCheckpointUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: SimulationCheckpointScalarWhereInput | SimulationCheckpointScalarWhereInput[]
  }

  export type SimulationMetricUpdateManyWithoutRunNestedInput = {
    create?: XOR<SimulationMetricCreateWithoutRunInput, SimulationMetricUncheckedCreateWithoutRunInput> | SimulationMetricCreateWithoutRunInput[] | SimulationMetricUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationMetricCreateOrConnectWithoutRunInput | SimulationMetricCreateOrConnectWithoutRunInput[]
    upsert?: SimulationMetricUpsertWithWhereUniqueWithoutRunInput | SimulationMetricUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: SimulationMetricCreateManyRunInputEnvelope
    set?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    disconnect?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    delete?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    connect?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    update?: SimulationMetricUpdateWithWhereUniqueWithoutRunInput | SimulationMetricUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: SimulationMetricUpdateManyWithWhereWithoutRunInput | SimulationMetricUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: SimulationMetricScalarWhereInput | SimulationMetricScalarWhereInput[]
  }

  export type SimulationRunChunkUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<SimulationRunChunkCreateWithoutRunInput, SimulationRunChunkUncheckedCreateWithoutRunInput> | SimulationRunChunkCreateWithoutRunInput[] | SimulationRunChunkUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationRunChunkCreateOrConnectWithoutRunInput | SimulationRunChunkCreateOrConnectWithoutRunInput[]
    upsert?: SimulationRunChunkUpsertWithWhereUniqueWithoutRunInput | SimulationRunChunkUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: SimulationRunChunkCreateManyRunInputEnvelope
    set?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    disconnect?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    delete?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    connect?: SimulationRunChunkWhereUniqueInput | SimulationRunChunkWhereUniqueInput[]
    update?: SimulationRunChunkUpdateWithWhereUniqueWithoutRunInput | SimulationRunChunkUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: SimulationRunChunkUpdateManyWithWhereWithoutRunInput | SimulationRunChunkUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: SimulationRunChunkScalarWhereInput | SimulationRunChunkScalarWhereInput[]
  }

  export type SimulationCheckpointUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<SimulationCheckpointCreateWithoutRunInput, SimulationCheckpointUncheckedCreateWithoutRunInput> | SimulationCheckpointCreateWithoutRunInput[] | SimulationCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationCheckpointCreateOrConnectWithoutRunInput | SimulationCheckpointCreateOrConnectWithoutRunInput[]
    upsert?: SimulationCheckpointUpsertWithWhereUniqueWithoutRunInput | SimulationCheckpointUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: SimulationCheckpointCreateManyRunInputEnvelope
    set?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    disconnect?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    delete?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    connect?: SimulationCheckpointWhereUniqueInput | SimulationCheckpointWhereUniqueInput[]
    update?: SimulationCheckpointUpdateWithWhereUniqueWithoutRunInput | SimulationCheckpointUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: SimulationCheckpointUpdateManyWithWhereWithoutRunInput | SimulationCheckpointUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: SimulationCheckpointScalarWhereInput | SimulationCheckpointScalarWhereInput[]
  }

  export type SimulationMetricUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<SimulationMetricCreateWithoutRunInput, SimulationMetricUncheckedCreateWithoutRunInput> | SimulationMetricCreateWithoutRunInput[] | SimulationMetricUncheckedCreateWithoutRunInput[]
    connectOrCreate?: SimulationMetricCreateOrConnectWithoutRunInput | SimulationMetricCreateOrConnectWithoutRunInput[]
    upsert?: SimulationMetricUpsertWithWhereUniqueWithoutRunInput | SimulationMetricUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: SimulationMetricCreateManyRunInputEnvelope
    set?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    disconnect?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    delete?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    connect?: SimulationMetricWhereUniqueInput | SimulationMetricWhereUniqueInput[]
    update?: SimulationMetricUpdateWithWhereUniqueWithoutRunInput | SimulationMetricUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: SimulationMetricUpdateManyWithWhereWithoutRunInput | SimulationMetricUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: SimulationMetricScalarWhereInput | SimulationMetricScalarWhereInput[]
  }

  export type SimulationRunCreateNestedOneWithoutChunksInput = {
    create?: XOR<SimulationRunCreateWithoutChunksInput, SimulationRunUncheckedCreateWithoutChunksInput>
    connectOrCreate?: SimulationRunCreateOrConnectWithoutChunksInput
    connect?: SimulationRunWhereUniqueInput
  }

  export type SimulationRunUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<SimulationRunCreateWithoutChunksInput, SimulationRunUncheckedCreateWithoutChunksInput>
    connectOrCreate?: SimulationRunCreateOrConnectWithoutChunksInput
    upsert?: SimulationRunUpsertWithoutChunksInput
    connect?: SimulationRunWhereUniqueInput
    update?: XOR<XOR<SimulationRunUpdateToOneWithWhereWithoutChunksInput, SimulationRunUpdateWithoutChunksInput>, SimulationRunUncheckedUpdateWithoutChunksInput>
  }

  export type SimulationRunCreateNestedOneWithoutCheckpointsInput = {
    create?: XOR<SimulationRunCreateWithoutCheckpointsInput, SimulationRunUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: SimulationRunCreateOrConnectWithoutCheckpointsInput
    connect?: SimulationRunWhereUniqueInput
  }

  export type SimulationRunUpdateOneRequiredWithoutCheckpointsNestedInput = {
    create?: XOR<SimulationRunCreateWithoutCheckpointsInput, SimulationRunUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: SimulationRunCreateOrConnectWithoutCheckpointsInput
    upsert?: SimulationRunUpsertWithoutCheckpointsInput
    connect?: SimulationRunWhereUniqueInput
    update?: XOR<XOR<SimulationRunUpdateToOneWithWhereWithoutCheckpointsInput, SimulationRunUpdateWithoutCheckpointsInput>, SimulationRunUncheckedUpdateWithoutCheckpointsInput>
  }

  export type SimulationRunCreateNestedOneWithoutMetricsInput = {
    create?: XOR<SimulationRunCreateWithoutMetricsInput, SimulationRunUncheckedCreateWithoutMetricsInput>
    connectOrCreate?: SimulationRunCreateOrConnectWithoutMetricsInput
    connect?: SimulationRunWhereUniqueInput
  }

  export type SimulationRunUpdateOneRequiredWithoutMetricsNestedInput = {
    create?: XOR<SimulationRunCreateWithoutMetricsInput, SimulationRunUncheckedCreateWithoutMetricsInput>
    connectOrCreate?: SimulationRunCreateOrConnectWithoutMetricsInput
    upsert?: SimulationRunUpsertWithoutMetricsInput
    connect?: SimulationRunWhereUniqueInput
    update?: XOR<XOR<SimulationRunUpdateToOneWithWhereWithoutMetricsInput, SimulationRunUpdateWithoutMetricsInput>, SimulationRunUncheckedUpdateWithoutMetricsInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutUserInput | ProjectMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutUserInput | ProjectMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutUserInput | ProjectMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutUserInput | ProjectMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutUserInput | ProjectMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutUserInput | ProjectMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumProjectRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectRoleFilter<$PrismaModel> | $Enums.ProjectRole
  }

  export type NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectRole[] | ListEnumProjectRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel> | $Enums.ProjectRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectRoleFilter<$PrismaModel>
    _max?: NestedEnumProjectRoleFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumSimulationRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SimulationRunStatus | EnumSimulationRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSimulationRunStatusFilter<$PrismaModel> | $Enums.SimulationRunStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumSimulationRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SimulationRunStatus | EnumSimulationRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SimulationRunStatus[] | ListEnumSimulationRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSimulationRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.SimulationRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSimulationRunStatusFilter<$PrismaModel>
    _max?: NestedEnumSimulationRunStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    members?: ProjectMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    members?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectMemberCreateWithoutProjectInput = {
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMembersInput
  }

  export type ProjectMemberUncheckedCreateWithoutProjectInput = {
    userId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
  }

  export type ProjectMemberCreateOrConnectWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    create: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMemberCreateManyProjectInputEnvelope = {
    data: ProjectMemberCreateManyProjectInput | ProjectMemberCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type SceneCreateWithoutProjectInput = {
    id?: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: SimulationRunCreateNestedManyWithoutSceneInput
  }

  export type SceneUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: SimulationRunUncheckedCreateNestedManyWithoutSceneInput
  }

  export type SceneCreateOrConnectWithoutProjectInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput>
  }

  export type SceneCreateManyProjectInputEnvelope = {
    data: SceneCreateManyProjectInput | SceneCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    members?: ProjectMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    members?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectMemberUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    update: XOR<ProjectMemberUpdateWithoutProjectInput, ProjectMemberUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMemberUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    data: XOR<ProjectMemberUpdateWithoutProjectInput, ProjectMemberUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMemberUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectMemberScalarWhereInput
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectMemberScalarWhereInput = {
    AND?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
    OR?: ProjectMemberScalarWhereInput[]
    NOT?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
    projectId?: UuidFilter<"ProjectMember"> | string
    userId?: UuidFilter<"ProjectMember"> | string
    role?: EnumProjectRoleFilter<"ProjectMember"> | $Enums.ProjectRole
    createdAt?: DateTimeFilter<"ProjectMember"> | Date | string
  }

  export type SceneUpsertWithWhereUniqueWithoutProjectInput = {
    where: SceneWhereUniqueInput
    update: XOR<SceneUpdateWithoutProjectInput, SceneUncheckedUpdateWithoutProjectInput>
    create: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput>
  }

  export type SceneUpdateWithWhereUniqueWithoutProjectInput = {
    where: SceneWhereUniqueInput
    data: XOR<SceneUpdateWithoutProjectInput, SceneUncheckedUpdateWithoutProjectInput>
  }

  export type SceneUpdateManyWithWhereWithoutProjectInput = {
    where: SceneScalarWhereInput
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyWithoutProjectInput>
  }

  export type SceneScalarWhereInput = {
    AND?: SceneScalarWhereInput | SceneScalarWhereInput[]
    OR?: SceneScalarWhereInput[]
    NOT?: SceneScalarWhereInput | SceneScalarWhereInput[]
    id?: UuidFilter<"Scene"> | string
    projectId?: UuidFilter<"Scene"> | string
    name?: StringFilter<"Scene"> | string
    data?: JsonFilter<"Scene">
    createdAt?: DateTimeFilter<"Scene"> | Date | string
    updatedAt?: DateTimeFilter<"Scene"> | Date | string
  }

  export type ProjectCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    scenes?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMembersInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scenes?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMembersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutMembersInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembersInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembersInput, UserUncheckedCreateWithoutMembersInput>
  }

  export type ProjectUpsertWithoutMembersInput = {
    update: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMembersInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
  }

  export type ProjectUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    scenes?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scenes?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutMembersInput = {
    update: XOR<UserUpdateWithoutMembersInput, UserUncheckedUpdateWithoutMembersInput>
    create: XOR<UserCreateWithoutMembersInput, UserUncheckedCreateWithoutMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembersInput, UserUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutScenesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    members?: ProjectMemberCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutScenesInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutScenesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
  }

  export type SimulationRunCreateWithoutSceneInput = {
    id?: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    chunks?: SimulationRunChunkCreateNestedManyWithoutRunInput
    checkpoints?: SimulationCheckpointCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricCreateNestedManyWithoutRunInput
  }

  export type SimulationRunUncheckedCreateWithoutSceneInput = {
    id?: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    chunks?: SimulationRunChunkUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: SimulationCheckpointUncheckedCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricUncheckedCreateNestedManyWithoutRunInput
  }

  export type SimulationRunCreateOrConnectWithoutSceneInput = {
    where: SimulationRunWhereUniqueInput
    create: XOR<SimulationRunCreateWithoutSceneInput, SimulationRunUncheckedCreateWithoutSceneInput>
  }

  export type SimulationRunCreateManySceneInputEnvelope = {
    data: SimulationRunCreateManySceneInput | SimulationRunCreateManySceneInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutScenesInput = {
    update: XOR<ProjectUpdateWithoutScenesInput, ProjectUncheckedUpdateWithoutScenesInput>
    create: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutScenesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutScenesInput, ProjectUncheckedUpdateWithoutScenesInput>
  }

  export type ProjectUpdateWithoutScenesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    members?: ProjectMemberUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutScenesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type SimulationRunUpsertWithWhereUniqueWithoutSceneInput = {
    where: SimulationRunWhereUniqueInput
    update: XOR<SimulationRunUpdateWithoutSceneInput, SimulationRunUncheckedUpdateWithoutSceneInput>
    create: XOR<SimulationRunCreateWithoutSceneInput, SimulationRunUncheckedCreateWithoutSceneInput>
  }

  export type SimulationRunUpdateWithWhereUniqueWithoutSceneInput = {
    where: SimulationRunWhereUniqueInput
    data: XOR<SimulationRunUpdateWithoutSceneInput, SimulationRunUncheckedUpdateWithoutSceneInput>
  }

  export type SimulationRunUpdateManyWithWhereWithoutSceneInput = {
    where: SimulationRunScalarWhereInput
    data: XOR<SimulationRunUpdateManyMutationInput, SimulationRunUncheckedUpdateManyWithoutSceneInput>
  }

  export type SimulationRunScalarWhereInput = {
    AND?: SimulationRunScalarWhereInput | SimulationRunScalarWhereInput[]
    OR?: SimulationRunScalarWhereInput[]
    NOT?: SimulationRunScalarWhereInput | SimulationRunScalarWhereInput[]
    id?: UuidFilter<"SimulationRun"> | string
    sceneId?: UuidFilter<"SimulationRun"> | string
    setup?: JsonFilter<"SimulationRun">
    engineVersion?: IntFilter<"SimulationRun"> | number
    status?: EnumSimulationRunStatusFilter<"SimulationRun"> | $Enums.SimulationRunStatus
    lastTick?: IntFilter<"SimulationRun"> | number
    startedAt?: DateTimeFilter<"SimulationRun"> | Date | string
    lastHeartbeatAt?: DateTimeFilter<"SimulationRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"SimulationRun"> | Date | string | null
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    members?: ProjectMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    createdAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    members?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    members?: ProjectMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    members?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SceneCreateWithoutRunsInput = {
    id?: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutScenesInput
  }

  export type SceneUncheckedCreateWithoutRunsInput = {
    id?: string
    projectId: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SceneCreateOrConnectWithoutRunsInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutRunsInput, SceneUncheckedCreateWithoutRunsInput>
  }

  export type SimulationRunChunkCreateWithoutRunInput = {
    seq: number
    fromTick: number
    toTick: number
    commands: JsonNullValueInput | InputJsonValue
    events: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SimulationRunChunkUncheckedCreateWithoutRunInput = {
    seq: number
    fromTick: number
    toTick: number
    commands: JsonNullValueInput | InputJsonValue
    events: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SimulationRunChunkCreateOrConnectWithoutRunInput = {
    where: SimulationRunChunkWhereUniqueInput
    create: XOR<SimulationRunChunkCreateWithoutRunInput, SimulationRunChunkUncheckedCreateWithoutRunInput>
  }

  export type SimulationRunChunkCreateManyRunInputEnvelope = {
    data: SimulationRunChunkCreateManyRunInput | SimulationRunChunkCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type SimulationCheckpointCreateWithoutRunInput = {
    tick: number
    hash: string
    state: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointUncheckedCreateWithoutRunInput = {
    tick: number
    hash: string
    state: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointCreateOrConnectWithoutRunInput = {
    where: SimulationCheckpointWhereUniqueInput
    create: XOR<SimulationCheckpointCreateWithoutRunInput, SimulationCheckpointUncheckedCreateWithoutRunInput>
  }

  export type SimulationCheckpointCreateManyRunInputEnvelope = {
    data: SimulationCheckpointCreateManyRunInput | SimulationCheckpointCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type SimulationMetricCreateWithoutRunInput = {
    tick: number
    values: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricUncheckedCreateWithoutRunInput = {
    tick: number
    values: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricCreateOrConnectWithoutRunInput = {
    where: SimulationMetricWhereUniqueInput
    create: XOR<SimulationMetricCreateWithoutRunInput, SimulationMetricUncheckedCreateWithoutRunInput>
  }

  export type SimulationMetricCreateManyRunInputEnvelope = {
    data: SimulationMetricCreateManyRunInput | SimulationMetricCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type SceneUpsertWithoutRunsInput = {
    update: XOR<SceneUpdateWithoutRunsInput, SceneUncheckedUpdateWithoutRunsInput>
    create: XOR<SceneCreateWithoutRunsInput, SceneUncheckedCreateWithoutRunsInput>
    where?: SceneWhereInput
  }

  export type SceneUpdateToOneWithWhereWithoutRunsInput = {
    where?: SceneWhereInput
    data: XOR<SceneUpdateWithoutRunsInput, SceneUncheckedUpdateWithoutRunsInput>
  }

  export type SceneUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutScenesNestedInput
  }

  export type SceneUncheckedUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationRunChunkUpsertWithWhereUniqueWithoutRunInput = {
    where: SimulationRunChunkWhereUniqueInput
    update: XOR<SimulationRunChunkUpdateWithoutRunInput, SimulationRunChunkUncheckedUpdateWithoutRunInput>
    create: XOR<SimulationRunChunkCreateWithoutRunInput, SimulationRunChunkUncheckedCreateWithoutRunInput>
  }

  export type SimulationRunChunkUpdateWithWhereUniqueWithoutRunInput = {
    where: SimulationRunChunkWhereUniqueInput
    data: XOR<SimulationRunChunkUpdateWithoutRunInput, SimulationRunChunkUncheckedUpdateWithoutRunInput>
  }

  export type SimulationRunChunkUpdateManyWithWhereWithoutRunInput = {
    where: SimulationRunChunkScalarWhereInput
    data: XOR<SimulationRunChunkUpdateManyMutationInput, SimulationRunChunkUncheckedUpdateManyWithoutRunInput>
  }

  export type SimulationRunChunkScalarWhereInput = {
    AND?: SimulationRunChunkScalarWhereInput | SimulationRunChunkScalarWhereInput[]
    OR?: SimulationRunChunkScalarWhereInput[]
    NOT?: SimulationRunChunkScalarWhereInput | SimulationRunChunkScalarWhereInput[]
    runId?: UuidFilter<"SimulationRunChunk"> | string
    seq?: IntFilter<"SimulationRunChunk"> | number
    fromTick?: IntFilter<"SimulationRunChunk"> | number
    toTick?: IntFilter<"SimulationRunChunk"> | number
    commands?: JsonFilter<"SimulationRunChunk">
    events?: JsonFilter<"SimulationRunChunk">
    createdAt?: DateTimeFilter<"SimulationRunChunk"> | Date | string
  }

  export type SimulationCheckpointUpsertWithWhereUniqueWithoutRunInput = {
    where: SimulationCheckpointWhereUniqueInput
    update: XOR<SimulationCheckpointUpdateWithoutRunInput, SimulationCheckpointUncheckedUpdateWithoutRunInput>
    create: XOR<SimulationCheckpointCreateWithoutRunInput, SimulationCheckpointUncheckedCreateWithoutRunInput>
  }

  export type SimulationCheckpointUpdateWithWhereUniqueWithoutRunInput = {
    where: SimulationCheckpointWhereUniqueInput
    data: XOR<SimulationCheckpointUpdateWithoutRunInput, SimulationCheckpointUncheckedUpdateWithoutRunInput>
  }

  export type SimulationCheckpointUpdateManyWithWhereWithoutRunInput = {
    where: SimulationCheckpointScalarWhereInput
    data: XOR<SimulationCheckpointUpdateManyMutationInput, SimulationCheckpointUncheckedUpdateManyWithoutRunInput>
  }

  export type SimulationCheckpointScalarWhereInput = {
    AND?: SimulationCheckpointScalarWhereInput | SimulationCheckpointScalarWhereInput[]
    OR?: SimulationCheckpointScalarWhereInput[]
    NOT?: SimulationCheckpointScalarWhereInput | SimulationCheckpointScalarWhereInput[]
    runId?: UuidFilter<"SimulationCheckpoint"> | string
    tick?: IntFilter<"SimulationCheckpoint"> | number
    hash?: StringFilter<"SimulationCheckpoint"> | string
    state?: JsonFilter<"SimulationCheckpoint">
  }

  export type SimulationMetricUpsertWithWhereUniqueWithoutRunInput = {
    where: SimulationMetricWhereUniqueInput
    update: XOR<SimulationMetricUpdateWithoutRunInput, SimulationMetricUncheckedUpdateWithoutRunInput>
    create: XOR<SimulationMetricCreateWithoutRunInput, SimulationMetricUncheckedCreateWithoutRunInput>
  }

  export type SimulationMetricUpdateWithWhereUniqueWithoutRunInput = {
    where: SimulationMetricWhereUniqueInput
    data: XOR<SimulationMetricUpdateWithoutRunInput, SimulationMetricUncheckedUpdateWithoutRunInput>
  }

  export type SimulationMetricUpdateManyWithWhereWithoutRunInput = {
    where: SimulationMetricScalarWhereInput
    data: XOR<SimulationMetricUpdateManyMutationInput, SimulationMetricUncheckedUpdateManyWithoutRunInput>
  }

  export type SimulationMetricScalarWhereInput = {
    AND?: SimulationMetricScalarWhereInput | SimulationMetricScalarWhereInput[]
    OR?: SimulationMetricScalarWhereInput[]
    NOT?: SimulationMetricScalarWhereInput | SimulationMetricScalarWhereInput[]
    runId?: UuidFilter<"SimulationMetric"> | string
    tick?: IntFilter<"SimulationMetric"> | number
    values?: JsonFilter<"SimulationMetric">
  }

  export type SimulationRunCreateWithoutChunksInput = {
    id?: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    scene: SceneCreateNestedOneWithoutRunsInput
    checkpoints?: SimulationCheckpointCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricCreateNestedManyWithoutRunInput
  }

  export type SimulationRunUncheckedCreateWithoutChunksInput = {
    id?: string
    sceneId: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    checkpoints?: SimulationCheckpointUncheckedCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricUncheckedCreateNestedManyWithoutRunInput
  }

  export type SimulationRunCreateOrConnectWithoutChunksInput = {
    where: SimulationRunWhereUniqueInput
    create: XOR<SimulationRunCreateWithoutChunksInput, SimulationRunUncheckedCreateWithoutChunksInput>
  }

  export type SimulationRunUpsertWithoutChunksInput = {
    update: XOR<SimulationRunUpdateWithoutChunksInput, SimulationRunUncheckedUpdateWithoutChunksInput>
    create: XOR<SimulationRunCreateWithoutChunksInput, SimulationRunUncheckedCreateWithoutChunksInput>
    where?: SimulationRunWhereInput
  }

  export type SimulationRunUpdateToOneWithWhereWithoutChunksInput = {
    where?: SimulationRunWhereInput
    data: XOR<SimulationRunUpdateWithoutChunksInput, SimulationRunUncheckedUpdateWithoutChunksInput>
  }

  export type SimulationRunUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scene?: SceneUpdateOneRequiredWithoutRunsNestedInput
    checkpoints?: SimulationCheckpointUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunUncheckedUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneId?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkpoints?: SimulationCheckpointUncheckedUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUncheckedUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunCreateWithoutCheckpointsInput = {
    id?: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    scene: SceneCreateNestedOneWithoutRunsInput
    chunks?: SimulationRunChunkCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricCreateNestedManyWithoutRunInput
  }

  export type SimulationRunUncheckedCreateWithoutCheckpointsInput = {
    id?: string
    sceneId: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    chunks?: SimulationRunChunkUncheckedCreateNestedManyWithoutRunInput
    metrics?: SimulationMetricUncheckedCreateNestedManyWithoutRunInput
  }

  export type SimulationRunCreateOrConnectWithoutCheckpointsInput = {
    where: SimulationRunWhereUniqueInput
    create: XOR<SimulationRunCreateWithoutCheckpointsInput, SimulationRunUncheckedCreateWithoutCheckpointsInput>
  }

  export type SimulationRunUpsertWithoutCheckpointsInput = {
    update: XOR<SimulationRunUpdateWithoutCheckpointsInput, SimulationRunUncheckedUpdateWithoutCheckpointsInput>
    create: XOR<SimulationRunCreateWithoutCheckpointsInput, SimulationRunUncheckedCreateWithoutCheckpointsInput>
    where?: SimulationRunWhereInput
  }

  export type SimulationRunUpdateToOneWithWhereWithoutCheckpointsInput = {
    where?: SimulationRunWhereInput
    data: XOR<SimulationRunUpdateWithoutCheckpointsInput, SimulationRunUncheckedUpdateWithoutCheckpointsInput>
  }

  export type SimulationRunUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scene?: SceneUpdateOneRequiredWithoutRunsNestedInput
    chunks?: SimulationRunChunkUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunUncheckedUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneId?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: SimulationRunChunkUncheckedUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUncheckedUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunCreateWithoutMetricsInput = {
    id?: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    scene: SceneCreateNestedOneWithoutRunsInput
    chunks?: SimulationRunChunkCreateNestedManyWithoutRunInput
    checkpoints?: SimulationCheckpointCreateNestedManyWithoutRunInput
  }

  export type SimulationRunUncheckedCreateWithoutMetricsInput = {
    id?: string
    sceneId: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
    chunks?: SimulationRunChunkUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: SimulationCheckpointUncheckedCreateNestedManyWithoutRunInput
  }

  export type SimulationRunCreateOrConnectWithoutMetricsInput = {
    where: SimulationRunWhereUniqueInput
    create: XOR<SimulationRunCreateWithoutMetricsInput, SimulationRunUncheckedCreateWithoutMetricsInput>
  }

  export type SimulationRunUpsertWithoutMetricsInput = {
    update: XOR<SimulationRunUpdateWithoutMetricsInput, SimulationRunUncheckedUpdateWithoutMetricsInput>
    create: XOR<SimulationRunCreateWithoutMetricsInput, SimulationRunUncheckedCreateWithoutMetricsInput>
    where?: SimulationRunWhereInput
  }

  export type SimulationRunUpdateToOneWithWhereWithoutMetricsInput = {
    where?: SimulationRunWhereInput
    data: XOR<SimulationRunUpdateWithoutMetricsInput, SimulationRunUncheckedUpdateWithoutMetricsInput>
  }

  export type SimulationRunUpdateWithoutMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scene?: SceneUpdateOneRequiredWithoutRunsNestedInput
    chunks?: SimulationRunChunkUpdateManyWithoutRunNestedInput
    checkpoints?: SimulationCheckpointUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunUncheckedUpdateWithoutMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneId?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: SimulationRunChunkUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: SimulationCheckpointUncheckedUpdateManyWithoutRunNestedInput
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    refreshHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    refreshHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ProjectMemberCreateNestedManyWithoutProjectInput
    scenes?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    scenes?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectMemberCreateWithoutUserInput = {
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutMembersInput
  }

  export type ProjectMemberUncheckedCreateWithoutUserInput = {
    projectId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
  }

  export type ProjectMemberCreateOrConnectWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    create: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput>
  }

  export type ProjectMemberCreateManyUserInputEnvelope = {
    data: ProjectMemberCreateManyUserInput | ProjectMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: UuidFilter<"Session"> | string
    userId?: UuidFilter<"Session"> | string
    refreshHash?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: UuidFilter<"Project"> | string
    userId?: UuidFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ProjectMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    update: XOR<ProjectMemberUpdateWithoutUserInput, ProjectMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput>
  }

  export type ProjectMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    data: XOR<ProjectMemberUpdateWithoutUserInput, ProjectMemberUncheckedUpdateWithoutUserInput>
  }

  export type ProjectMemberUpdateManyWithWhereWithoutUserInput = {
    where: ProjectMemberScalarWhereInput
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectMemberCreateManyProjectInput = {
    userId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
  }

  export type SceneCreateManyProjectInput = {
    id?: string
    name: string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberUpdateWithoutProjectInput = {
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUncheckedUpdateManyWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: SimulationRunUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: SimulationRunUncheckedUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationRunCreateManySceneInput = {
    id?: string
    setup: JsonNullValueInput | InputJsonValue
    engineVersion: number
    status?: $Enums.SimulationRunStatus
    lastTick?: number
    startedAt?: Date | string
    lastHeartbeatAt?: Date | string
    endedAt?: Date | string | null
  }

  export type SimulationRunUpdateWithoutSceneInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: SimulationRunChunkUpdateManyWithoutRunNestedInput
    checkpoints?: SimulationCheckpointUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunUncheckedUpdateWithoutSceneInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: SimulationRunChunkUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: SimulationCheckpointUncheckedUpdateManyWithoutRunNestedInput
    metrics?: SimulationMetricUncheckedUpdateManyWithoutRunNestedInput
  }

  export type SimulationRunUncheckedUpdateManyWithoutSceneInput = {
    id?: StringFieldUpdateOperationsInput | string
    setup?: JsonNullValueInput | InputJsonValue
    engineVersion?: IntFieldUpdateOperationsInput | number
    status?: EnumSimulationRunStatusFieldUpdateOperationsInput | $Enums.SimulationRunStatus
    lastTick?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SimulationRunChunkCreateManyRunInput = {
    seq: number
    fromTick: number
    toTick: number
    commands: JsonNullValueInput | InputJsonValue
    events: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SimulationCheckpointCreateManyRunInput = {
    tick: number
    hash: string
    state: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricCreateManyRunInput = {
    tick: number
    values: JsonNullValueInput | InputJsonValue
  }

  export type SimulationRunChunkUpdateWithoutRunInput = {
    seq?: IntFieldUpdateOperationsInput | number
    fromTick?: IntFieldUpdateOperationsInput | number
    toTick?: IntFieldUpdateOperationsInput | number
    commands?: JsonNullValueInput | InputJsonValue
    events?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationRunChunkUncheckedUpdateWithoutRunInput = {
    seq?: IntFieldUpdateOperationsInput | number
    fromTick?: IntFieldUpdateOperationsInput | number
    toTick?: IntFieldUpdateOperationsInput | number
    commands?: JsonNullValueInput | InputJsonValue
    events?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationRunChunkUncheckedUpdateManyWithoutRunInput = {
    seq?: IntFieldUpdateOperationsInput | number
    fromTick?: IntFieldUpdateOperationsInput | number
    toTick?: IntFieldUpdateOperationsInput | number
    commands?: JsonNullValueInput | InputJsonValue
    events?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SimulationCheckpointUpdateWithoutRunInput = {
    tick?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointUncheckedUpdateWithoutRunInput = {
    tick?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationCheckpointUncheckedUpdateManyWithoutRunInput = {
    tick?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricUpdateWithoutRunInput = {
    tick?: IntFieldUpdateOperationsInput | number
    values?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricUncheckedUpdateWithoutRunInput = {
    tick?: IntFieldUpdateOperationsInput | number
    values?: JsonNullValueInput | InputJsonValue
  }

  export type SimulationMetricUncheckedUpdateManyWithoutRunInput = {
    tick?: IntFieldUpdateOperationsInput | number
    values?: JsonNullValueInput | InputJsonValue
  }

  export type SessionCreateManyUserInput = {
    id?: string
    refreshHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberCreateManyUserInput = {
    projectId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ProjectMemberUpdateManyWithoutProjectNestedInput
    scenes?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    scenes?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUpdateWithoutUserInput = {
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUncheckedUpdateManyWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}