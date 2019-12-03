# CM Experiment Framework (React + Firebase)

## File and Code Structure
- The `src` folder contains the main code to generate the React app.
- The trial dataset is `src/data/cmExpData.tsv`.

## Running the App Locally
- Go to the `cm` folder
- `npm install` - install all the dependencies.
- `npm start` - start the app *localhost:3031*

## Deploying and Running on the Server
##### 1. Login to the Server
- ssh to `dev.codementum.org`

##### 2. Get the Repo
- `git clone ...` - clone the repo.
- Go to the `cm` folder

##### 3. Build the app
- `npm install` - install all the dependencies.
- `npm run build` - build the app. This will add a folder `build/` in the current directory.

##### 4. Start the app
- `node server.js` - start the app *https://dev.codementum.org/reversing/* 
- `nohup node server.js &` - Add `&` if you want to have the app run in the background when you logout.

## Pulling the Experiment Data
- Run the code blocks in `Analysis.Rmd` in the `R_ResultsfromFirebase` folder.
- May need to configure the third code block: e.g., `EXPERIMENT_NAME` and other participant filtering criteria.

## Database Structure (Firebase)
`cm-experiment`: the root node.
- `sessions`: contains an array of sessions.
    - `[SESSION_ID]`: contains an array of trials.
        - `sessionStartTime`
        - `sessionEndTime`
        - `workerId`
        - `postId`
        - `age`
        - `gender`
        - `education`
        - `additionalComments`
    - `[SESSION_ID]`
    - `[SESSION_ID]`
    - ...
- `trials`
    - `[TRIAL_ID]`
        - `sessionId`
        - `currentIndex`: the index of the trial inside the session, starting from 1.
        - `trialStartTime`: timestamp.
        - `trialEndTime`: timestamp.
        - `vis`: vis chart type, including 'barchart', 'piechart', etc.
        - `data`: an array of numbers assigned to a chart, e.g., [40, 20, 58,...]
        - `selectedIndices`: the indices of 'A' and 'B'. E.g., [0, 4] means 'A' is index 0 and 'B' is index 4.
        - `realLarger`: 'a' or 'b'
        - `realPercentage`: the percentage the smaller element is of the larger one.
        - `selectedLarger`: the larger element selected by the user. 'a' or 'b'.
        - `selectedPercentage`: the percentage entered by the user.
    - `[TRIAL_ID]`
    - `[TRIAL_ID]`
    - ...
    
## Experiment Log
- 7/31/2019 Launch experiment `pilot_2_amt`. Datasets: `20190801 pilot_2_amt data_participant.csv` and `20190801 pilot_2_amt data_trials.csv`. Note: There was one turker (A3GPTSDDHJ2DBV) that did not complete the experiment, missing the last 60 trials. The turker sent an email and verified that.
- 8/10/2019 `pilot_3_10repeats_amt`.
- 8/12/2019 `pilot_4_20repeats_amt`.
