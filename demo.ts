import {readFileSync, writeFileSync} from 'fs'

import {DataSchema, UsersDataSchema, UsersData, Data, OutputData} from './types'
import recognizeEmails from './script'

/// Please see README.md for details ///

const [USERS, DATA, OUTPUT] = [
  './data/users.json', 
  './data/sample_data.json', 
  './data/output.json'
] as const

const args = process.argv.slice(2,4)
const [firstName, lastName] = args.filter(arg=>!isNaN(Number(arg))).map(arg=>Number(arg)) as (number|undefined)[]
const noValidate = args.includes('--no-validate') || undefined

let users :UsersData
let data :Data

try{
  users = UsersDataSchema.parse(JSON.parse(readFileSync(USERS, 'utf8')))
  data = DataSchema.parse(JSON.parse(readFileSync(DATA, 'utf8')))
}catch(er){
  console.error("Your data files are not present or corrupt!", er)
  process.exit(1)
}

const emails = data.reduce((ar,d)=>{ 
  d.account_email && ar.push(d.account_email)
  d.email && ar.push(d.email)
  return ar
}, [] as string[])
const emailsSet = new Set(emails)
const totalUniqueEmails = emailsSet.size

const recognized = users.map(u=>{
  const result = recognizeEmails(u.name, emails, {firstName, lastName, validate: !noValidate})

  result.forEach(email=>emailsSet.delete(email))
  return {
    user_email : u.email,
    related_emails: result
  }
})

const output :OutputData = {
  recognized, 
  not_recognized : Array.from(emailsSet)
}

try{
  writeFileSync(OUTPUT, JSON.stringify(output, undefined, 2), 'utf8')
  console.log(`Done! ${totalUniqueEmails-output.not_recognized.length} emails recognized, ${output.not_recognized.length} not.`)
}catch(er){
  console.error("Can't write (update) result in a file!", er)
  process.exit(1)
}