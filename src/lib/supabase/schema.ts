import { pgTable, timestamp, uuid, text, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { prices, subscriptionStatus } from "../../../migrations/schema";
import { sql } from "drizzle-orm";


export const workspaces = pgTable('workspaces', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: uuid('icon_id').notNull(),
    data: text('data'),
    inTrash: uuid('in_trash'),
    logo: uuid('logo'),
    bannerUrl: uuid('banner_url')
});


export const folders = pgTable('folders', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: uuid('icon_id').notNull(),
    data: text('data'),
    inTrash: uuid('in_trash'),
    bannerUrl: uuid('banner_url'),
    workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' })
});

export const files = pgTable('files', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: uuid('icon_id').notNull(),
    data: text('data'),
    inTrash: uuid('in_trash'),
    bannerUrl: uuid('banner_url'),
    workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }),
    folderId: uuid('folder_id').references(() => folders.id, { onDelete: 'cascade' })
});


export const subscriptions = pgTable('subscriptions', {
    id: text('id').primaryKey().notNull(),
    userId: uuid('user_id').notNull(),
    status: subscriptionStatus('status'),
    metadata: jsonb('metadata'),
    priceId: text('price_id').references(() => prices.id),
    quantity: integer('quantity'),
    cancelAtPeriodEnd: boolean('cancel_at_period_end'),
    created: timestamp('created', { withTimezone: true, mode: 'string' })
        .default(sql`now()`)
        .notNull(),
    currentPeriodStart: timestamp('current_period_start', {
        withTimezone: true,
        mode: 'string',
    })
        .default(sql`now()`)
        .notNull(),
    currentPeriodEnd: timestamp('current_period_end', {
        withTimezone: true,
        mode: 'string',
    })
        .default(sql`now()`)
        .notNull(),
    endedAt: timestamp('ended_at', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    cancelAt: timestamp('cancel_at', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    canceledAt: timestamp('canceled_at', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    trialStart: timestamp('trial_start', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    trialEnd: timestamp('trial_end', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
});