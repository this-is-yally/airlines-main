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

        createMany: procedure.input($Schema.AircraftInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aircraft.createMany(input as any))),

        create: procedure.input($Schema.AircraftInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aircraft.create(input as any))),

        deleteMany: procedure.input($Schema.AircraftInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aircraft.deleteMany(input as any))),

        delete: procedure.input($Schema.AircraftInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aircraft.delete(input as any))),

        findFirst: procedure.input($Schema.AircraftInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).aircraft.findFirst(input as any))),

        findMany: procedure.input($Schema.AircraftInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).aircraft.findMany(input as any))),

        findUnique: procedure.input($Schema.AircraftInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).aircraft.findUnique(input as any))),

        updateMany: procedure.input($Schema.AircraftInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aircraft.updateMany(input as any))),

        update: procedure.input($Schema.AircraftInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aircraft.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AircraftCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AircraftCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AircraftCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AircraftCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AircraftCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AircraftCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AircraftGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AircraftGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AircraftCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AircraftCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AircraftGetPayload<T>, Context>) => Promise<Prisma.AircraftGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AircraftDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AircraftDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AircraftDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AircraftDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AircraftDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AircraftDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AircraftGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AircraftGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AircraftDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AircraftDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AircraftGetPayload<T>, Context>) => Promise<Prisma.AircraftGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AircraftFindFirstArgs, TData = Prisma.AircraftGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AircraftFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AircraftGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AircraftFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AircraftFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AircraftGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AircraftGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AircraftFindManyArgs, TData = Array<Prisma.AircraftGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.AircraftFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AircraftGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AircraftFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AircraftFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AircraftGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AircraftGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AircraftFindUniqueArgs, TData = Prisma.AircraftGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AircraftFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AircraftGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AircraftFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AircraftFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AircraftGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AircraftGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AircraftUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AircraftUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AircraftUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AircraftUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AircraftUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AircraftUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AircraftGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AircraftGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AircraftUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AircraftUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AircraftGetPayload<T>, Context>) => Promise<Prisma.AircraftGetPayload<T>>
            };

    };
}
