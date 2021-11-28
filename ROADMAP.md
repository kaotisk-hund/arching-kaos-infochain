AKI Roadmap
===========

1. Finish whitepaper
2. Implement features
	[x] mixtape 
	[ ] profile
	[ ] messages (in away that is close to the email standards)
	[ ] shop
	[x] news
3. Create a page that read profile, using Stellar addresses. ProfileHandler()
	[ ] see if there is a data variable called zprofile on the address
	[ ] see if there is a post on their transactions with action=="profile/add"
4. Attach features to the profile page:
	[ ] mixtape/add
	[ ] profile/edit
	[ ] messages
		[ ]	say/to
		[ ]	say/to_channel/ (see h)
	[ ] shop/add_item
	[ ] shop/remove_item
	[ ] shop
	[ ] create_channel ( channel creator is supposed to run an mechanism that gathers this messages )
	[ ] channel needs to exist, if no you create it. if you can't maintain a bot for irc, you can get one and then you have it



About channels
--------------

This is very important. Anyone can say whatever they want. They send the same old ZBLOCK. DATA is different of course.
To make it easy:
```
{
	"action": "channel/add",
	"data": {
		"channel":"<ipns-link>"
	}
}
```
... whatever, let's find out later




Create a structure
------------------

All basis is `akctl`

Components
----------

sync - `download-transactions-to-file.sh`

From README
-----------

4. Verify that all the data is signed with the packed key
6. Create a procedure that bonds everything in a super app



