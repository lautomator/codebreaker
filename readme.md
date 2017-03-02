Codebreaker
===========
<cite>version 1.1</cite>

##Summary
Codebreaker is a simple guessing game and can be run from a web browser. It is written in JavaScript.

##Instructions
This game is based on the classic Atari 2600 game of the same
title. The object of the game is for the player to guess 3
numbers between 0 and 9 in the correct order. When the player
makes a guess, a flag is raised. Flags indicate one of three things:

```
  * = a number has been matched and is not in the correct position
  + = a number has been matched and is in the correct position
  _ = a number has not been matched.
```

The flag does not necessarily indicate the correct position on
the readout. For example, given a solution of 123, the game play
might look like this:

```
  346 --> _*_
  328 --> _+*
  423 --> ++_
  123 --> +++
```

The game ends when all of the numbers have been matched
to their correct positions or 10 guesses have been taken.

##Setup
This version can be run from a web browser. Download the source and open the ```index.html``` page in a browser or you can play the game here: [codebreaker](http://automaton.host-ed.me/apps/cb/).

![codebreaker screenshot 1](https://www.dropbox.com/s/4g9cf6um0f5it7g/cb-01.png?dl=0)

![codebreaker screenshot 2](https://www.dropbox.com/s/ophz6s5uqp5erb9/cb-02.png?dl=0)

Special thanks to [Sam Halperin](https://github.com/shalperin) for several code reviews and suggestions.
