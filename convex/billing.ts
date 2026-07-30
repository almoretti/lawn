// INTERNAL DEPLOYMENT: billing is disabled — no Stripe, no subscriptions, no
// plan limits. The public function names and return shapes are preserved so
// the UI and http router keep working; mutating billing actions now fail
// loudly instead of contacting Stripe.
import { v } from "convex/values";
import { action, internalMutation, query } from "./_generated/server";
import { requireTeamAccess } from "./auth";
import {
  getTeamStorageUsedBytes,
  getTeamSubscriptionState,
  TEAM_PLAN_MONTHLY_PRICE_USD,
  TEAM_PLAN_STORAGE_LIMIT_BYTES,
} from "./billingHelpers";

const teamPlanValidator = v.union(v.literal("basic"), v.literal("pro"));
const teamRoleValidator = v.union(
  v.literal("owner"),
  v.literal("admin"),
  v.literal("member"),
  v.literal("viewer"),
);

const BILLING_DISABLED_MESSAGE =
  "Billing is disabled in this internal deployment — all teams have full access.";

export const createSubscriptionCheckout = action({
  args: {
    teamId: v.id("teams"),
    plan: v.optional(teamPlanValidator),
    successUrl: v.optional(v.string()),
    cancelUrl: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async () => {
    throw new Error(BILLING_DISABLED_MESSAGE);
  },
});

export const reconcileTeamSubscription = action({
  args: { teamId: v.id("teams") },
  returns: v.null(),
  handler: async () => null,
});

export const createCustomerPortalSession = action({
  args: {
    teamId: v.id("teams"),
    returnUrl: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async () => {
    throw new Error(BILLING_DISABLED_MESSAGE);
  },
});

export const updateTeamSubscriptionPlan = action({
  args: {
    teamId: v.id("teams"),
    plan: teamPlanValidator,
  },
  returns: v.null(),
  handler: async () => {
    throw new Error(BILLING_DISABLED_MESSAGE);
  },
});

export const getTeamBilling = query({
  args: {
    teamId: v.id("teams"),
  },
  returns: v.object({
    plan: teamPlanValidator,
    monthlyPriceUsd: v.number(),
    storageLimitBytes: v.number(),
    storageUsedBytes: v.number(),
    hasActiveSubscription: v.boolean(),
    subscriptionStatus: v.union(v.string(), v.null()),
    stripeCustomerId: v.union(v.string(), v.null()),
    stripeSubscriptionId: v.union(v.string(), v.null()),
    stripePriceId: v.union(v.string(), v.null()),
    currentPeriodEnd: v.union(v.number(), v.null()),
    role: teamRoleValidator,
    canManageBilling: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const { membership } = await requireTeamAccess(ctx, args.teamId);
    const subscriptionState = await getTeamSubscriptionState(ctx, args.teamId);
    const storageUsedBytes = await getTeamStorageUsedBytes(ctx, args.teamId);

    return {
      plan: subscriptionState.plan,
      monthlyPriceUsd: TEAM_PLAN_MONTHLY_PRICE_USD[subscriptionState.plan],
      storageLimitBytes: TEAM_PLAN_STORAGE_LIMIT_BYTES[subscriptionState.plan],
      storageUsedBytes,
      hasActiveSubscription: true,
      subscriptionStatus: "active",
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
      currentPeriodEnd: null,
      role: membership.role,
      canManageBilling: membership.role === "owner",
    };
  },
});

// Stripe webhooks are unrouted in the internal deployment; kept as a no-op in
// case a stale webhook delivery arrives.
export const syncTeamSubscriptionFromWebhook = internalMutation({
  args: {
    orgId: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.string(),
    stripePriceId: v.optional(v.string()),
    status: v.string(),
  },
  returns: v.null(),
  handler: async () => null,
});
