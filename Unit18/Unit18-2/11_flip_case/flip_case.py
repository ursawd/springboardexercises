def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

    >>> flip_case('Aaaahhh', 'a')
    'aAAAhhh'

    >>> flip_case('Aaaahhh', 'A')
    'aAAAhhh'

    >>> flip_case('Aaaahhh', 'h')
    'AaaaHHH'

    """
    to_swap = to_swap.lower()
    phrase_list = []
    for letter in phrase:
        if letter.lower() == to_swap:
            phrase_list.append(letter.swapcase())
        else:
            phrase_list.append(letter)
    return "".join(phrase_list)
