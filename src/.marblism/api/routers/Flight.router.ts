/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.FlightInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).flight.createMany(input as any))),

        create: procedure.input($Schema.FlightInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).flight.create(input as any))),

        deleteMany: procedure.input($Schema.FlightInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).flight.deleteMany(input as any))),

        delete: procedure.input($Schema.FlightInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).flight.delete(input as any))),

        findFirst: procedure.input($Schema.FlightInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).flight.findFirst(input as any))),

        findMany: procedure.input($Schema.FlightInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).flight.findMany(input as any))),

        findUnique: procedure.input($Schema.FlightInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).flight.findUnique(input as any))),

        updateMany: procedure.input($Schema.FlightInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).flight.updateMany(input as any))),

        update: procedure.input($Schema.FlightInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).flight.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.FlightCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FlightCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FlightCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FlightCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.FlightCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FlightCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FlightGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FlightGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FlightCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FlightCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FlightGetPayload<T>, Context>) => Promise<Prisma.FlightGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.FlightDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FlightDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FlightDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FlightDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.FlightDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FlightDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FlightGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FlightGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FlightDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FlightDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FlightGetPayload<T>, Context>) => Promise<Prisma.FlightGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.FlightFindFirstArgs, TData = Prisma.FlightGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FlightFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FlightGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FlightFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FlightFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FlightGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FlightGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.FlightFindManyArgs, TData = Array<Prisma.FlightGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.FlightFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.FlightGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FlightFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FlightFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.FlightGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.FlightGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.FlightFindUniqueArgs, TData = Prisma.FlightGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FlightFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FlightGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FlightFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FlightFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FlightGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FlightGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.FlightUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FlightUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FlightUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FlightUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.FlightUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FlightUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FlightGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FlightGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FlightUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FlightUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FlightGetPayload<T>, Context>) => Promise<Prisma.FlightGetPayload<T>>
            };

    };
}
