# Way 2 - Swarm + Twitter

### Step 1 - An inviter registers in Fairdrive

An invite(s) is created in the form of an ETH wallet (based on FIP-63). The wallet address is used as an invitation code with 0 balance. Neither party needs to top up the wallet. All operations are free.

The inviter can send an invite link like “https://app.fairdrive.fairdatasociety.org/#0xfD19D4d6CE5719AABd06989B31A45784dE165689” to his friends. We need the ability to generate a shorter link so that the message does not look gigantic and fits within twitter limits. It may be worth registering a short domain so that the link is like: https://fdsdrive.org/#0xfD19D4d6CE5719AABd06989B31A45784dE165689

### Step 2 - A person registers through a metamask in Fairdrive

A person clicks on this link, registers through a metamask and starts using Fairdrive.

### Step 3 - Sharing motivation

The Fairdrive page must contain some motivation for posting on Twitter (list of motivations below).

For publication on Twitter, an invite is created and a set of data is uploaded into the swarm: -
* Address of the person's FD account. 
* Address of the inviting party.

After uploading this information to Swarm, user get the reference. A person publishes our text, which we will offer + reference on Twitter. Throughout the campaign, the post should be on Twitter in order to reach as many people as possible and leave a mark on the network.

At the end of the campaign, the results are summed up:
* We can check if the user created Pods at his address. This can act as confirmation of human activity.
* The number of subscribers of invited users is counted (can be used in campaign result reports)
* Winners are determined. For example, by the number of active invited people or by their number of subscribers

**Why would a person post to Twitter? List of motivations**

* Just thank the person who invited him and tell about Fairdrive subscribers.
* A person may have a limit on the number of megabytes they can upload via Fairdrive (eg 100 MB). To increase the limit to, for example, 5 GB, a person needs to make a post on Twitter. 
* Allocate a budget for token/NFT prizes to random N people who post on Twitter. Distribute prizes at the end of the campaign.

**Why should we use Twitter as organizers?**

Twitter is needed for 2 purposes: 
* Proof of a real person 
  
    To create a Twitter account, a person needs to go through several verification steps: 
  * This is a person, not a bot. Captcha is used. 
  * This person has an active email/phone number. 
  * This person looks convincing enough to tweet.

* Viral distribution of information about Fairdrive.

When an invited user tweets about Fairdrive, their followers will become aware of the product and may become Fairdrive users too.

**What should be the text to post on Twitter?**

Accompanying text promo text + our account tag (ethswarm/fds) + reference with metadata. The post must remain on Twitter for the duration of the campaign. Throughout the campaign, we need to keep track of all posts with tags and enter them into the table of participants. Automatically or manually. At the end of the campaign, you need to check which of the posts are currently available and only count them as participants.

**A way to store metadata when uploading to Swarm.**

It can be encrypted so that only we can decrypt it, for example. The address can be used to send tokens or check if a person has uploaded something to Fairdrive. It can be hashed, but then it will not be possible to send tokens or verify downloads.

**Is it possible to use other social networks?**

Yes, it's possible. One of the candidates is Telegram, as there is a large audience familiar with crypto-technologies. The viral mechanism for each social network must be built separately.

**What resources are needed?**

* Updating Fairdrive to a stable state so that there are no UI shortcomings.
* Short domain for invites.
* Budget for prizes for inviting parties. Fixed amount for Top Inviters.
* Budget for prizes for participants. Fixed amount for N random users.
* Internal web portal to track new members on a daily basis.
* External Web portal to display the top participants so that there is an open competition with daily updates (display for example the top 100 active participants).
* Announcement about the campaign in official swarm/fds sources