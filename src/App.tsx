import { useState } from 'react'
import { Header } from './components/Header'
import { NewProjectModal } from './components/NewProjectModal'
import { Sidebar, type Page } from './components/Sidebar'
import { useAppState } from './hooks/useAppState'
import { Dashboard } from './pages/Dashboard'
import { ProjectPage } from './pages/ProjectPage'
import { Services } from './pages/Services'

function App() {
  const { status, projects, activeTasks, refresh } = useAppState()
  const [page, setPage] = useState<Page>('dashboard')
  const [showNewProject, setShowNewProject] = useState(false)

  const renderPage = () => {
    if (page === 'dashboard') {
      return <Dashboard projects={projects} tasks={activeTasks} status={status} onSelectProject={(n) => setPage({ project: n })} />
    }
    if (page === 'services') {
      return <Services status={status} onRefresh={refresh} />
    }
    if (typeof page === 'object' && 'project' in page) {
      return (
        <ProjectPage
          projectName={page.project}
          svcStatus={status}
          onRefresh={refresh}
          onDeleted={() => {
            refresh()
            setPage('dashboard')
          }}
        />
      )
    }
    return null
  }

  return (
    <div className="flex h-screen bg-dark-bg text-txt">
      <Sidebar
        page={page}
        onNavigate={setPage}
        projects={projects}
        onNewProject={() => setShowNewProject(true)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header status={status} />
        <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
      </div>

      {showNewProject && (
        <NewProjectModal
          status={status}
          onClose={() => setShowNewProject(false)}
          onCreated={(name) => {
            setShowNewProject(false)
            refresh()
            setPage({ project: name })
          }}
        />
      )}
    </div>
  )
}

export default App
