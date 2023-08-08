# Case management application

1. Install dependencies

```
yarn install
```

2. Run the dev environment

```
yarn start
```

## Milestone 2
- [x]  double circle context menu - nested
- [x]  ability to create root node on empty canvas
- [x]  show modal dialog on node’s “Load” action
   - [x]  show a list of items (cards) in the modal
   - [x]  user can select an item from the list, which will define the API query
- [x]  add data to enable demo workflow

### Workflow description
1. Drop node phone on the canvas
2. Edit id to: "800-555-2323"
3. Node menu => Enrich => pipl.com
4. Select "Igor Yurtaev" from the list in modal
5. "Igor Yurtaev" node menu => "Enrich" => "Corporates"
6. Select "Zaaptv LLC" from the list in modal
7. "Zaaptv LLC" node menu => "Enrich" => "Reverse Whois"
8. Select "zaaptv.com" from the list in modal
9. "Zaaptv.com" node menu => "Enrich" => "Tags"
10. Select "12-1212" from the list in modal
11. "12-1212" node menu => "Enrich" => "Reverse lookup"
12. Select "alphaott.com" from the list in modal
13. "alphaott.com" node menu => "Enrich" => "Images"
14. Select 3 images
15. Change one of those new nodes "type" to "person" and "name" to "Julian Elliot"

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