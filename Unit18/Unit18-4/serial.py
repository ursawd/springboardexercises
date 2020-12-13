"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        "Generate serial numbers from start value at each call"

        self.start = start
        self.next_num = start - 1

    def __repr__(self):
        # if self.next_num < self.start:
        #     self.next_num += 1
        return f"<SerialGenerator start={self.start} next={self.next_num+1}>"

    def generate(self):
        "Return next number in sequence"
        self.next_num += 1
        return self.next_num

    def reset(self):
        "Reset sequence to original starting value"
        self.next_num = self.start - 1


serial = SerialGenerator(100)
print(serial.generate())
print(serial.generate())
print(serial.generate())
print(serial)
serial.reset()
print(serial.generate())
print(serial)
print(serial.generate())
