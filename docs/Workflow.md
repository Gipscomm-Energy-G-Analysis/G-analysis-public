# Workflow Draft ::


| <span style="color: orange; font-size: 28px;font-weight: 600">G-Analysis Development 2022<span>
---
<br>
## Table of Content ::
---



- ##### [Meeting Schedule](#meeting-schedule)

  + [Frequency](#frequency)
  + [Duration](#duration) 
>
- ##### [Objective](#objective)
  + [Checklist](#checklist)
>
- ##### [Objective](#objective)
  + [Naming Patterns](#naming-patterns)
---

## Meeting Schedule ::

<br>

### Frequency

	daily


### Duration

    5 - 15 minutes

---

## Objective ::



<b>Checklist</b> 


```json

1. Short report about progress

2. Assign new tasks

3. Create new tasks as new issues in the board

    3.1 Decompose tasks into small sub-issues
        such that every can be finished in one 
        to maximal two days

    3.2 Create new branch for every issue
 
    3.3 Write tests for functions and/or 
        properties in reference to the given issue

4. Add time estimate to the issue
    4.1 The time estimate should be added by using the 'Effort' property of an issue...

5. Use one or more testing styles of your choice like...

    5.1 unit-tests (two tests per function)
        
        5.1.1 Use jest for that purpose

    5.2 property-based-tests (test functions with 
        properties, every function occurs at least once) 
        
        5.2.1 Evaluate at least once a month if an 
              additional pbt makes sense.

    5.3 user-interaction tests via puppeteer 

6. Confirmation of issue completion
    6.1 Checking if the requirements have been fullfilled
    6.2 Dragging issue into 'Done' section

7. Merge code after every finished, reviewed as well as
   tested issue

    7.1 Create pull-request

    7.2 Other developer should review code and then 
        merge the pull request if ok otherwise refactor.
```
 <br>


---

## Naming-Patterns ::

<b>The patterns as RegEx and in plain text...</b>

<br>

|| Issue | Branch | Commit |
| --- | --- | --- | --- |
| **RegEx** | [a-zA-Z]+ :: [a-zA-Z]+ | [a-zA-Z]+_[a-zA-Z]+_[a-zA-Z]+ | [a-zA-Z]+_[a-zA-Z]+ |
| **Plain** | reference :: description | issueID_module_keyword | issueID_change |

<br>


<div style="float: left;">Sinan-David Müller</div> <div style="float: right;">2022-09-09</div>

</br>

