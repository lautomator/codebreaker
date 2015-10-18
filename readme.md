Codebreaker
===========
version 1.2

#Summary
Codebreaker is a simple guessing game and can be run from a web browser. It is written in JavaScript. This version is written as object-oriented JavaScript.

#Instructions
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

#Setup
This version can be run from a web browser. Download the source and open the `index.html` page in a browser or you can play the game here: [codebreaker](http://automaton.host-ed.me/apps/cb/).

![codebreaker screenshot 1](https://dl.dropboxusercontent.com/u/54256847/cb-01.png)

![codebreaker screenshot 2](https://dl.dropboxusercontent.com/u/54256847/cb-02.png)

#Development
There are two directories: `public` and `www` in the `codebreaker` root directory. The `public` directory is the working directory. It uses the [Harp](http://harpjs.com/) server environment.

Before editing, run `harp server` within the `codebreaker` directory. This will listen for changes when editing the css: sass stylesheet.

When you are finished with development, run `harp compile`. This will create and/or overwrite the `www/` directory, your final processed production directory.

#Thanks
Special thanks to [Sam Halperin](https://github.com/shalperin) for several code reviews and suggestions.