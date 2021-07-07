
# Yumlist 

Yumlist is a mobile-first web application where you can make lists of your favorite restaurants and share them with your friends. Yumlist uses the Yelp API to find restaurants by name or category in major cities. You can vote on your favorite restaurants by giving YUMS and see the most popular restaurants in your list.

## Developer Setup Guide (for macOS 10.14)

1. Install PostgreSQL.
2. Clone the **Yumlist** repository; run `npm install` on the root folder.
3. Create the databases required by the config.json file: *yumlist* and *yumlist_test*. **Jest** automatically sets up the environment variable to *test*, so both databases must exist to ensure all functionality is correct.
4. Set up a correct username for both *development* and *test* environments in the config.json:
   1. Either set them up as the local administrator's *username*,
   2. or create the *postgres* role in PostgreSQL.
5. Create a **.env** file at the root of your project, and add a new *SKIP_PREFLIGHT_CHECK* variable with **true** as its value.
6. To open shared links locally, you need to allow sharing of local files. Open `System Preferences -> Sharing -> File Sharing`.
   1. Tick the *File Sharing* option.
   2. Copy the URL located at the top of the preferences, after `Computers on your local network can access your computer at:`. It should resemble *Admins-MacBook-Pro.local*
   3. Paste this copied URL into a new *REACT_APP_URL* variable of the **.env** file if you want to enable sharing lists. Otherwise, create the *REACT_APP_URL* variable with **localhost** as its value.
   4. Create a variable called *YELP_KEY* and set as its value the key provided by your administrator.
