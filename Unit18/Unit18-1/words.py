def print_upper_words(words, must_start_with):
    """print_upper_words is a function to print words from
    a list one per line all upper case.
    """
    for word in words:
        for letter in must_start_with:
            if word.upper()[0] == letter.upper():
                print(word.upper())


words = ["one", "two", "three", "even", "either", "HELLO", "Eight", "Over"]
print_upper_words(words, must_start_with={"e", "H"})
