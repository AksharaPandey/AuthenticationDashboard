import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Logged out',
      description: 'Successfully logged out',
    });
    navigate('/login');
  };

  if (authLoading || roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            {role === 'admin' ? (
              <Shield className="h-6 w-6 text-primary" />
            ) : (
              <User className="h-6 w-6 text-primary" />
            )}
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                Welcome, {user.user_metadata?.full_name || user.email}
              </CardTitle>
              <Badge variant={role === 'admin' ? 'default' : 'secondary'} className="text-sm">
                {role === 'admin' ? 'Admin' : 'User'}
              </Badge>
            </div>
            <CardDescription>
              You are logged in as a <strong>{role}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="font-semibold mb-2">Account Information</h3>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-muted-foreground">
                  <strong>Role:</strong> {role}
                </p>
                <p className="text-muted-foreground">
                  <strong>Account ID:</strong> {user.id}
                </p>
              </div>
            </div>

            {role === 'admin' && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Admin Access</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  You have administrative privileges in this system.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;