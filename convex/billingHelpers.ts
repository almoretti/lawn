// INTERNAL DEPLOYMENT: billing is disabled. Every team behaves as a fully
// paid team with no storage cap — no Stripe, no subscription checks. The
// public shapes (TeamPlan, subscription state, assert helpers) are kept so
// the rest of the codebase and the UI stay unchanged.
import { Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx } from "./_generated/server";

export type TeamPlan = "basic" | "pro";

export const TEAM_PLAN_MONTHLY_PRICE_USD: Record<TeamPlan, number> = {
  basic: 0,
  pro: 0,
};

// Effectively unlimited; the UI renders anything at/above this as "Unlimited".
export const UNLIMITED_STORAGE_BYTES = Number.MAX_SAFE_INTEGER;

export const TEAM_PLAN_STORAGE_LIMIT_BYTES: Record<TeamPlan, number> = {
  basic: UNLIMITED_STORAGE_BYTES,
  pro: UNLIMITED_STORAGE_BYTES,
};

export function normalizeStoredTeamPlan(plan: string): TeamPlan {
  if (plan === "pro" || plan === "team") return "pro";
  return "basic";
}

type BillingCtx = QueryCtx | MutationCtx;

export async function getTeamSubscriptionState(ctx: BillingCtx, teamId: Id<"teams">) {
  const team = await ctx.db.get(teamId);
  if (!team) {
    throw new Error("Team not found");
  }
  return {
    team,
    subscription: null,
    plan: "pro" as TeamPlan,
    hasActiveSubscription: true,
  };
}

export async function getTeamStorageUsedBytes(ctx: BillingCtx, teamId: Id<"teams">) {
  const projects = await ctx.db
    .query("projects")
    .withIndex("by_team", (q) => q.eq("teamId", teamId))
    .collect();

  const videosByProject = await Promise.all(
    projects.map((project) =>
      ctx.db
        .query("videos")
        .withIndex("by_project", (q) => q.eq("projectId", project._id))
        .collect(),
    ),
  );

  let total = 0;
  for (const videos of videosByProject) {
    for (const video of videos) {
      if (video.status === "failed") continue;
      if (typeof video.fileSize === "number" && Number.isFinite(video.fileSize)) {
        total += video.fileSize;
      }
    }
  }

  return total;
}

export async function assertTeamHasActiveSubscription(ctx: BillingCtx, teamId: Id<"teams">) {
  return await getTeamSubscriptionState(ctx, teamId);
}

export async function assertTeamCanStoreBytes(
  ctx: BillingCtx,
  teamId: Id<"teams">,
  incomingBytes: number,
) {
  void incomingBytes; // storage is uncapped internally; kept for call-site compat
  const [state, storageUsedBytes] = await Promise.all([
    getTeamSubscriptionState(ctx, teamId),
    getTeamStorageUsedBytes(ctx, teamId),
  ]);
  return {
    ...state,
    storageUsedBytes,
    storageLimitBytes: UNLIMITED_STORAGE_BYTES,
  };
}
