import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useAppUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Users, Mail, Check } from "lucide-react";
import { teamHomePath } from "@/lib/routes";
import { useInviteData } from "./-invite.data";

export default function InvitePage() {
  const params = useParams({ strict: false });
  const navigate = useNavigate({});
  const token = params.token as string;
  const { user, isLoaded } = useAppUser();

  const { invite } = useInviteData({ token });
  const acceptInvite = useMutation(api.teams.acceptInvite);

  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setIsAccepting(true);
    setError(null);
    try {
      const team = await acceptInvite({ token });
      if (team) {
        navigate({ to: teamHomePath(team.slug) });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept invite");
    } finally {
      setIsAccepting(false);
    }
  };

  if (invite === undefined || !isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f9]">
        <div className="text-[#6b6b8a]">Loading...</div>
      </div>
    );
  }

  if (invite === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f9] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border-2 border-[#e50000] bg-[#e50000]/10">
              <AlertCircle className="h-6 w-6 text-[#e50000]" />
            </div>
            <CardTitle>Invalid or expired invite</CardTitle>
            <CardDescription>
              This invite link is no longer valid. Please ask for a new invitation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/" preload="intent" className="block">
              <Button variant="outline" className="w-full">
                Go to lawn
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User not signed in
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f9] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border-2 border-[#272357] bg-[#e9e9f2]">
              <Users className="h-6 w-6 text-[#6b6b8a]" />
            </div>
            <CardTitle>You&apos;re invited to {invite.team?.name}</CardTitle>
            <CardDescription>
              {invite.invitedBy} has invited you to join as a {invite.role}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 border-2 border-[#272357] bg-[#e9e9f2] p-3">
              <Mail className="h-5 w-5 text-[#6b6b8a]" />
              <div>
                <p className="text-sm text-[#6b6b8a]">Invited email</p>
                <p className="font-bold text-[#272357]">{invite.email}</p>
              </div>
            </div>
            <p className="text-center text-sm text-[#6b6b8a]">
              Sign in with the email address above to accept this invite.
            </p>
            <a
              href={`/sign-in?redirect_url=${encodeURIComponent(`/invite/${token}`)}`}
              className="block"
            >
              <Button className="w-full">Sign in to accept</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User signed in but with different email
  if (user.email !== invite.email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f9] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border-2 border-[#d97f14] bg-[#d97f14]/10">
              <AlertCircle className="h-6 w-6 text-[#d97f14]" />
            </div>
            <CardTitle>Different email address</CardTitle>
            <CardDescription>
              This invite was sent to {invite.email}, but you&apos;re signed in as{" "}
              {user.email}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-[#6b6b8a]">
              Please sign in with the correct email address to accept this invite.
            </p>
            <a
              href={`/sign-in?redirect_url=${encodeURIComponent(`/invite/${token}`)}`}
              className="block"
            >
              <Button className="w-full" variant="outline">
                Sign in with different account
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User signed in with correct email
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f9] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border-2 border-[#272357] bg-[#e9e9f2]">
            <Users className="h-6 w-6 text-[#6b6b8a]" />
          </div>
          <CardTitle>Join {invite.team?.name}</CardTitle>
          <CardDescription>
            {invite.invitedBy} has invited you to join as a{" "}
            <Badge variant="secondary">{invite.role}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="border-2 border-[#e50000] bg-[#e50000]/10 p-3 text-sm text-[#e50000]">
              {error}
            </div>
          )}
          <Button className="w-full" onClick={handleAccept} disabled={isAccepting}>
            {isAccepting ? (
              "Joining..."
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Accept invitation
              </>
            )}
          </Button>
          <Link to="/" preload="intent" className="block">
            <Button variant="ghost" className="w-full">
              Decline
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
