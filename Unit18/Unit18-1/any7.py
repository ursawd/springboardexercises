def any7(nums):
    """Are any of these numbers a 7? (True/False)"""

    # YOUR CODE HERE 
    num_count = nums.count(7)
    return True if num_count>0 else False
   
    
print("should be true", any7([1, 2, 7, 4, 5]))
print("should be false", any7([1, 2, 4, 5]))

