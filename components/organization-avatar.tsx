/* eslint-disable @next/next/no-img-element */

const OrganizationAvatar = ({
  orgName,
  orgSlug,
  orgLogo,
}: {
  orgName: string
  orgSlug: string
  orgLogo?: string | null
}) => {
  const url = `https://api.dicebear.com/7.x/initials/svg?${new URLSearchParams({
    scale: "80",
    backgroundType: "gradientLinear",
    seed: orgSlug || "",
  }).toString()}`

  return (
    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg">
      <img
        src={orgLogo || url}
        alt={orgName}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default OrganizationAvatar
