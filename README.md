# Case management application

1. Install dependencies

```
yarn install
```

2. Run the dev environment

```
yarn start
```

## Milestone 1
Create a standalone react app using ReactFlow to render data from static json payload.

1. Requirements analysis and open source tools selection - 2h FREE
2. Render provided json on the main diagram with “Tree” layout - 2h
    - [x]  tree layout
    - [x]  pan canvas
    - [x]  use relevant to node type open source icons
    - [x]  Expand node’s children on node click and lazy load data (another static json)
    - [x]  EXTRA format json data
3. Make sidebar (left) with items for d&d - 2h
    - [x]  on drag and drop to the main diagram trigger node create action for specific node type
4. Properties sidebar (right) for additional info on selected node - 2h
    - [x]  Details panel
    - [x]  Properties panel
    - [x]  make properties editable - changes are saved to the local json object
5. More layouts
    - [x]  Make actions sidebar
    - [x]  Views switching action
    - ~~Make block layout - grouped nodes - requires grid as sublayout for grouped children~~
    - [x]  Make “force” layout
    - [x]  Implement circular layout - this is not covered by ReactFlow, so I would suggest it as a separate task
6. Circular tooltip
    - [x]  Delete action
    - [x]  Edit action
    - [x]  mock other actions
    - [x]  icons for actions
    - [ ]  ~~Second level (outer circle) for round tooltip~~