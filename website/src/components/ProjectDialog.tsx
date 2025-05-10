import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/constants/projects-page-config";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video">
            <iframe
              src={project.videoUrl.replace('watch?v=', 'embed/')}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">One Sentence Pitch</h3>
              <p className="text-gray-600">{project.oneSentencePitch}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What Is Your Project?</h3>
              <p className="text-gray-600">{project.whatIsProject}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How You Built It</h3>
              <p className="text-gray-600">{project.howBuilt}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Difficulties You Faced</h3>
              <p className="text-gray-600">{project.difficulties}</p>
            </div>

            {(project.placement || project.challenges?.length) && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                <div className="space-y-2">
                  {project.placement && (
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <Badge variant="secondary" className="bg-yellow-100 hover:bg-yellow-100 text-yellow-800">
                        {project.placement === 1 ? "1st Place" : "2nd Place"} in {project.case.charAt(0).toUpperCase() + project.case.slice(1)} Case
                      </Badge>
                    </div>
                  )}
                  {project.challenges?.map((challenge, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      <Badge variant="secondary" className="bg-blue-200/60 hover:bg-blue-200/60 text-blue-800">
                        "{challenge.name}" Challenge by {challenge.sponsoredBy}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Source Code
                </a>
              </Button>
              <Button asChild>
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 