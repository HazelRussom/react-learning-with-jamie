# Summarized Kata Notes

## Steps taken

- Acceptance Test
- Started top-down development
- Started with doing what was required of the UI without worrying about styling
- Move buttons + Execute button

- Then moved onto processing inputs in the backend
- Processing command (Turning 'L' into a TurnLeft() call)
- Handling wrapping on the board
- Displaying output of back-end code to UI

## Points to Consider

- Using a UI Testing framework (such as Cypress?)
- UserEvent vs FireEvent
- Using the Command pattern (Do we want it as a seperate video?)
- Do we want to refactor as we go, or refactor towards the end? - Preferred to refactor as we go to avoid getting caught up in a mess or having a LOT of changes to make. This includes extracting classes
- Avoiding primitive obsession early - we encountered issues with having position acting as a string rather than an object (needing to parse it out), and then issues when refactoring away from this (lots of code depended on the string value)
- Ensure we use immutability from the start - not having it caused us a lot of pain and needed refactoring out later. React State meant that immutability was vital for rerendering UI components.
- Highlighting passing data between components (Such as passing position to grid)
- How did we solve the wrapped in act warnings?
- Rendering the grid may not be in the way you think of it - without any input square 0,0 would be at the top left instead of bottom left as though on a graph.
- Prepare back-end code beforehand

## Actions to take

- Set up call with Alasdair
- Extract class diagram of our current structure
- Play around with Cypress for a UI test
- Decide on how we can test that the grid squares render in the correct order (0,0 appears bottom left)
- See if we can plug in userEvent throughout the code to avoid FireEvent
- See how difficult implementing the command pattern is (to help decide if we want to showcase it in the screencast)
- Consider reaching out to Sid to help improve the React kata used in interviews
