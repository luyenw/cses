from enum import Enum
class Verdict():
    REJECTED = -2
    COMPILE_ERROR = -1
    IN_PROGRESS = 0
    ACCEPTED = 1
    WRONG_ANSWER = 2