import { useState } from 'react'
import Header from './components/Header'
import BottomNav, { type Tab } from './components/BottomNav'
import PathScreen from './components/PathScreen'
import LessonScreen from './components/LessonScreen'
import ProfileScreen from './components/ProfileScreen'
import ProjectsScreen from './components/ProjectsScreen'
import ProjectStepsScreen from './components/ProjectStepsScreen'
import DonjonScreen from './components/DonjonScreen'
import ChallengesScreen from './components/ChallengesScreen'
import GamesScreen from './components/GamesScreen'
import GameLessonScreen from './components/GameLessonScreen'
import { LESSONS } from './data/curriculum'
import { PROJECTS } from './data/projects'
import { DONJON_LEVELS } from './data/donjon'
import { CHALLENGES } from './data/challenges'
import { GAME_LEVELS } from './data/games'
import { completeLesson, loadProgress, resetProgress, toggleSound } from './lib/storage'
import type { Exercise } from './types'

function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [tab, setTab] = useState<Tab>('path')
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [activeStepId, setActiveStepId] = useState<string | null>(null)
  const [activeDonjonId, setActiveDonjonId] = useState<string | null>(null)
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null)
  const [activeGameId, setActiveGameId] = useState<string | null>(null)

  const activeLesson: Exercise | null = activeLessonId
    ? (LESSONS.find((l) => l.id === activeLessonId) ?? null)
    : null

  const activeProject = activeProjectId ? (PROJECTS.find((p) => p.id === activeProjectId) ?? null) : null
  const activeStep: Exercise | null =
    activeProject && activeStepId ? (activeProject.steps.find((s) => s.id === activeStepId) ?? null) : null

  const activeDonjonLevel: Exercise | null = activeDonjonId
    ? (DONJON_LEVELS.find((l) => l.id === activeDonjonId) ?? null)
    : null

  const activeChallenge: Exercise | null = activeChallengeId
    ? (CHALLENGES.find((c) => c.id === activeChallengeId) ?? null)
    : null

  const activeGameLevel: Exercise | null = activeGameId
    ? (GAME_LEVELS.find((g) => g.id === activeGameId) ?? null)
    : null

  const inLesson =
    !!activeLesson || !!activeStep || !!activeDonjonLevel || !!activeChallenge || !!activeGameLevel

  function handleComplete(lesson: Exercise) {
    const result = completeLesson(progress, lesson.id, lesson.xp)
    setProgress(result.progress)
    return result
  }

  function handleReset() {
    if (window.confirm('Réinitialiser toute ta progression ? Cette action est irréversible.')) {
      setProgress(resetProgress())
      setActiveLessonId(null)
      setActiveProjectId(null)
      setActiveStepId(null)
      setActiveDonjonId(null)
      setActiveChallengeId(null)
      setActiveGameId(null)
      setTab('path')
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0b0b14]">
      {!inLesson && <Header xp={progress.xp} streak={progress.streak} />}

      <main className="flex-1">
        {activeLesson ? (
          <LessonScreen
            key={activeLesson.id}
            lesson={activeLesson}
            siblings={LESSONS}
            backLabel="Retour au parcours"
            finaleHeading="PyQuest terminée !"
            soundOn={progress.soundOn}
            onBack={() => setActiveLessonId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveLessonId(id)}
          />
        ) : activeStep && activeProject ? (
          <LessonScreen
            key={activeStep.id}
            lesson={activeStep}
            siblings={activeProject.steps}
            backLabel="Retour au projet"
            finaleHeading="Projet terminé !"
            soundOn={progress.soundOn}
            onBack={() => setActiveStepId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveStepId(id)}
          />
        ) : activeDonjonLevel ? (
          <LessonScreen
            key={activeDonjonLevel.id}
            lesson={activeDonjonLevel}
            siblings={DONJON_LEVELS}
            backLabel="Retour au donjon"
            finaleHeading="Donjon terminé !"
            soundOn={progress.soundOn}
            onBack={() => setActiveDonjonId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveDonjonId(id)}
          />
        ) : activeChallenge ? (
          <LessonScreen
            key={activeChallenge.id}
            lesson={activeChallenge}
            siblings={CHALLENGES}
            backLabel="Retour aux défis"
            finaleHeading="Tous les défis résolus !"
            soundOn={progress.soundOn}
            onBack={() => setActiveChallengeId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveChallengeId(id)}
          />
        ) : activeGameLevel ? (
          <GameLessonScreen
            key={activeGameLevel.id}
            lesson={activeGameLevel}
            siblings={GAME_LEVELS}
            backLabel="Retour aux jeux"
            finaleHeading="Tous les jeux terminés !"
            soundOn={progress.soundOn}
            onBack={() => setActiveGameId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveGameId(id)}
          />
        ) : tab === 'path' ? (
          <PathScreen progress={progress} onSelectLesson={setActiveLessonId} />
        ) : tab === 'projects' ? (
          activeProject ? (
            <ProjectStepsScreen
              project={activeProject}
              progress={progress}
              onSelectStep={setActiveStepId}
              onBack={() => setActiveProjectId(null)}
            />
          ) : (
            <ProjectsScreen progress={progress} onSelectProject={setActiveProjectId} />
          )
        ) : tab === 'donjon' ? (
          <DonjonScreen progress={progress} onSelectLevel={setActiveDonjonId} />
        ) : tab === 'games' ? (
          <GamesScreen progress={progress} onSelectLevel={setActiveGameId} />
        ) : tab === 'challenges' ? (
          <ChallengesScreen progress={progress} onSelectChallenge={setActiveChallengeId} />
        ) : (
          <ProfileScreen
            progress={progress}
            onToggleSound={() => setProgress(toggleSound(progress))}
            onReset={handleReset}
          />
        )}
      </main>

      {!inLesson && <BottomNav active={tab} onChange={setTab} />}
    </div>
  )
}

export default App
