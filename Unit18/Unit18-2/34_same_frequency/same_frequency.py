def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

    >>> same_frequency(551122, 221515)
    True

    >>> same_frequency(321142, 3212215)
    False

    >>> same_frequency(1212, 2211)
    True
    """
    first = str(num1)
    second = str(num2)
    my_dict1 = {}
    my_dict2 = {}

    for num in first:
        my_dict1[num] = my_dict1.get(num, 0) + 1
    for num in second:
        my_dict2[num] = my_dict2.get(num, 0) + 1
    return my_dict1 == my_dict2
