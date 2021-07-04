To do list:

- build a datamodel function which will clean up the data - come to think of it.. this should be done on the backend - leave it out of the frontend
    - this is gonna require a global store... mobx or redux?
    x - clean up nulls
    x - parse dates
    x - interpret country codes
- table:
    - get rid of table tags and replace with divs with classes
    - UI styling for table
    - styling for pagination
    - styling for filtering
    - styling for sorting (use font-awesome)
- add export button
x - hook up all external links
- figure out the scrolling issue (spacing for footer still)
- footer / footer styling
- responsiveness down to at least 375
- types! cleanup and check all your types, make sure you have everything properly typed
- Split up some smaller components:
    x - split up the table sub components
        x - pagination
        x - global filter
    - split up button component
- add tests!
- set up API
    - host accounts data
    - host country codes data
- use same font as Ledn site (https://fonts.google.com/specimen/Poppins?query=Poppins)
x - implement font-awesome
- might have misread the instructions - maybe add additional filters for MFA type and Country individually