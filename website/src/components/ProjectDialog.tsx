import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/constants/projects";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
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
              <p className="text-gray-600">{project.pitch}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Project Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>

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