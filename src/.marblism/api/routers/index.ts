/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createAirportRouter from "./Airport.router";
import createAircraftRouter from "./Aircraft.router";
import createFlightRouter from "./Flight.router";
import createSeatRouter from "./Seat.router";
import createPassengerRouter from "./Passenger.router";
import createBookingRouter from "./Booking.router";
import createPaymentRouter from "./Payment.router";
import createNotificationRouter from "./Notification.router";
import createSupportTicketRouter from "./SupportTicket.router";
import createUserRouter from "./User.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as AirportClientType } from "./Airport.router";
import { ClientType as AircraftClientType } from "./Aircraft.router";
import { ClientType as FlightClientType } from "./Flight.router";
import { ClientType as SeatClientType } from "./Seat.router";
import { ClientType as PassengerClientType } from "./Passenger.router";
import { ClientType as BookingClientType } from "./Booking.router";
import { ClientType as PaymentClientType } from "./Payment.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as SupportTicketClientType } from "./SupportTicket.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        airport: createAirportRouter(router, procedure),
        aircraft: createAircraftRouter(router, procedure),
        flight: createFlightRouter(router, procedure),
        seat: createSeatRouter(router, procedure),
        passenger: createPassengerRouter(router, procedure),
        booking: createBookingRouter(router, procedure),
        payment: createPaymentRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        supportTicket: createSupportTicketRouter(router, procedure),
        user: createUserRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    airport: AirportClientType<AppRouter>;
    aircraft: AircraftClientType<AppRouter>;
    flight: FlightClientType<AppRouter>;
    seat: SeatClientType<AppRouter>;
    passenger: PassengerClientType<AppRouter>;
    booking: BookingClientType<AppRouter>;
    payment: PaymentClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    supportTicket: SupportTicketClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
