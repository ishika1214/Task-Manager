import ProjectDetailsPage from "./ProjectDetailsClient"

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]
}

export default function Page() {
  return <ProjectDetailsPage />
}
