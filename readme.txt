::::::::::::::::::: HOW TO USE THIS?

### SET UP
Open the file named setup.json 
type your Github acount name replacing
"your_github_username"
set your languaje:
"en" for English
"es" for Spanish
or whatever else languaje your content will be in.

Let the bots know about your project, go to the main index.html
and replace all the instances of "[+username]" with your own 
github account it shoukd be something like this:
href="https://octocat.github...

Replacing the default:
href="https://[+username].github...


### NOW ADD CONTENT
Usethe file named "project.json" to add content to your project.
Find it at "data/project.json"

If the file project.json is empty, the script would 
take an example from the file named "demo.json" 
That's just as an example of how to add text, 
video, graphics or images to your project. Don't worry 
about it, once you add your content, the script
will ignore the demo file.

I recommend to write the json file or convert from csv


::::::::::::::::::: NEED HELP?

If you run into trouble filling out stuff
I have left a excel document called "help.xslx"
to serve as template. Find the file in the
"help" folder: "data/help/help.xslx"

Follow the steps below 
to create a formated json file to built-up
your project.


### 1.
Fill out the cells as you need them, 
but don't change the names of the columns.

### 2.
Select and copy all the cells 
and columns with content, paste the 
data into this website:
https://shancarter.github.io/mr-data-converter/


### 3.
From the dropdown menu
use the option "output as: JSON - Properties" 


### 4.
Paste the result as it is 
into the file named "project.json"
located at
"data/project.json"


### 5.
Run your code live and your project
should come to life
and that's it!