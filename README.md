![graphic](./assets/repo-graphic.jpg)

# RedOxfordOnline Interactive Voice Response
Because a programmer's company should have a programmable phone number

This is an Express JS server to be hosted privately; It manages an IVR system for my business phone, and it's a great base for anyone who wants to create their own IVR!

## Why Self Host?

Twilio offers Service hosting and Twilio Flow's, which achieve a similar result, so why bother self-hosting this? It essentially boils down to two things.
- **Developer Experience** Self hosting enables me to create a CI/CD pipeline via [this webhook](https://github.com/DavidASix/roo-webhook) to automate deployment of the server from GitHub. Twilio currently does not support deployment of their services via GitHub, and I do not want to manage a new stack for this pipeline.
- **Freedom** Self hosting an Express server to manage this IVR gives freedom to easily integrate other libraries and API's into the system. Twilio's serverless setup reduces the functionality of the IVR.

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

Select your IVR number and edit the dropdown *A call comes in* to say ***Webhook***. Paste in the ngrok URL with the addition of your entry path (in this case /voice).
Save the configuration. Now when that number is called from your dev phone (or any other phone) it will be handled by the webhook running locally at localhost:3000/voice.

Be sure to reset the console settings after to your URL after development is complete.

## Like my work? 
[<img 
    height='50' 
    style='border:0px;height:50px;' 
    src='https://storage.ko-fi.com/cdn/kofi5.png?v=3' 
    border='0' 
    alt='Buy Me a Coffee at ko-fi.com' />](https://ko-fi.com/davidasix)