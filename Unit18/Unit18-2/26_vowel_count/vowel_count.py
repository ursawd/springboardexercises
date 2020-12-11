def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

    >>> vowel_count('rithm school')
    {'i': 1, 'o': 2}

    >>> vowel_count('HOW ARE YOU? i am great!')
    {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """

    vowel_hash = {}
    lower_phrase = phrase.lower()
    for letter in lower_phrase:
        if letter in "aeiou":
            vowel_hash[letter] = vowel_hash.get(letter, 0) + 1
    return vowel_hash