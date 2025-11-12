import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Role-Based Auth</CardTitle>
          <CardDescription className="text-base">
            A secure authentication system with user and admin roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/signup')} 
              className="w-full"
              size="lg"
            >
              Create Account
            </Button>
            <Button 
              onClick={() => navigate('/login')} 
              variant="outline"
              className="w-full"
              size="lg"
            >
              Login
            </Button>
          </div>
          
          <div className="pt-4 border-t text-sm text-muted-foreground">
            <p className="mb-2 font-semibold">Features:</p>
            <ul className="space-y-1 text-left">
              <li>✓ Secure authentication with JWT</li>
              <li>✓ Role-based access control</li>
              <li>✓ User and Admin dashboards</li>
              <li>✓ Protected routes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
