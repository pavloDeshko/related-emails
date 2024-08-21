import z from 'zod'

export const UsersDataSchema = z.array(
  z.object({
    name : z.string(),
    email : z.string().email(),
    //id : z.number()
  })
)
export type UsersData = z.infer<typeof UsersDataSchema>

export const DataSchema = z.array(
  z.object({
   account_email : z.string().nullable(),
   email : z.string().nullable()
  })
)
export type Data = z.infer<typeof DataSchema>

export type OutputData = {
  recognized: {
    user_email: string, 
    related_emails: string[]
  }[],
  not_recognized: string[]
}

/* {
  “recognized”: {“user_email”: string, “related_emails”: string[]}[],
  “not_recognized”: string[]
  }
   */