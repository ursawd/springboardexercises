"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    def __init__(self, file_name):
        """Prepares word list from passed in file name

        >>> word_find = SpecialWordFinder("wordstest.txt")
        4 words read

        >>> word_find.random() in ['corn','tomatoe','kale','lettuce']
        True
        """

        self.file_name = file_name
        self.words = []

        "Reads file, creates list of words without \n's"
        fs = open(self.file_name, "r")

        for word in fs:
            self.words.append(word.strip("\n"))
        fs.close()
        print(f"{len(self.words)} words read")

        from random import choice

        self.choice = choice

    def random(self):
        "Return random word from words list"
        return self.choice(self.words)


class SpecialWordFinder(WordFinder):
    """Special Word Finder: finds random words from a dictionary.
    Remove any entry that is blank or starts with #
    Subclass of WordFinder
    """

    def __init__(self, file_name):
        super().__init__(file_name)

    def random(self):
        """Return random word form list after checking
        for blank words and entries starting with #"""
        random_word = super().random()
        while random_word == "" or random_word[0] == "#":
            random_word = super().random()
        return random_word


word_find = SpecialWordFinder("produce.txt")
print(word_find.random())
print(word_find.random())
print(word_find.random())

word_find = WordFinder("words.txt")
print(word_find.random())
print(word_find.random())
print(word_find.random())