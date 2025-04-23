
import React, { useState } from 'react';
import { checkTeamName } from '@/services/firebase';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import SearchAnimation from './SearchAnimation';
import ResultDisplay from './ResultDisplay';

const TeamNameChecker: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [teamExists, setTeamExists] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastCheckedName, setLastCheckedName] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = teamName.trim();
    
    if (!trimmedName) {
      toast({
        title: "Please enter a team name",
        description: "Team name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSearching(true);
      setShowResult(false);
      
      // Add artificial delay for better UX (between 500ms to 1000ms)
      const delay = Math.random() * 500 + 500;
      const exists = await Promise.all([
        checkTeamName(trimmedName),
        new Promise(resolve => setTimeout(resolve, delay))
      ]).then(results => results[0]);
      
      setTeamExists(exists);
      setLastCheckedName(trimmedName);
      setShowResult(true);
      
      // Provide a toast notification
      toast({
        title: exists ? "Team name already exists" : "Team name is available",
        description: exists 
          ? "This team name is already taken. Please try another name." 
          : "This team name is available for registration.",
        variant: exists ? "destructive" : "default",
      });
      
    } catch (error) {
      console.error("Error searching for team name:", error);
      toast({
        title: "Error checking team name",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative input-focus-effect">
          <Input
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={isSearching}
            className="search-input h-14 px-6 text-lg font-medium rounded-xl border-2 border-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            data-testid="team-name-input"
          />
          <SearchAnimation isSearching={isSearching} />
        </div>
          
        <Button
          type="submit"
          disabled={isSearching || !teamName.trim()}
          className="search-button w-full h-14 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2"
          data-testid="search-button"
        >
          {isSearching ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
              <span>Checking...</span>
            </div>
          ) : (
            <>
              <Search size={20} />
              <span>Check Availability</span>
            </>
          )}
        </Button>
      </form>
      
      <ResultDisplay 
        teamName={lastCheckedName} 
        exists={teamExists} 
        isVisible={showResult} 
      />
    </div>
  );
};

export default TeamNameChecker;
