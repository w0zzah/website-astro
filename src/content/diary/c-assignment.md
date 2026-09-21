---
title: "c assign"
date: 2026-09-20
summary: "Swapped one hand-written HTML file for components, a layout, and a content collection."
---

Big endian vs little endian
Big endian sotres the highest value on the right and little endian stores the highest on the left
Big endian is read ->
Little endian <-

Question 2:
Write two helper functions, read and print. Where read reades NBYTES number in hexadecimal form from the input and store the value in number. The input number will have the most significant byte on the left so it will be read first. Once fully read the status of number should be set to success.

Question 4:
Including header files:
#include "flilename.h"


The compiler error occurs because your #ifndef NBITS block wraps the entire file. when the auto grader tests tour code by passing -DNBITS=32 via the compiler, #ifndef NBITS evaulutaes to false, causing the compiler to skip everything inside, including tour struct definitions and function prototypes.
Additionally to create a proer C module, you must seperate your declarations (Structs, macros, function prototypes into the header file) and your implementations in to the C file.

Your logic for checking the first byte is on the right track since it contaisn the most significant bits of your number however > 16 is incorrect for determining if a binary num is negative. In two complement a number is negative if its most significant bit is 1. Since number.data[0] is a unisigned integer, its bits represent valuse from 128 down to 1. The most significant bit has a decimal value of 128 or 0x80 in hex. Therefore a number is negative if number.data[0] is greater than or equal to 128. The safest and most common way to check this in C is using a bit wise & to isolate that exact bit.

For question 6, you will need to create bool. A multi bute integer is only zero if every single byte in its data array is exacctly 0. You can achieve by using a for loop to go throu gh to NBYTEs.

#### Write Some arithmetic Functions

7. Add Two numbers

Now implkement in your module a function that adds two numbers (opa, opb) putting the resulting value into the data field of the result. The functions has this sig
The return value of the function is also the status field of the result

The function should not only set the data value of result but also the status value too. The status field will be:
OF
or The maximum of the status values of the two operands if an overflow isnt generated. This ensures the most urgent status information is retained.

OVer flows can happen if you add two positive together and get a negative re or add two negatives and get a positive tresult

IntStatus intN_add(IntNopa) etc
When looping through we want to find see if the sum goes over so we check for the carry. The max it can carry is ff+ff = 1FE

### A better read function
Expand your module by adding a new function with sig

This function takes a decimal formatted int from stdin and replys with the status. If its to big OVERFLOW, or FAIL if it isnt a num and if all good then SUCCESS. The integer is terminated when a non digit sumbol is entered inyour implemententation dont use scanf use getchar()



HINT:
The conversion requires working from the most significantdigit towards the least as you move from one digit to the next you will need to multiply the working value by 1-. There are a number of ways to perform the multiplelication. Th




#### Big Problems
Core Architecture problem
- Building a string vs calculating Math. You are attempting to save raw ASCII character codes into an array. The prompt requires converting the chars into a mathematical value by accumulating them. As you read each character you must subtract '0' to get the integer value, then add it to your running accumulator using the 10 = 8 + 2 trick.


##### Syntax
- **Operator Precedence:** In (c = getchar() != EOF && isspace(c)), the != and && operators evaluate first. This assigns a boolean 1 or 0 to c, destroying the actual char you want to get.
- **Inf Loop** You never call getchar() again after the first loop. if you find a - or +, you must call c = getchar() to move past the sign. You also must call it at the bottom of your for loop, otherwise c never changes and the loop runs forever.
- **&(result->data[i]) = c;** Invalid value -> attempts to overwrite a memory address itself
- **Misusing NBYTES:** NBYTES represent the binary bute size of the struc e.g 3bytes, not the maximum string length. A 3 byte integer goes up to 7 digits, whereas this triggers and overflow after just 3
- **!isalnum(int)** Pass a c type keyword(int) instead of a variable, furthermore, since your forloop requires is alnum(c) this inner check is logically impossible

###### Fixes:
c == '-' sign = -1, c = getchar();
!isdigit(c)
// MULTIPLICATION TRICK: x * 10 = (x * 8) + (x * 2)
// This is much more efficient than looping 10 times.
// If your IntN uses custom structs (like byte arrays), replace the bitwise
// shifts below with your custom intN_add() function:
// val_x2 = intN_add(acc, acc);
// val_x4 = intN_add(val_x2, val_x2);
// val_x8 = intN_add(val_x4, val_x4);
// acc = intN_add(val_x8, val_x2);

- **`temp` Loop:** Instead of `acc * 10` or the $8+2$ bit-shifts, it loops 10 times adding `acc` to `temp`, then overwrites `acc`.

- **Character Math:** `c - '0'` converts the raw ASCII code (e.g., `'5'` which is `53`) into the integer `5`. You must do math on the integer values, not the ASCII codes.

- **Array Assignment:** You cannot assign values directly into an array via `&(result->data[i]) = c`. The mathematical total is calculated in the `long acc` variable first, and at the very end, bitwise operators (`&` and `>>`) split that total across your 3-byte `data` array.


#### Hardcoded Overflow limits:
The overflow check in intN_read uses hardcoded values specifically tailored for 24 bits. Because NBITS and BYTES are macro defined and can change at compile time, calc it base on NBIT

1L << ((NBITS -1) -1)

#### Failure to Consume Leftover input on Overflow
When an overflow is detected inside the digit-reading while loop, the function immediately returns OVERFLOW. However it leaves the remaining digits of that overflowing number sitting in the stdin buffer unread. Any subsequent call to intN_read will accidentally parse in these lower digits.

#### missing ungetc() on fail:
When intN_read encounters an invalid character(non digit) right after an optional sign it sets result->status = FAIL and returns immediately without pushing the invalid character back to stdin via ungetc()

**Uninit/unmodified Status in intN_negate**: The function intN_negate(IntN* number) returns number->status, but it never actually modifies or sets number->status within the function body, leaving it dependant on whatever value it held previously

**Passing by value with in-Place modification: (intN_subtract)**
In intN_subtract, opb is passed by valuye to the function. Calling intN_negate(&opb) inside it only negates a local stack copy of opb, though intN_add immediately handles the addition with the negated local copy. However relying on in place modification of a passed-by-value struct parameter is fragile practice.