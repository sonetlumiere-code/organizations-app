import { User } from "@/lib/auth/auth"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type UserAvatarProps = {
  user?: User
  size?: "sm" | "md" | "lg"
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = "md" }) => {
  const url = user?.image
    ? user.image
    : `https://api.dicebear.com/7.x/initials/svg?${new URLSearchParams({
        scale: "80",
        backgroundType: "gradientLinear",
        seed: user?.email || "",
      }).toString()}`

  const initials = user?.name?.slice(0, 1).toUpperCase() || ""

  return (
    <Avatar
      className={cn(
        size === "sm" && "h-8 w-8",
        size === "md" && "h-10 w-10",
        size === "lg" && "h-12 w-12"
      )}
    >
      <AvatarImage src={url} alt="User Avatar" />
      <AvatarFallback className="uppercase">{initials}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
