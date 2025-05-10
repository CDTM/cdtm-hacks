import { useState, useEffect } from "react";
import { projects, cases, challenges, Project } from "@/constants/projects-page-config";
import { ProjectDialog } from "@/components/ProjectDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { Trophy, Award, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MAIN_SPONSOR, CASE_SPONSORS, CHALLENGE_SPONSORS, TECH_SPONSORS, FOOD_SPONSORS, VENUE_SPONSORS } from "@/constants/partners";

// Define the order of cases
const caseOrder = ['Trade Republic', 'avi', 'beam'] as const;

// Define the order of challenges
const challengeOrder = ['mistral', 'tanso', 'beyond-presence', 'visionaries'] as const;

const ChallengePlaceholder = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="relative">
            <div className="absolute inset-0 blur-xl opacity-30" style={{
                background: 'linear-gradient(45deg, #eaf3fd, #a8d0ff)',
            }} />
            <div className="relative flex flex-col items-center gap-2">
                <Lock className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-400">To be announced</span>
            </div>
        </div>
    </div>
);

export default function Projects() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Group and sort projects by case
    const projectsByCase = projects.reduce((acc, project) => {
        if (!acc[project.case]) {
            acc[project.case] = [];
        }
        acc[project.case].push(project);
        return acc;
    }, {} as Record<string, Project[]>);

    // Sort projects within each case
    Object.keys(projectsByCase).forEach(caseKey => {
        projectsByCase[caseKey].sort((a, b) => {
            // First sort by placement (1st place, then 2nd place)
            if (a.placement && b.placement) {
                return a.placement - b.placement;
            }
            if (a.placement) return -1;
            if (b.placement) return 1;

            // Then sort challenge winners
            const aHasChallenges = a.challenges && a.challenges.length > 0;
            const bHasChallenges = b.challenges && b.challenges.length > 0;
            if (aHasChallenges && !bHasChallenges) return -1;
            if (!aHasChallenges && bHasChallenges) return 1;

            // Finally sort alphabetically by name
            return a.name.localeCompare(b.name);
        });
    });

    // Use predefined case order
    const sortedCases = caseOrder;

    // Group projects by challenge
    const projectsByChallenge = projects.reduce((acc, project) => {
        project.challenges?.forEach(challenge => {
            if (!acc[challenge.sponsoredBy]) {
                acc[challenge.sponsoredBy] = [];
            }
            acc[challenge.sponsoredBy].push(project);
        });
        return acc;
    }, {} as Record<string, Project[]>);

    // Handle project selection from URL
    useEffect(() => {
        if (projectId) {
            const project = projects.find(p => p.id === projectId);
            if (project) {
                setSelectedProject(project);
            }
        }
    }, [projectId]);

    // Handle dialog close
    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setSelectedProject(null);
            navigate('/projects/2025', { replace: true });
        }
    };

    // Handle project selection
    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        navigate(`/projects/2025/${project.id}`, { replace: true });
    };

    const getPlacementBadge = (placement?: 1 | 2, caseName?: string) => {
        if (!placement) return null;

        return (
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center ${placement === 1 ? 'bg-yellow-400' : 'bg-gray-300'
                            } shadow-lg transform rotate-12`}>
                            <Trophy className={`w-6 h-6 ${placement === 1 ? 'text-yellow-900' : 'text-gray-700'}`} />
                            <span className="absolute text-sm font-bold">
                                {placement}
                            </span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{placement === 1 ? `1st Place of ${caseName} Case` : `2nd Place of ${caseName} Case`}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };

    const getChallengeIndicator = (challenges?: Project['challenges']) => {
        if (!challenges?.length) return null;

        const challengeNames = challenges.map(c => c.name);
        const tooltipText = challengeNames.length === 1
            ? `Winner of the "${challengeNames[0]}" Challenge`
            : `Winner of the ${challengeNames.map(name => `"${name}"`).join(' and ')} Challenges`;

        return (
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shadow-md transform rotate-12">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltipText}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };

    useEffect(() => {
        document.documentElement.style.backgroundColor = "#fff";
        return () => {
            document.documentElement.style.backgroundColor = "";
        };
    }, []);

    return (
        <div className="min-h-[80vh] overflow-x-hidden bg-white">
            <Navbar backgroundColor="bg-white" />
            <div className="bg-white z-0 mt-16">
                <div className="container mx-auto py-12 px-4 min-h-screen">
                    <header className="text-center mb-16">
                        <h1 className="text-4xl font-bold mb-4">Projects from CDTM Hacks 2025</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore the innovative solutions created by our talented teams. Each project represents a unique approach to solving real-world challenges.
                        </p>
                    </header>

                    <h2 className="text-2xl font-semibold mb-2">Cases</h2>
                    <p className="text-gray-600 mb-8">
                        Each case is sponsored by a company and focuses on a particular domain or technology area.
                    </p>

                    {/* Cases Section */}
                    <div className="space-y-16 mb-16 md:hidden">
                        {sortedCases.map((caseKey) => (
                            <section key={caseKey}>
                                <div className="flex items-center gap-3 mb-4">
                                    <a href={cases[caseKey as keyof typeof cases].sponsorUrl} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={cases[caseKey as keyof typeof cases].logo}
                                            alt={`${cases[caseKey as keyof typeof cases].name} logo`}
                                            className={cases[caseKey as keyof typeof cases].logoClass}
                                        />
                                    </a>
                                </div>
                                <p className="text-gray-600 mb-4">{cases[caseKey as keyof typeof cases].description}</p>
                                <div className="grid grid-cols-1 gap-8 overflow-visible relative">
                                    {projectsByCase[caseKey].map((project) => (
                                        <Card
                                            key={project.id}
                                            className="cursor-pointer hover:shadow-lg transition-shadow relative bg-springPaleBlue/30 backdrop-blur-sm border border-springBlue/10 z-0"
                                            onClick={() => handleProjectSelect(project)}
                                        >
                                            {getPlacementBadge(project.placement, cases[caseKey as keyof typeof cases].name)}
                                            {getChallengeIndicator(project.challenges)}
                                            <CardHeader>
                                                <CardTitle>{project.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>{project.pitch}</CardDescription>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Desktop view - Column layout */}
                    <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16 overflow-visible relative">
                        {sortedCases.map((caseKey) => (
                            <section key={caseKey}>
                                <div className="flex items-center gap-3 mb-4">
                                    <a href={cases[caseKey as keyof typeof cases].sponsorUrl} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={cases[caseKey as keyof typeof cases].logo}
                                            alt={`${cases[caseKey as keyof typeof cases].name} logo`}
                                            className={cases[caseKey as keyof typeof cases].logoClass}
                                        />
                                    </a>
                                </div>
                                <p className="text-gray-600 mb-6">{cases[caseKey as keyof typeof cases].description}</p>
                                <div className="space-y-8">
                                    {projectsByCase[caseKey].map((project) => (
                                        <Card
                                            key={project.id}
                                            className="cursor-pointer hover:shadow-lg transition-shadow relative bg-springPaleBlue/30 backdrop-blur-sm border border-springBlue/10 z-0"
                                            onClick={() => handleProjectSelect(project)}
                                        >
                                            {getPlacementBadge(project.placement, cases[caseKey as keyof typeof cases].name)}
                                            {getChallengeIndicator(project.challenges)}
                                            <CardHeader>
                                                <CardTitle>{project.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>{project.pitch}</CardDescription>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Challenges Section */}
                    <h2 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                        Challenge Winners
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                        </div>
                    </h2>
                    <div className="mb-8">
                        <p className="text-gray-600">
                            In addition to the cases, teams had the opportunity to compete for special prizes
                            sponsored by our partners.
                        </p>
                    </div>
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible relative">
                            {Object.entries(challenges).map(([challengeKey, challenge]) => (
                                <Card key={challengeKey} className="relative bg-springPaleBlue/30 backdrop-blur-sm border border-springBlue/10 z-0">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 min-h-[32px]">
                                            <Award className="w-5 h-5 text-purple-500 flex-shrink-0 mb-4" />
                                            <div className="flex gap-8">
                                                {challenge.companies.map((company, index) => (
                                                    <div key={index} className="relative flex-shrink-0 h-8">
                                                        <img
                                                            src={company.logoPath}
                                                            alt={`${company.name} logo`}
                                                            className={`${company.logoClass} h-full w-auto object-contain`}
                                                            style={{ display: 'block' }}
                                                        />
                                                        {company.url && <a href={company.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full">
                                                        </a>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <CardDescription>{challenge.name}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {projectsByChallenge[challenge.sponsoredBy]?.length > 0 ? (
                                            <div className="space-y-2 rounded-lg">
                                                {projectsByChallenge[challenge.sponsoredBy].map(project => (
                                                    <div
                                                        key={project.id}
                                                        className="cursor-pointer bg-white hover:bg-gray-50 p-4 rounded-md transition-colors"
                                                        onClick={() => handleProjectSelect(project)}
                                                    >
                                                        <div className="font-medium">{project.name}</div>
                                                        <div className="text-sm text-gray-500">{project.pitch}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <ChallengePlaceholder />
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sponsor Wall Section */}
                    <div className="mt-24 mb-16">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Our Sponsors</h2>
                        <p className="text-springText/80 text-center mb-12 max-w-2xl mx-auto">
                            A special thanks to our sponsors who made this event possible. Their support and commitment to innovation help us create an unforgettable experience for all participants.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 lg:gap-20 items-center justify-items-center">
                            {[...CASE_SPONSORS, MAIN_SPONSOR, VENUE_SPONSORS, ...CHALLENGE_SPONSORS, ...TECH_SPONSORS, ...FOOD_SPONSORS].map((sponsor) => (
                                <a
                                    key={sponsor.name}
                                    href={sponsor.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:opacity-80 transition-opacity"
                                >
                                    <img
                                        src={sponsor.image}
                                        alt={sponsor.name}
                                        className={`h-8 md:h-10 lg:h-12 w-auto object-contain ${sponsor.class || ''}`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    <ProjectDialog
                        project={selectedProject}
                        open={!!selectedProject}
                        onOpenChange={handleDialogClose}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
} 