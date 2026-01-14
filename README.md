# HOW TO USE THIS?

## SET UP
Open the file named setup.json 
type your Github acount name replacing
*your_github_username*

set your language:
*en* for English
*es* for Spanish
or whatever else language your content will be in.


## ADDING YOUR CONTENT
Use the file named *project.json* to add content to your project.
Find it at *data/project.json*

If the file *project.json* is empty, the script would 
take an example from the file named *demo.json* 
That's just as an example of how to add text, 
videos, graphics, photos, iframes or any other free html to your project.
Don't worry about it, once you add your content, the script
will ignore the demo file.

I recommend to write *project.json* file directly
adding something similar to the demo but with your own
content.

If you are not familiar with the json structure, you
can convert it from a csv, there's an example in the help directory.


### Styles 
Use the file *custom_styles.css* to add any additional
styles to your project. Font styles are managed
in *base_fonts.css* importing asset from google fonts.

You can find all the style in the directory css/ if you
need to adjust things or add additional styles.

Try to avoid changes in *base_styles.css*
to keep the project working properly, but you are the owner
of this project.


## NEED HELP?

If you run into trouble filling out stuff
I have left a excel document called *help.xlsx*
or *help.csv* if you can't open the excel file.
that would serve as template. Find the file in the
*help* directory: *data/help/help.xlsx*

Follow the steps below 
to create a formatted json file to build-up
your project.


### 1.
Fill out the cells as you need them, 
but don't change the names at the top 
of the columns (type, content, max_size, credit)

### 2.
Select and copy all the cells 
and columns with content, paste the 
data into this website:
https://shancarter.github.io/mr-data-converter/


### 3.
From the dropdown menu
use the option *output as: JSON - Properties* 


### 4.
Paste the result as it is 
into the file named *project.json*
located at
*data/project.json*


### 5.
Run your code live and your project
should come to life
and that's it!



## CONTENT TYPE

This template takes instructions from fields defined 
in the data directory using 4 basic instructions per
per column:

#### Col 1. type:
Defines the module to be added to the page, it could be 
graphic, text, subhead, video, iframe, embed or photo.
You can use as many as you need of either of these.

The extra fields headline, bylines and university are 
required to feed the template properly, but you only 
need one of each. 
(look at the demo.json for references)

Types text and subhead will render whatever you type 
in *content*.

Type image and video would create a static container 
for the appropiate visual.

Type graphic uses ai2html files, use the demo in the 
directory illustrator-files to guide you. Keep the 
illustrator files in the same directory as the demo
and use the same settings to create the assets in the
proper directory. If you move the files to a different 
location, the script would not read them and will be broken
in your project.

Type iframe injects content from other services. The demo
shows an embed from datawrapper. Be careful when adding 
the quote marks to your code. It you might need to tweak
this *text* with something like this \*text*\ check the demo
for further references. 

Finally type embed is a free html embed. You would need to 
create a folder in the directory *embeds/* the script would
try to find an index.html to be inserted in the main project.
You can add whatever you want here, but I'll recommend to
keep it simple and use this option only if you have something 
really special with a strong case and where it's impossible to
accomplish with any other of the types described above.

For example, a scrolly element itself is not a strong justification.


#### Col 2. content: 
This is where you define the name of the asset, the text, the root
folder of the embed or the iframe code.

Watch out for quote mark conflicts. Check the demo to see how
to solve the ** vs */*/ or simply use other mark types like
' or something else.


#### Col 3. max_size:
Either a number or body. This would define how wide your asset is.


#### Col 4. credit:
An extra line of text that would be included in smaller font size 
after you asset. Use it to add the proper attributions to any 
visuals you might have in your project.

## License to use this template

This template is provided with no warranty, it's free to use and 
modify by anyone and it's intended to be use for academic purposes only. 

The Society for News Design and Marco Hernandez, director of the SND 
and author of the code do not consent its use for any other purposes 
outside of its original conceptualization for the academia as agreed 
when joined the SND Challenge.

Learn more about the SND Challenge at
https://snd.org/join-the-snd-challenge/
