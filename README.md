# TangyTimeTable

## Description
TangyTimeTable is an all-in-one event planning assistant that automatically aligns users’ schedules with their friends and suggests activities based on their shared interests. Furthermore, through personal calendar synchronisation and timely notification reminders, TangyTimeTable eliminates manual back-and-forth messaging and event coordination efforts to help users save time and gain more enjoyment from in-person socialisation.

## Usage
To run the project, navigate to the directory and run the following `npm` commands:
- `cd src`
- `npm install`
- `npx expo start`, then press `i` to run the `iOS` option

## Disclaimers
As this is the beta-coded version of the TangyTimeTable prototype, some functionalities do not work yet or rely on hard-coded data. This includes:
1. Social Media & Calendar Accounts Syncing
  - Please use manual sign up/login for the most accurate user experience. Logging in/signing up through social media can cause unexpected errors.
  - As social media and calendar accounts synchronisation is not yet implemented, users' friends list is currently hard-coded.
2. Time Availabilities Selection
  - Same availabilities are applied across all displayed dates due to slow load time issues.
3. Activity & Location Recommendations
  - Activity and location data are currently hard-coded.
  - To demonstrate latter parts of our event planning flow, we have hard-coded 3 events, which all users, once logged in, are automatically a part of.
  - Note that because these events are hard-coded, any changes/planning progress made towards them will **NOT** be saved.
4. Travel Time Suggestions
  - Travel time data is currently hard-coded. This means that the final travel time suggestions are always catered towards All Sorts Indoor Sports Centre.
5. Search
  - Search is not functional yet.
6. Non-Functional Features/Buttons
  - If a feature/button is not functional, an alert will be raised on click to let the user know that it is not available yet.
7. Events and Groups Display
  - The display of groups and events on Home Screen (accessible via Events tab) and All Friends screen (accessible via Friends tab) can sometimes be laggy.
  - When this happens, simply refresh the app to get the most accurate data OR click on another tab (e.g. `Upcoming`), then click on your desired tab again (e.g. `In Progress`).

## Roadmap
- TangyTimeTable's research board can be found in this [Miro Board](https://miro.com/app/board/uXjVMhHMptI=/?share_link_id=646779823933). The board contains:
  - Solution Brainstorm and Categorisation
  - Persona Journey and Empathy Maps
  - User Story Mapping Diagram
- TangyTimeTable's Information Architecture diagram can be found [here](https://miro.com/app/board/uXjVNeIKz_E=/?share_link_id=431567442464).

TangyTimeTable has gone through two prototype development stages:
1. Paper Prototype using Balsamiq: [Link](https://balsamiq.cloud/sti0r6/pnyd8ff)
2. High Fidelity Prototype using Figma: [Link](https://www.figma.com/file/I7GMziARoK8euZ8TZevWRK/TangyTimeTable---HiFi-Prototype---Week-7-Deliverable---COMP4511?type=design&node-id=0%3A1&mode=design&t=885dPEtNUmxg2T4Q-1)

This is the third prototyping stage, where the design team will be building TangyTimeTable using React Native.

## Authors and acknowledgment
TangyTimeTable is designed and developed by T13A - ZesteeBestees Team.
