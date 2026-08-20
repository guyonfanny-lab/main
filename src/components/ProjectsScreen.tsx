import { PROJECTS } from '../data/projects'
import type { Difficulty, Progress } from '../types'

interface ProjectsScreenProps {
  progress: Progress
  onSelectProject: (projectId: string) => void
}

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  Débutant: 'bg-emerald-400/15 text-emerald-300',
  Intermédiaire: 'bg-amber-400/15 text-amber-300',
  Avancé: 'bg-rose-400/15 text-rose-300',
}

export default function ProjectsScreen({ progress, onSelectProject }: ProjectsScreenProps) {
  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-5">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-white">Projets 🛠️</h1>
        <p className="mt-0.5 text-sm text-white/50">
          Choisis un projet et code-le à ton rythme — pas besoin d'avoir fini le parcours.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PROJECTS.map((project) => {
          const doneCount = project.steps.filter((s) => progress.completedLessons[s.id]).length
          const total = project.steps.length
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project.id)}
              className={`rounded-2xl bg-gradient-to-br ${project.color} p-4 text-left shadow-lg active:scale-[0.98]`}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="text-3xl">{project.emoji}</span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${DIFFICULTY_STYLE[project.difficulty]}`}
                >
                  {project.difficulty}
                </span>
              </div>
              <h2 className="text-base font-bold text-white">{project.title}</h2>
              <p className="mt-0.5 text-sm text-white/80">{project.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/20">
                  <div
                    className="h-full rounded-full bg-white/90 transition-all"
                    style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
                  />
                </div>
                <span className="shrink-0 text-xs font-semibold text-white/80">
                  {doneCount}/{total}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
