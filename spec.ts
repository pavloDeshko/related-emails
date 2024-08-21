import test from 'tape'

import recogniseEmails from './script'

const emails = ['michael.scott@gmail.com', 'michael.scott77@outlook.com', 'michael236scott@yahoo.com', 'mi.scott@gmail.com']

test('Basic', t=>{
  const relatedEmails = [...emails].sort()

  t.deepEqual(relatedEmails.sort(), recogniseEmails('Michael Scott',[...relatedEmails, 'bla@example.com']).sort())

  t.end()
})

test('Empties', t=>{
  t.equals(0,recogniseEmails(' ',emails).length)
  t.equals(0,recogniseEmails('Michael Scott',[]).length)

  t.end()
})

test('Strange Names', t=>{
  const relatedEmails = [...emails].sort()

  t.deepEqual(relatedEmails.sort(), recogniseEmails('Scott',[...relatedEmails, 'bla@example.com']).sort())
  t.deepEqual(relatedEmails.sort(), recogniseEmails('Michael Chimbley Scott',[...relatedEmails, 'bla@example.com']).sort())

  t.end()
})


/* 
For example for the user with the name Michael Scott and email michael.scott@renormale.com
possible emails are michael.scott@gmail.com, michael.scott77@outlook.com, michael236scott@yahoo.com, mi.scott@gmail.com etc. */