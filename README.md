# Yumlist - Legacy Project

Yumlist is a React app that leverages the Yelp Fusion API to help you search for your favorite restaurants and add them to a list that can be shared with friends.

## Developer Setup Guide (for macOS 10.14)

1. Install PostgreSQL.
2. Clone the **Yumlist** repository; run `npm install` on the root folder.
3. Create the databases required by the config.json file: *yumlist* and *yumlist_test*. **Jest** automatically sets up the environment variable to *test*, so both databases must exist to ensure all functionality is correct.
4. Set up a correct username for both *development* and *test* environments in the config.json:
   1. Either set them up as the local administrator's *username*,
   2. or create the *postgres* role in PostgreSQL.
5. Create a **.env** file at the root of your project, and add a new *SKIP_PREFLIGHT_CHECK* variable with **true** as its value.
6. Open `System Preferences -> Sharing -> File Sharing`.
   1. Tick the *File Sharing* option.
   2. Copy the URL located at the top of the preferences, after `Computers on your local network can access your computer at:`. It should resemble *Admins-MacBook-Pro.local*
   3. Paste this copied URL into a new *REACT_APP_LOCAL_URL* variable of the **.env** file if you want to enable sharing lists. Otherwise, create the *REACT_APP_LOCAL_URL* variable with **localhost** as its value.
   4. Create a variable called *YELP_KEY* and set as its value the key provided by your administrator.