import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/_profile-layout/profile')({
  component: Profile,
})

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}
