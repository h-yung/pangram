# pangram
Or, approaching the [NYT Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee) pangram hunt from a different angle. 

This vaguely follows OOP model by encapsulating some logic in a class while leaving the helper functions outside. 

**Tech used**: Simple HTML, JavaScript, and negligible CSS - focused on the logic.

There is minimal styling to facilitate:
- submission of the day's seven letters
- showing resulting string combinations
- permitting guesses of word fragments

## Live demo here
![pangram-screen_v1](https://user-images.githubusercontent.com/102257735/189031676-69d86153-d8bc-4fe6-be44-a14a88d71822.png)


## Optimizations
- Functionality: Further narrowing down set of results to only then call the dictionary API (currently deliberately detached from UI options).
- Take another pass with a less brute-force angle.
- Clean up the comment history/detritus.

## Problem focus
Given an array of 7 letters (case insensitive), return an array of strings that are each valid English words created from the seven letters.

The goal is pangram, so we don't care about the requirement of one letter always present, because all letters must be present. 

But the pangram could be a word of any length, just at least 7 letters long based on the criteria.


Current state: returns all possible combos of seven-letter strings from the given letter arrays.
