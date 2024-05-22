![graphic](./assets/repo-graphic.jpg)

# RedOxfordOnline Interactive voice response
Because a programmer's company should have a programmable phone number

This script is hosted on Twilio and manages the IVR for my web design business, Red Oxford Online. The script can be used as an example for your own IVR system, but please ensure to remove information specific to my business.

## Development
Setting up the development environment for this project can be a bit involved, but once set up provides a smooth development experience.

**Requirements**
- Twilio Account
- 2 Twilio Phone Numbers
- ngrok Account
- 3 Terminal windows

Setup [Twilio Dev Phone](https://github.com/twilio-labs/dev-phone) on your local PC. Utilize a spare phone number that doesn't serve your IVR.
Start Dev Phone
```twilio dev-phone```

In a new terminal, [initialize your Twilio project](https://www.twilio.com/en-us/blog/start-a-new-twilio-functions-project-the-easy-way), cd into it and run the project
```npm run start```

Now that Twilio is being served locally, log into ngrok and open the [setup screen](https://dashboard.ngrok.com/get-started/setup/linux). In a third terminal run the startup command for ngrok.
```ngrok http http://localhost:3000```

This will output the URL your local function is being served on. Copy this.

Go to your Twilio console and select:
```Develop > Phone Numbers > Manage > Active numbers```
or search for Active numbers in the search bar.

Select your IVR number and edit the dropdown *A call comes in* to say ***Webhook***. Paste in the ngrok URL with the addition of your entry path (in this case /voice-ivr).
Save the configuration. Now when that number is called from your dev phone (or any other phone) it will be handled by the webhook running locally at localhost:3000/voice-ivr.

Be sure to reset the console settings after development is complete.

## Like my work? 
[<img 
    height='50' 
    style='border:0px;height:50px;' 
    src='https://storage.ko-fi.com/cdn/kofi5.png?v=3' 
    border='0' 
    alt='Buy Me a Coffee at ko-fi.com' />](https://ko-fi.com/davidasix)