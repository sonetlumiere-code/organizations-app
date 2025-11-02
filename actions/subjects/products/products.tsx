"use server"

import { ActionResponse } from "@/types/types"

export const addProduct = async ({
  organizationId,
  data,
}: {
  organizationId: string
  data: {
    name: string
    price: number
  }
}): Promise<ActionResponse> => {
  console.log({ organizationId, data })

  return { success: true, data }
}
