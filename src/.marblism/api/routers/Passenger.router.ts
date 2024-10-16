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

        createMany: procedure.input($Schema.PassengerInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).passenger.createMany(input as any))),

        create: procedure.input($Schema.PassengerInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).passenger.create(input as any))),

        deleteMany: procedure.input($Schema.PassengerInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).passenger.deleteMany(input as any))),

        delete: procedure.input($Schema.PassengerInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).passenger.delete(input as any))),

        findFirst: procedure.input($Schema.PassengerInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).passenger.findFirst(input as any))),

        findMany: procedure.input($Schema.PassengerInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).passenger.findMany(input as any))),

        findUnique: procedure.input($Schema.PassengerInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).passenger.findUnique(input as any))),

        updateMany: procedure.input($Schema.PassengerInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).passenger.updateMany(input as any))),

        update: procedure.input($Schema.PassengerInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).passenger.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PassengerCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PassengerCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PassengerCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PassengerCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PassengerCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PassengerCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PassengerGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PassengerGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PassengerCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PassengerCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PassengerGetPayload<T>, Context>) => Promise<Prisma.PassengerGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PassengerDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PassengerDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PassengerDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PassengerDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PassengerDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PassengerDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PassengerGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PassengerGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PassengerDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PassengerDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PassengerGetPayload<T>, Context>) => Promise<Prisma.PassengerGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PassengerFindFirstArgs, TData = Prisma.PassengerGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PassengerFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PassengerGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PassengerFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PassengerFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PassengerGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PassengerGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PassengerFindManyArgs, TData = Array<Prisma.PassengerGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.PassengerFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PassengerGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PassengerFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PassengerFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PassengerGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PassengerGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PassengerFindUniqueArgs, TData = Prisma.PassengerGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PassengerFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PassengerGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PassengerFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PassengerFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PassengerGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PassengerGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PassengerUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PassengerUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PassengerUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PassengerUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PassengerUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PassengerUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PassengerGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PassengerGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PassengerUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PassengerUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PassengerGetPayload<T>, Context>) => Promise<Prisma.PassengerGetPayload<T>>
            };

    };
}
