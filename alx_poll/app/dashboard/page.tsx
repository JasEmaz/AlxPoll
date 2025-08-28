'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, BarChart3, Share2, Trash2 } from 'lucide-react';
import withAuth from '../auth/with-auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

// Mock poll data type
interface Poll {
  id: string;
  question: string;
  totalVotes: number;
  createdAt: Date;
}

function DashboardPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching polls data
    const fetchPolls = async () => {
      try {
        // TODO: Replace with actual Supabase query
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock polls data
        const mockPolls: Poll[] = [
          {
            id: '1',
            question: 'What is your favorite programming language?',
            totalVotes: 138,
            createdAt: new Date('2023-06-15'),
          },
          {
            id: '2',
            question: 'Which frontend framework do you prefer?',
            totalVotes: 94,
            createdAt: new Date('2023-07-22'),
          },
          {
            id: '3',
            question: 'How many years of coding experience do you have?',
            totalVotes: 56,
            createdAt: new Date('2023-08-10'),
          },
          {
            id: '4',
            question: 'What is your preferred development environment?',
            totalVotes: 42,
            createdAt: new Date('2023-09-05'),
          },
        ];
        
        setPolls(mockPolls);
      } catch (error) {
        console.error('Error fetching polls:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleDeletePoll = async (pollId: string) => {
    try {
      // TODO: Implement Supabase poll deletion
      console.log('Deleting poll:', pollId);
      
      // Update local state to remove the poll
      setPolls(polls.filter(poll => poll.id !== pollId));
    } catch (error) {
      console.error('Error deleting poll:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Polls</h1>
        'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, BarChart3, Share2, Trash2, AlertTriangle } from 'lucide-react';
import withAuth from '../auth/with-auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// This type must match the structure of your 'polls' table
interface Poll {
  id: string;
  question: string;
  created_at: string;
  // Add other fields you might need, e.g., total votes
  // For now, we'll keep it simple.
}

function DashboardPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const { data, error } = await supabase
          .from('polls')
          .select('id, question, created_at')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setPolls(data || []);
      } catch (error: any) {
        console.error('Error fetching polls:', error);
        setError(error.message || 'Failed to fetch polls.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleDeletePoll = async (pollId: string) => {
    // Optimistically remove the poll from the UI
    const originalPolls = polls;
    setPolls(polls.filter(poll => poll.id !== pollId));

    try {
      const { error } = await supabase
        .from('polls')
        .delete()
        .match({ id: pollId });

      if (error) throw error;

    } catch (error: any) {
      console.error('Error deleting poll:', error);
      // Revert the UI if the deletion fails
      setPolls(originalPolls);
      // Here you might want to show a toast notification to the user
      alert('Failed to delete poll: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Polls</h1>
        <Button asChild>
          <Link href="/polls/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Poll
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardFooter>
                <div className="h-9 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <Card key={poll.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{poll.question}</CardTitle>
                <CardDescription>{formatDate(new Date(poll.created_at))}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/polls/${poll.id}`}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Results
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeletePoll(poll.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-background">
          <h3 className="text-xl font-medium mb-2">No polls yet</h3>
          <p className="text-muted-foreground mb-4">Create your first poll to get started</p>
          <Button asChild>
            <Link href="/polls/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Poll
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default withAuth(DashboardPage);
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </CardContent>
              <CardFooter>
                <div className="h-9 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <Card key={poll.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{poll.question}</CardTitle>
                <CardDescription>{formatDate(poll.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <span className="font-medium">{poll.totalVotes}</span> total votes
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/polls/${poll.id}`} legacyBehavior>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Results
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeletePoll(poll.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-background">
          <h3 className="text-xl font-medium mb-2">No polls yet</h3>
          <p className="text-muted-foreground mb-4">Create your first poll to get started</p>
          <Button asChild>
            <Link href="/polls/create" legacyBehavior>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Poll
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default withAuth(DashboardPage);