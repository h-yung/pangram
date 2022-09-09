# pangram
Or, approaching the [NYT Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee) pangram hunt with different tools.
[Resources like this](https://www.sbsolver.com/) exist but we aren't aiming for hints.

This vaguely follows OOP model by encapsulating some logic in a class while leaving the helper functions outside. 

**Tech used**: Simple HTML, JavaScript, and negligible CSS - focused on the logic.

There is minimal styling to facilitate:
- submission of the day's seven letters
- showing resulting string combinations
- permitting guesses of word fragments
- permitting exclusion of strings by array of fragments

## [Live demo here](https://h-yung.github.io/pangram/)
![pangram-screen_v2](https://user-images.githubusercontent.com/102257735/189261995-8512eb40-eac2-4eea-b9f8-3b3391953551.png)


## Optimizations
**Bugs/quirks**
- Filter (exclusion): no trailing commas, no spaces between exclusion fragments are permitted, and must have at least one letter (something incorrect with the conditionals).

- Functionality: Further narrowing down set of results to only then call the dictionary API (currently deliberately detached from UI options).
- Take another pass with a less brute-force angle.
- Clean up the comment history/detritus.


## Problem focus
How do you narrow down on the many combinations possible with seven letters, where each letter appears at least once but the final word length is only known to be greater than or equal to seven?
Absent a sophisticated language processing approach for the time being, brute force leads to the following.

Task:
- Given an array of 7 letters (case insensitive), return an array of strings that are each valid English words created from the seven letters.
- The goal is pangram, so we don't care about the requirement of one letter always present, because all letters must be present. 
- But the pangram could be a word of any length, just at least 7 letters long based on the criteria.

Current status: returns all possible combos of seven-letter strings from the given letter arrays.

Problem breakdown below:

### Generating a comprehensive selection of potential strings
Does current recursion create a complete set?

Can results size be reduced in earlier stages for better performance/reduce unnecessary iterations?

### Reducing initial outputs
e.g., Very rough logic: In English, the same letter is unlikely to be repeated consecutively three times. So we get the function <code>narrowDown(string)</code> that returns a Boolean. Both to reduce calls to API and to enable human /manual assessment: In theory, a recognizable word can be spotted within the first seven letters. 

Artificial restriction: Pangrams that exceed a seven-letter count are currently out of scope of this program, a major flaw.

### Performance
Throwing the resulting seven-lettered strings - ideally pared down with fragmentary guesses - at a dictionary is very unkind and poor use of an API, so that part is actually detached from the current filtering and string generation logic and requires a manual call from console. Also see previous point for caveat.
                  
### Intermediate approach
A more manageable step to try would be to reduce the number of required letters and work with a smaller combination, to first verify the brute force approach can work.


## Learnings/To try
- Mostly documented inside the UI itself, but deliberately writing to follow OOP principles was a good refresher on closures.
- Create a minified version of the pangram (fewer letters) to cut down on the result array size.
- fixed some UI/input issues
- rewrote exclusion filter with array method `.some()`.
