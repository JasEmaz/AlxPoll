'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import withAuth from '@/app/auth/with-auth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock poll data type
interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: Date;
  createdBy: string;
}

function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate fetching poll data
    const fetchPoll = async () => {
      try {
        // TODO: Replace with actual Supabase query
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock poll data
        const mockPoll: Poll = {
          id: id as string,
          question: 'What is your favorite programming language?',
          options: [
            { id: '1', text: 'JavaScript', votes: 42 },
            { id: '2', text: 'Python', votes: 35 },
            { id: '3', text: 'TypeScript', votes: 28 },
            { id: '4', text: 'Java', votes: 18 },
            { id: '5', text: 'C#', votes: 15 },
          ],
          createdAt: new Date(),
          createdBy: 'John Doe',
        };
        
        setPoll(mockPoll);
      } catch (error) {
        console.error('Error fetching poll:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const handleVote = async () => {
    if (!selectedOption) return;
    
    setIsSubmitting(true);
    
    try {
      // TODO: Implement Supabase vote submission
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state to reflect vote
      if (poll) {
        const updatedOptions = poll.options.map(option => {
          if (option.id === selectedOption) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });
        
        setPoll({ ...poll, options: updatedOptions });
        setHasVoted(true);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare chart data
  const chartData = poll?.options.map(option => ({
    name: option.text,
    votes: option.votes,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Poll not found</h1>
        <p className="text-muted-foreground mt-2">The poll you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{poll.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {!hasVoted ? (
            <div className="space-y-4">
              <div className="space-y-2">
                {poll.options.map((option) => (
                  <div 
                    key={option.id}
                    className={`p-4 border rounded-md cursor-pointer transition-colors ${selectedOption === option.id ? 'bg-primary/10 border-primary' : 'hover:bg-accent'}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleVote} 
                disabled={!selectedOption || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Vote'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center font-medium text-green-600 dark:text-green-400">
                Your vote has been recorded!
              </p>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Share this poll</h3>
          <div className="flex space-x-2 mt-2">
            <Button variant="outline" size="sm">
              Copy Link
            </Button>
            <Button variant="outline" size="sm">
              QR Code
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Created by {poll.createdBy} on {poll.createdAt.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default withAuth(PollPage);