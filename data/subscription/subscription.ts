import "server-only"

export const getSubscription = async (userId: string) => {
  return { plan: "pro" }
}
