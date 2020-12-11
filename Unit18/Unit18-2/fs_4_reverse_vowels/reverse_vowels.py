def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    >>> reverse_vowels("aeiou")
    'uoiea'

    >>> reverse_vowels("why try, shy fly?")
    'why try, shy fly?'
    """
    vowels = "aeiou"
    new_s = list(s)
    stop = len(s)
    for i in range(0, len(s) - 1, 1):  # start,stop,index

        if s[i] in vowels:

            for j in range(stop - 1, -1, -1):
                if j + 1 == i:
                    return "".join(new_s)
                if new_s[j] in vowels:
                    new_s[j], new_s[i] = new_s[i], new_s[j]
                    stop = j
                    break
    return "".join(new_s)


# print(reverse_vowels("1a2e3i4o"))
# # 1d2c3b4a
# print(reverse_vowels("Hello!"))
# print(reverse_vowels("Tomatoes"))
# #'Temotaos'
# print(reverse_vowels("Reverse Vowels In A String"))
# #'RivArsI Vewols en e Streng'
# print(reverse_vowels("aeiou"))