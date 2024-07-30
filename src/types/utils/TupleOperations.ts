/* eslint-disable @typescript-eslint/no-explicit-any */
import type {PositiveInfinity} from 'type-fest';
import type NonPartial from './NonPartial';

// Based on: https://stackoverflow.com/questions/67605122/obtain-a-slice-of-a-typescript-parameters-tuple
/**
 * Split a tuple into two parts: the first `N` elements and the rest.
 */
type TupleSplit<T, N extends number, O extends readonly any[] = readonly []> = O['length'] extends N
    ? [O, T]
    : T extends readonly [infer F, ...infer R]
    ? TupleSplit<readonly [...R], N, readonly [...O, F]>
    : T extends readonly [...infer RR]
    ? readonly [[...O, RR], T]
    : [O, T];

/**
 * Get the first `N` elements of a tuple. If `N` is not provided, it defaults to the length of the tuple.
 * `number extends N ? PositiveInfinity : N` is a hack to accomodate for rest parameters.
 */
type TakeFirst<T extends readonly any[], N extends number = T['length']> = TupleSplit<NonPartial<T>, number extends N ? PositiveInfinity : N>[0];

export type {TupleSplit, TakeFirst};
