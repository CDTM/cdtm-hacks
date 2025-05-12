import { Project } from "@/constants/projects-page-config";
import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDialog } from "@/components/ProjectDialog";
import { useState } from "react";

interface WinnerPodiumProps {
    winners: Project[];
}

export function WinnerPodium({ winners }: WinnerPodiumProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    if (!winners || winners.length === 0) return null;

    const getPodiumStyle = (position: number) => {
        const baseStyle = "relative flex flex-col items-center justify-center p-4 rounded-t-lg transition-all duration-300 hover:scale-105 cursor-pointer";
        const height = position === 1 ? "h-48" : position === 2 ? "h-40" : "h-32";
        const bgColor = position === 1 ? "bg-yellow-400" : position === 2 ? "bg-gray-300" : "bg-amber-600";
        const textColor = position === 1 ? "text-yellow-900" : position === 2 ? "text-gray-700" : "text-amber-900";
        
        return `${baseStyle} ${height} ${bgColor} ${textColor}`;
    };

    const getTrophyColor = (position: number) => {
        return position === 1 ? "text-yellow-900" : position === 2 ? "text-gray-700" : "text-amber-900";
    };

    const handlePodiumClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setSelectedProject(null);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-16">
            <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Overall Winners</h2>
                <div className="flex items-center gap-2 text-gray-600">
                    <span>Sponsored by</span>
                    <img 
                        src="/images/partners/speedinvest.png" 
                        alt="Speedinvest Logo" 
                        className="h-6 w-auto"
                    />
                </div>
            </div>
            <div className="flex items-end justify-center gap-4 h-64">
                {/* Second Place */}
                {winners[1] && (
                    <div className="w-1/3">
                        <div 
                            className={getPodiumStyle(2)}
                            onClick={() => handlePodiumClick(winners[1])}
                        >
                            <Trophy className={`w-8 h-8 mb-2 ${getTrophyColor(2)}`} />
                            <span className="font-bold text-lg">2nd</span>
                            <span className="text-sm font-medium mt-1">{winners[1].name}</span>
                            <span className="text-xs mt-1 opacity-80">{winners[1].case}</span>
                        </div>
                    </div>
                )}
                
                {/* First Place */}
                {winners[0] && (
                    <div className="w-1/3">
                        <div 
                            className={getPodiumStyle(1)}
                            onClick={() => handlePodiumClick(winners[0])}
                        >
                            <Trophy className={`w-10 h-10 mb-2 ${getTrophyColor(1)}`} />
                            <span className="font-bold text-xl">1st</span>
                            <span className="text-sm font-medium mt-1">{winners[0].name}</span>
                            <span className="text-xs mt-1 opacity-80">{winners[0].case}</span>
                        </div>
                    </div>
                )}
                
                {/* Third Place */}
                {winners[2] && (
                    <div className="w-1/3">
                        <div 
                            className={getPodiumStyle(3)}
                            onClick={() => handlePodiumClick(winners[2])}
                        >
                            <Trophy className={`w-6 h-6 mb-2 ${getTrophyColor(3)}`} />
                            <span className="font-bold text-base">3rd</span>
                            <span className="text-sm font-medium mt-1">{winners[2].name}</span>
                            <span className="text-xs mt-1 opacity-80">{winners[2].case}</span>
                        </div>
                    </div>
                )}
            </div>

            <ProjectDialog
                project={selectedProject}
                open={!!selectedProject}
                onOpenChange={handleDialogClose}
            />
        </div>
    );
} 