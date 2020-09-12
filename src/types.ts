type TupleLike<T = unknown> = readonly T[] | readonly [T]

export type ValueOf<T> = T[keyof T]

export type NonEmptyArray<T> = [T, ...T[]]

type Prepend<T, U extends Array<unknown>> = ((
  head: T,
  ...tail: U
) => void) extends ((...all: infer V) => void)
  ? V
  : []

type Head<T> = T extends [infer U, ...any[]] ? U : never

type Tail<T> = T extends [any, ...infer U] ? U : never

export type DropLast<T extends TupleLike> = T extends readonly [...infer U, any]
  ? U
  : [...T]
export type DropFirst<T extends TupleLike> = T extends readonly [
  any,
  ...infer U
]
  ? U
  : [...T]

type Ranges<T extends TupleLike<string>, Accumulator extends any[] = []> = {
  done: Accumulator
  next: Ranges<DropFirst<T>, Prepend<[Head<T>, Tail<T>[number]], Accumulator>>
}[T extends NonEmptyArray<any> ? "next" : "done"]

export type Between<T extends TupleLike<string>> = DropFirst<Ranges<T>>[number]

/** The props used in your component */
export interface MediaBreakpointProps<B extends NonEmptyArray<string>> {
  at?: ValueOf<B>
  lessThan?: ValueOf<DropFirst<B>>
  greaterThan?: ValueOf<DropLast<B>>
  greaterThanOrEqual?: ValueOf<B>
  between?: Between<B>
}
