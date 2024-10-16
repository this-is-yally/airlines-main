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

        createMany: procedure.input($Schema.AirportInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).airport.createMany(input as any))),

        create: procedure.input($Schema.AirportInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).airport.create(input as any))),

        deleteMany: procedure.input($Schema.AirportInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).airport.deleteMany(input as any))),

        delete: procedure.input($Schema.AirportInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).airport.delete(input as any))),

        findFirst: procedure.input($Schema.AirportInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).airport.findFirst(input as any))),

        findMany: procedure.input($Schema.AirportInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).airport.findMany(input as any))),

        findUnique: procedure.input($Schema.AirportInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).airport.findUnique(input as any))),

        updateMany: procedure.input($Schema.AirportInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).airport.updateMany(input as any))),

        update: procedure.input($Schema.AirportInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).airport.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AirportCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AirportCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AirportCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AirportCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AirportCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AirportCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AirportGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AirportGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AirportCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AirportCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AirportGetPayload<T>, Context>) => Promise<Prisma.AirportGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AirportDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AirportDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AirportDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AirportDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AirportDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AirportDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AirportGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AirportGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AirportDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AirportDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AirportGetPayload<T>, Context>) => Promise<Prisma.AirportGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AirportFindFirstArgs, TData = Prisma.AirportGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AirportFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AirportGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AirportFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AirportFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AirportGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AirportGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AirportFindManyArgs, TData = Array<Prisma.AirportGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.AirportFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AirportGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AirportFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AirportFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AirportGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AirportGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AirportFindUniqueArgs, TData = Prisma.AirportGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AirportFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AirportGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AirportFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AirportFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AirportGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AirportGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AirportUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AirportUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AirportUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AirportUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AirportUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AirportUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AirportGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AirportGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AirportUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AirportUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AirportGetPayload<T>, Context>) => Promise<Prisma.AirportGetPayload<T>>
            };

    };
}
