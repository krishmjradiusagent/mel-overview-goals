import { Layout } from "./components/Layout"
import { TeamSettingsContent } from "./modules/TeamSettings/TeamSettingsContent"
import * as React from "react"

function App() {
  return (
    <Layout activeTab="Team settings">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <TeamSettingsContent />
      </div>
    </Layout>
  )
}

export default App
