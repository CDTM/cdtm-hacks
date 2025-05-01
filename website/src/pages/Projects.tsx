import { useState, useEffect } from "react";
import { projects, caseNames, Project } from "@/constants/projects";
import { ProjectDialog } from "@/components/ProjectDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";

// Define the order of cases
const caseOrder = ['trade-republic', 'avi', 'beam'] as const;

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
            // Then sort alphabetically by name
            return a.name.localeCompare(b.name);
        });
    });

    // Use predefined case order
    const sortedCases = caseOrder;

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

    const getPlacementBadge = (placement?: 1 | 2) => {
        if (!placement) return null;
        
        return (
            <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center ${
                placement === 1 ? 'bg-yellow-400' : 'bg-gray-300'
            } shadow-lg transform rotate-12`}>
                <Trophy className={`w-6 h-6 ${placement === 1 ? 'text-yellow-900' : 'text-gray-700'}`} />
                <span className="absolute text-sm font-bold">
                    {placement}
                </span>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-b from-green-50/30 to-white/10 z-0">
            <div className="container mx-auto py-12 px-4 min-h-screen">
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Projects from CDTM Hacks 2025</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore the innovative solutions created by our talented teams. Each project represents a unique approach to solving real-world challenges.
                    </p>
                </header>

                <div className="space-y-12">
                    {sortedCases.map((caseKey) => (
                        <section key={caseKey}>
                            <h2 className="text-2xl font-semibold mb-6">{caseNames[caseKey as keyof typeof caseNames]}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projectsByCase[caseKey].map((project) => (
                                    <Card 
                                        key={project.id}
                                        className="cursor-pointer hover:shadow-lg transition-shadow relative"
                                        onClick={() => handleProjectSelect(project)}
                                    >
                                        {getPlacementBadge(project.placement)}
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

                <ProjectDialog
                    project={selectedProject}
                    open={!!selectedProject}
                    onOpenChange={handleDialogClose}
                />
            </div>
        </div>
    );
} 