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

        createMany: procedure.input($Schema.SeatInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).seat.createMany(input as any))),

        create: procedure.input($Schema.SeatInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).seat.create(input as any))),

        deleteMany: procedure.input($Schema.SeatInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).seat.deleteMany(input as any))),

        delete: procedure.input($Schema.SeatInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).seat.delete(input as any))),

        findFirst: procedure.input($Schema.SeatInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).seat.findFirst(input as any))),

        findMany: procedure.input($Schema.SeatInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).seat.findMany(input as any))),

        findUnique: procedure.input($Schema.SeatInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).seat.findUnique(input as any))),

        updateMany: procedure.input($Schema.SeatInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).seat.updateMany(input as any))),

        update: procedure.input($Schema.SeatInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).seat.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SeatCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SeatCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SeatCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SeatCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SeatCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SeatCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SeatGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SeatGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SeatCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SeatCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SeatGetPayload<T>, Context>) => Promise<Prisma.SeatGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SeatDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SeatDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SeatDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SeatDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SeatDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SeatDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SeatGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SeatGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SeatDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SeatDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SeatGetPayload<T>, Context>) => Promise<Prisma.SeatGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SeatFindFirstArgs, TData = Prisma.SeatGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SeatFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SeatGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SeatFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SeatFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SeatGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SeatGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SeatFindManyArgs, TData = Array<Prisma.SeatGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.SeatFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SeatGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SeatFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SeatFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SeatGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SeatGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SeatFindUniqueArgs, TData = Prisma.SeatGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SeatFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SeatGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SeatFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SeatFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SeatGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SeatGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SeatUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SeatUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SeatUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SeatUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SeatUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SeatUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SeatGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SeatGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SeatUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SeatUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SeatGetPayload<T>, Context>) => Promise<Prisma.SeatGetPayload<T>>
            };

    };
}
