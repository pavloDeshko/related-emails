import z from 'zod'
import escape from 'lodash.escaperegexp'

/// Please see README.md for details ///

const nameRegex = /^\W*(?:(\b\w+\b).*)?(?=(\b\w+\b)\W*$)/
const getEmailRegex = (first:string, last:string)=> new RegExp(
  `(?:${escape(first)}.*${escape(last)}.*@)|(?:${escape(last)}.*${escape(first)}.*@)`,
  'i'
)
const validEmail = (email :string)=>z.string().email().safeParse(email).success

const processEmails = (name :string, emails :string[], 
  options ?:{firstName?:number|boolean, lastName?:number|boolean, validate?:boolean}
)=>{
  const { firstName = 2, lastName = 3, validate = true} = options || {}

  const getEndIndex = (value:number|boolean)=>
    value === true ? undefined : //match whole string - end index undefined
    typeof value == 'number' &&  value > 0 ? value : //positive number of characters
    0//negative or false, don't match at all - empty string 
    
  const nameMatch = name.match(nameRegex)
  if(!nameMatch){return []}
  
  const emailRegex = getEmailRegex(
    !!nameMatch[1] ? nameMatch[1].slice(0, getEndIndex(firstName)) : '', // first name is optional so could be undefined
    nameMatch[2].slice(0, getEndIndex(lastName))
  )
  
  return emails.filter(email=>emailRegex.test(email) && (!validate || validEmail(email)))
}

export default processEmails