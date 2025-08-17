import { User } from "better-auth/*"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type UserAvatarProps = {
  user?: User
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const url = user?.image
    ? user.image
    : `https://api.dicebear.com/7.x/initials/svg?${new URLSearchParams({
        scale: "80",
        backgroundType: "gradientLinear",
        seed: user?.email || "",
      }).toString()}`

  const initials = user?.name?.slice(0, 1).toUpperCase() || ""

  return (
    <Avatar className="w-10 h-10">
      <AvatarImage src={url} alt="User Avatar" />
      <AvatarFallback className="uppercase">{initials}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
