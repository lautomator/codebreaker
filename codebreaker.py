#!/usr/bin/python

# CODEBREAKER
# ------------
# This game is based on the classic Atari 2600 game of the same title.
# The object of the game is for the player to guess n=level numbers between
# 0 and 9 in the correct order. If the player guesses any of the numbers,
# a flag is raised. Flags indicate one of three things:
#   * = a number has been matched and is not in the correct position
#   + = a number has been matched and is in the correct position
#   - = a number has not been matched.
#
# The flag does not necessarily indicate the correct position on
# the readout. For example, given a solution of 123, the game play
# might look like this:
#
# 346 --> -*-
# 328 --> -+*
# 423 --> ++-
# 123 --> +++
#
# The game play ends when all of the numbers have been matched
# to their correct positions. Each time the player makes an attempt
# to guess the numbers, a point is added to their score. The
# player's score is displayed at the end of the game.
#
# There are three levels to choose from:
# 3 (easy),
# 4 (medium),
# 6 (difficult)
#
# This is the command line version of the game.
#
# Author: John Merigliano<automato@host-ed.me>
# 2014

from random import sample
import re


class CodeBreaker:
    '''
        Represents a CodeBreaker game
        using n=level and a solution.
        By default, this is a 1 player
        game with a skill level of 3.
    '''

    def __init__(self, no_of_players=1, level=3):
        ''' Produces the solution. '''

        self.no_of_players = no_of_players
        self.level = level
        self.solution = self.set_solution(self.level)

    def set_solution(self, level):
        '''
            Returns n=level string of
            unique random numbers
        '''

        sol = []
        random_sample = sample(range(0, 9), level)

        sol = [str(i) for i in random_sample]

        # Returns the solution as a string
        solution = ''.join(sol)

        return solution

    def validate_guess(self, guess, level):
        '''
            Returns True if the guess is accepted.
            A guess must be at least n=level long
            and contain numbers. If letters or any
            other characters are present, they are
            ignored.
        '''
        # Guess needs to be numbers only:
        pattern = r'[0-9]'
        nos = []

        # Assume a guess is invalid
        valid = False

        index = 0
        while index < len(guess):
            if re.match(pattern, guess[index]):
                nos.append(guess[index])
            index += 1

        # Rule out the length of the guess first.
        # Accept only n=level chars.
        if len(nos) == level:
            valid = True

        return valid

    def guess_response(self, guess, level, solution):
        '''
            Takes the validated guess and returns
            a response (string) based on the accuracy
            of the guesses. The results are jumbled.
        '''

        results = []        # results returned from comparison
        guess_values = []   # a matrix of guesses
        sol_values = []     # the solution in a matrix

        # Assume the player has made incorrect guesses.
        # An incorrect guess is indicated with '-'.
        results = [res for res in ('-' * level)]

        # Add the guesses to a list
        for guess_val in guess:
            guess_values.append([guess.index(guess_val), guess_val])

        # Add the solution to a list
        for sol_value in solution:
            sol_values.append([solution.index(sol_value), sol_value])

        # Compare the guess and the solution and prepare the results.
        for val in guess_values:
            for sol in sol_values:
                # correct guess, correct position
                if val == sol:
                    results[val[0]] = '+'
                # correct guess, wrong position
                elif val[0] != sol[0] and val[1] == sol[1]:
                    results[val[0]] = '*'

        # Jumble the order of the response to add difficulty to the game.
        # Produce a random range of indices based on the level:
        seq = sample(range(0, level), level)
        temp = []
        index = 0

        while index < level:
            temp.append(results[seq[index]])
            index += 1

        # Reassign the values in the results list.
        results = temp

        # Return results to the player:
        #   * = a number has been matched and is not in the correct position
        #   + = a number has been matched and is in the correct position
        #   - = a number has not been matched.
        response = ''.join(results)

        return response

    def get_turns(self):
        ''' Returns the amount of turns allowed '''

        if self.level == 3:
            turns = 10
        elif self.level == 4:
            turns = 20
        else:
            turns = 30

        return turns

    def play(self):
        '''
            The game in play:
            Returns the score.
        '''
        turns = self.get_turns()

        print "skill level =", self.level
        print "You have", turns, "turns to break the code."

        counter = 1
        while counter <= turns:
            guess = raw_input(str(counter) + ' --> ')
            valid_guess = self.validate_guess(guess, self.level)

            # Check the guess
            if valid_guess:
                response =\
                    self.guess_response(guess, self.level, self.solution)
            if not valid_guess:
                print 'Invalid guess'
            elif valid_guess and response == ('+' * self.level):
                print response
                print 'Solved!'
                print 'Score:', counter
                break
            elif counter == turns and valid_guess and response !=\
                    ('+' * self.level):
                print response
                print 'You have run out of guesses.'
                print 'Solution:', self.solution
                print 'Game Over'
                break
            else:
                print response
                counter += 1
# Codebreaker game class ends.


def get_welcome():
    ''' Display title and instructions '''

    print ("-" * 12) + "\nCode Breaker\n" + ("-" * 12)
    print "Instructions:\n"
    # Get the instructions:
    instructions = open('instructions.txt', 'r')
    print instructions.read()
    instructions.close()


def validate_level(skill_level):
    '''
        Returns an integer that represents the
        skill level choice. The choices are
        3, 4, or 6 (easy, medium, or hard).
    '''
    # There are only 3 valid choices: 3, 4, or 6.
    choices = ['3', '4', '6']

    # Validate the player's entry.
    # If an incorrect choice is made, the level
    # reverts to the default: 3
    if skill_level == choices[0]\
        or skill_level == choices[1]\
            or skill_level == choices[2]:
                response = int(skill_level)
    else:
        response = 3

    return response


def main():

    get_welcome()

    skill_level = raw_input('Skill level (3, 4, or 6): ')
    level = validate_level(skill_level)

    no_of_players = 1

    game = CodeBreaker(no_of_players, level)
    game.set_solution(level)
    game.play()

if __name__ == '__main__':
    main()
