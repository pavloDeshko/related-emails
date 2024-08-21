
Hi!

Please use `npm run demo` to execute the script. Output will be at *data/output.json*. I've also committed my result for your convenience.

There're some notes concerning my understanding of the assignment and its implementation:
- given that users' names are formatted as single string (*"John Doe"*), script will assume last word in the string is Last Name and first word is First Name (if present). Everything in between (like a middle name in *"John Bartholomew Doe"*) is ignored, as it's not often included in emails.
- spec didn't specify how close the match of names should be, though it stated that *mi.scott@gmail.com* should match *Michael Scott*. So I've decided to let a user set an option of "how much shortened" names could be - default values are 2 first chars for First Name and 3 first chars for Last Name. You can play with it passing number arguments through CLI like that npm run demo 2 10 and see how many emails are recognized, if you'd like to.
- neither spec specified what should happen if no emails were matched for a given User. I've chosen to include `{"user_email":"user@example.com", "related_emails":[] }`  in the output anyway, as probably the mailer (or whatever code will be using this data) will handle empty array just fine, while missing primary email could lead to a bug (like not sending any email to that user at all). 
- I've assumed *sample_data.json* comes from some third-source so script can make sure only valid emails are added to its output. It can be turned off programmatically or by passing `--no-validate` flag in the demo's CLI.

Have a nice day!