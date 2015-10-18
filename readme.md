Codebreaker
===========
version 0.0

#Summary
This is the initial version of the game authored in Python and can be played on the command line.


#Rules
This game is based on the classic Atari 2600 game of the same title.
The object of the game is for the player to guess n=level numbers between
0 and 9 in the correct order. If the player guesses any of the numbers,
a flag is raised. Flags indicate one of three things:

    * = a number has been matched and is not in the correct position

    + = a number has been matched and is in the correct position

    - = a number has not been matched.

**The flag does not necessarily indicate the correct position on
the readout.** For example, given a solution of *123*, the game play might look like this:

```
346 --> -*-

328 --> -+*

423 --> ++-

123 --> +++
```

The game play ends when all of the numbers have been matched
to their correct positions. Each time the player makes an attempt
to guess the numbers, a point is added to their score. The
player's score is displayed at the end of the game.

There are three levels to choose from:

```
3 (easy),

4 (medium),

6 (difficult)
```

#Setup
To play the game, download the source file: `codebreaker.py`. In the terminal, find the source file and run the program: `python codebreaker.py`.
