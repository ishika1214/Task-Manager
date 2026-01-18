import ProfileClient from "./ProfileClient"

// This is REQUIRED for static export
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
  ]
}

export default function Page({ params }: { params: { id: string } }) {
  return <ProfileClient params={params} />
}
