---
title: 'The Magic square of Multiplication'
summary: 'We all know magic squares add up. But can they multiply?'
tags: ['math', 'number-theory', 'linear-algebra']
level: 9
publishDate: 2026-08-31
katexMacros:
  \msq: >
    {\;
    \def\arraystretch{1.25}
    \begin{array}{|c|c|c|}
    \hline #1 & #2 & #3 \\
    \hline #4 & #5 & #6 \\
    \hline #7 & #8 & #9 \\
    \hline
    \end{array}
    \;}
  \mmsq: >
    \;
    \begin{array}{|c|c|c|}
    \hline \rule[-1.5em]{0pt}{3.4em} #1 & #2 & #3 \\
    \hline \rule[-1.5em]{0pt}{3.4em} #4 & #5 & #6 \\
    \hline \rule[-1.5em]{0pt}{3.4em} #7 & #8 & #9 \\
    \hline
    \end{array}
    \;
  \mmmsq: >
    \;
    \begin{array}{|c|c|c|}
    \hline \rule[-2.0em]{0pt}{4.5em} #1 & #2 & #3 \\
    \hline \rule[-2.0em]{0pt}{4.5em} #4 & #5 & #6 \\
    \hline \rule[-2.0em]{0pt}{4.5em} #7 & #8 & #9 \\
    \hline
    \end{array}
    \;
---

You might know about the classic magic square -- every row, column, and diagonal adds up to the same number. But why stop at addition? What if every row, column, and diagonal had to _multiply_ to the same number instead?

Can we build such a thing? And if so, how?

## A Quick Recap

The classic $3 \times 3$ magic square uses the numbers 1 through 9, each exactly once. The magic sum is 15.

$$
\msq{8}{1}{6}
    {3}{5}{7}
    {4}{9}{2}
$$

Sum any row, any column, or either diagonal. You get 15.

Of course, you can use other sets of numbers, flip, or rotate the square, and it remains a magic square.

## From Addition to Multiplication

Before building a multiplicative magic square from scratch, let's try using what we already have. We have a square where things _add_ nicely. Can we somehow convert addition into multiplication?

Pause for a moment. Is there a mathematical operation that bridges addition and multiplication?

You might remember logarithms from school. They turn multiplication into addition -- $\log(x \cdot y) = \log(x) + \log(y)$. But we want the opposite direction. And the opposite of a logarithm is exponentiation.

That's the key.

The product rule of exponents is $a^x \cdot a^y = a^{x+y}$. Take two pairs of numbers where $x_1 + y_1 = x_2 + y_2$. Raise both sides to a common base $a$, and you get

$$
\begin{aligned}
a^{x_1 + y_1} &= a^{x_2 + y_2} \\
a^{x_1} \cdot a^{y_1} &= a^{x_2} \cdot a^{y_2}
\end{aligned}
$$

Two pairs of numbers that _add_ to the same total become two pairs that _multiply_ to the same product.

This extends to any number of terms. $a^{x+y+z} = a^x \cdot a^y \cdot a^z$ and so on. We just need to raise each element of our additive magic square to a common base.

Let's choose base 2:

$$
2^{\msq{8}{1}{6}{3}{5}{7}{4}{9}{2}}
=
\msq{256}{2}  {64}
    {8}  {32} {128}
    {16} {512}{4}
$$

Check it.  
Row 1: $256 \times 2 \times 64 = 32{,}768$.  
Column 1: $256 \times 8 \times 16 = 32{,}768$.  
Every row, column, and diagonal multiplies to $32{,}768 = 2^{15}$.

Any additive magic square can be converted to a multiplicative magic square by raising each element to the power of some base. Not just 2 -- any base works. This technique of turning additive squares into geometric ones via exponents dates back to Michael Stifel in 1544.[^1]

## The Magic Product

For a traditional magic square, the magic sum equals $3$ times the center element. If the center is $c$, the magic sum is $c + c + c = 3c$.

Just replace addition with multiplication, and the magic product will be $c \cdot c \cdot c = c^3$. That is indeed the case. In our example: $32^3 = 32{,}768$.

The magic product of a $3 \times 3$ multiplicative magic square is always the cube of the center element.

## More Than One Base

Here's a fact you might not know: you can add two additive magic squares element-wise, and the result is another additive magic square. You just need to be careful about uniqueness.

$$
\msq{8}{1}{6}
    {3}{5}{7}
    {4}{9}{2}
+
\msq{7}{0}{5}
    {2}{4}{6}
    {3}{8}{1}
=
\msq{15}{1} {11}
    {5} {9} {13}
    {7} {17}{3}
$$

Similarly, we can multiply two multiplicative magic squares element-wise. And we already know how to build multiplicative magic squares -- raise each element to some base. The base can be anything. The original additive magic squares don't even need unique elements, as long as the _final_ multiplicative square does.

Here's one using two bases:

$$
\begin{aligned}
2^{\msq{2}{0}{1}{0}{1}{2}{1}{2}{0}}
\cdot
3^{\msq{1}{0}{2}{2}{1}{0}{0}{2}{1}}
&=
\msq{4}{1}{2}
    {1}{2}{4}
    {2}{4}{1}
\cdot
\msq{3}{1}{9}
    {9}{3}{1}
    {1}{9}{3} \\
&=
\msq{12}{1} {18}
    {9} {6} {4}
    {2} {36}{3}
\end{aligned}
$$

Every row, column, and diagonal multiplies to $216$. In fact, $216$ is the minimum possible magic product for any $3 \times 3$ multiplicative magic square of distinct positive integers.[^2]

But wait -- how do we _know_ every number in the result is unique? Maybe we just got lucky here?

## Unique Numbers via the Fundamental Theorem

The fundamental theorem of arithmetic states that every integer greater than 1 has a unique prime factorization. Since we chose bases 2 and 3 -- both prime -- each cell is of the form $2^a \cdot 3^b$. Two cells are equal only if they share the same pair $(a, b)$.

So we just need 9 unique pairs.

## A Magic Square of Tuples

We need a $3 \times 3$ magic square of unique tuples $(a, b)$ where the sum of tuples along every row, column, and diagonal is the same. And then we can raise each element of the tuple to some base and multiply them together (for example $2^a \cdot 3^b$) to get our multiplicative magic square.

But how do we even write unique tuples that add up properly? How do we even write unique numbers? But wait, we already do that! When we write "12", it's twelve and nothing else. And notice - we just wrote _12_, that's a 1 and a 2. Two digits. A tuple: $(1, 2)$.

We need 9 unique pairs of numbers for our $3 \times 3$ magic square. Choosing some small integers ($\{0, 1, 2\}$, because why not), we get exactly $3 \times 3 = 9$ unique pairs:

$$
\begin{matrix}
(0,0) & (0,1) & (0,2) \\
(1,0) & (1,1) & (1,2) \\
(2,0) & (2,1) & (2,2)
\end{matrix}
$$

### But how to arrange them magic-square-style?

And then I had a thought... We're counting up with only the digits $\{0, 1, 2\}$. Those are exactly the digits of **base 3**. What if we write our magic square in base 3? Changing the base doesn't change the additive properties:

$$
\msq{7}{0}{5}
    {2}{4}{6}
    {3}{8}{1}
=
\msq{21_3}{00_3}{12_3}
    {02_3}{11_3}{20_3}
    {10_3}{22_3}{01_3}
\;\;\rightarrow\;\;
\msq{(2,1)}{(0,0)}{(1,2)}
    {(0,2)}{(1,1)}{(2,0)}
    {(1,0)}{(2,2)}{(0,1)}
$$

Each row, column, and diagonal adds to $(3,3)$.

Now look at those tuples again. Do they look familiar? They're exactly the exponent pairs we used for the multi-prime construction above! The base-3 representation of a magic square _is_ also a magic square of tuples.

Remember this trick. It will come back.

## Can a Magic Square Be Both Additive _and_ Multiplicative?

It's mathematically impossible for $3 \times 3$ or $4 \times 4$ magic squares to be both additive and multiplicative.[^3] For $5 \times 5$ and $6 \times 6$, it is not known whether any exist. The smallest known additive-multiplicative magic square is $7 \times 7$, discovered by Sébastien Miquel in 2016:[^4]

$$
{
\def\arraystretch{1.25}
\begin{array}{|c|c|c|c|c|c|c|}
\hline 126 & 66 & 50 & 90 & 48 & 1 & 84 \\
\hline 20 & 70 & 16 & 54 & 189 & 110 & 6 \\
\hline 100 & 2 & 22 & 98 & 36 & 72 & 135 \\
\hline 96 & 60 & 81 & 4 & 10 & 49 & 165 \\
\hline 3 & 63 & 30 & 176 & 120 & 45 & 28 \\
\hline 99 & 180 & 14 & 25 & 7 & 108 & 32 \\
\hline 21 & 24 & 252 & 18 & 55 & 80 & 15 \\
\hline
\end{array}
}
$$

Magic sum $= 465$.  
Magic product $= 150{,}885{,}504{,}000$.

## Why Not $3 \times 3$?

Let's try to understand _why_ it's impossible. Assume a $3 \times 3$ additive-multiplicative magic square exists:

$$
\msq{a}{b}{c}{d}{e}{f}{g}{h}{i}
$$

As we've seen, the magic sum is $3e$, and the magic product is $e^3$. Focus on the middle row. What do these two constraints together force?

From addition: $d + e + f = 3e \implies d + f = 2e \qquad (1)$

From multiplication: $d \cdot e \cdot f = e^3 \implies d \cdot f = e^2 \quad\; (2)$

We know the sum and product of $d$ and $f$. Substituting $d = 2e - f$ into $d \cdot f = e^2$:

$$
\begin{aligned}
(2e - f) \cdot f &= e^2 \\
2ef - f^2 &= e^2 \\
e^2 - 2ef + f^2 &= 0 \\
(e - f)^2 &= 0 \\
e - f &= 0 \implies \boxed{e = f}
\end{aligned}
$$

So $e = f$. And from $d + f = 2e$, we get $d = e$ too. The same argument works for every pair that crosses the center: $a = i = e$, $b = h = e$, $c = g = e$. Every cell **must** equal the center.

Technically, that's a magic square. But a _real_ magic square demands distinct entries. Dead end.

Similarly, we can prove this holds for $4 \times 4$ magic squares too. The proof is a bit longer, so just take my word for it :)

## Escaping the Trap with Matrices

That's disappointing. But I want a $3 \times 3$ add-mult magic square!

Look at the proof again. Where exactly did things go wrong? The killing blow was $(e - f)^2 = 0$ forcing $e = f$. For ordinary numbers, the only thing whose square is 0 _is_ 0.

But what if we used other mathematical objects where that's _not_ true? We did already use tuples. What if something could be non-zero, yet square to zero?

We've been working with grids of numbers this whole time -- and that reminds me of **matrices**. There are these special matrices called **nilpotent matrices**: non-zero matrices whose powers give the zero matrix.

A simple $2 \times 2$ nilpotent matrix looks like:

$$
N_x = \begin{bmatrix} 0 & x \\ 0 & 0 \end{bmatrix}
$$

where $x$ is any number we like. Multiply any two matrices of this form and you get zero:

$$
\begin{bmatrix} 0 & x \\ 0 & 0 \end{bmatrix}
\cdot
\begin{bmatrix} 0 & y \\ 0 & 0 \end{bmatrix}
=
\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}
$$

Now, what values should $x$ take? Three entries of each matrix are fixed at 0 -- they'll always add to 0 regardless. The only free parameter is $x$. For the magic sum to be constant, the $x$ values in each row, column, and diagonal must sum to the same number. We already know how to arrange that -- use the entries from one of our original additive magic squares from earlier:

$$
\msq{8}{1}{6}
    {3}{5}{7}
    {4}{9}{2}
\;\;\rightarrow\;\;
\mmsq
{\begin{bmatrix} 0 & 8 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 6 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 3 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 5 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 7 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 4 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 9 \\ 0 & 0 \end{bmatrix}}
{\begin{bmatrix} 0 & 2 \\ 0 & 0 \end{bmatrix}}
$$

Every row, column, and diagonal sums to $\begin{bmatrix} 0 & 15 \\ 0 & 0 \end{bmatrix}$.  
Every product is $\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$.

It's both additive and multiplicative. All entries are distinct. We have our $3 \times 3$ additive-multiplicative magic square!

## Fixing the Zero Product

But the product is just zero. That feels hollow. Can we do better?

A useful fact: adding the same constant to every cell of an additive magic square keeps it magic -- the magic sum just increases by $3$ times that constant. For matrices, the natural "constant" to add is the identity matrix $I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$.

### Does the product still remain the same across rows, columns, and diagonals?

Let $N_1, N_2, N_3$ be three nilpotent matrices from the same row, column, or diagonal. Since any product of matrices of the form $\begin{bmatrix} 0 & x \\ 0 & 0 \end{bmatrix}$ gives zero, we have $N_i \cdot N_j = 0$ for all pairs. We'll add $I$ to each entry, and expand the product:

$$
\begin{alignedat}{8}
{} &\mathrlap{(I + N_1)(I + N_2)(I + N_3)} \\
={} &III &{}+{}& IIN_3 &{}+{}& IN_2I &{}+{}& IN_2N_3 &{}+{}& N_1II &{}+{}& N_1IN_3 &{}+{}& N_1N_2I &{}+{}& N_1N_2N_3 \\
={} &I &{}+{}& N_3 &{}+{}& N_2 &{}+{}& 0 &{}+{}& N_1 &{}+{}& 0 &{}+{}& 0 &{}+{}& 0 \\
={} &\mathrlap{I + N_1 + N_2 + N_3}
\end{alignedat}
$$

All cross-terms containing a product $N_i N_j$ vanish. What remains is $I$ plus the sum $N_1 + N_2 + N_3$. But that sum is the additive magic sum -- and it's the same for every row, column, and diagonal. So the product is the same too.

After adding $I$ to each entry:

$$
\mmsq
{\begin{bmatrix} 1 & 8 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 6 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 3 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 5 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 7 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 4 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 9 \\ 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}}
$$

Magic sum $= \begin{bmatrix} 3 & 15 \\ 0 & 3 \end{bmatrix}$.  
Magic product $= \begin{bmatrix} 1 & 15 \\ 0 & 1 \end{bmatrix}$.

Non-zero, non-trivial, and magic under both operations. Magical!

## Going Bigger: $3 \times 3$ Matrices

Why stop at $2 \times 2$? A $3 \times 3$ nilpotent matrix of the form $\begin{bmatrix} 0 & x & y \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$ gives us _two_ free parameters. The easy route: set one to zero and fill the other from a magic square from above. But where's the fun in that?

We need pairs $(x, y)$ that sum component-wise to the same pair across every line. Hmm, pairs of numbers that add up consistently... where have we seen that before?

The base-3 trick! The tuple magic square gives us exactly the pairs we need.

The tuple $(2, 1)$ becomes the matrix $\begin{bmatrix} 0 & 2 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$. Doing the same for all the 9 tuples and then adding the $3 \times 3$ identity to each, we get this $3 \times 3$ add-mult magic square of $3 \times 3$ matrices:

$$
\mmmsq
{\begin{bmatrix} 1 & 2 & 1 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 1 & 2 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 0 & 2 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 1 & 1 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 2 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 2 & 2 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
$$

Magic sum $= \begin{bmatrix} 3 & 3 & 3 \\ 0 & 3 & 0 \\ 0 & 0 & 3 \end{bmatrix}$.  
Magic product $= \begin{bmatrix} 1 & 3 & 3 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$.

> [!NOTE!]
>
> #### What just happened?
>
> We used the base-3 trick _three_ separate times: to build the tuple magic square, to construct a multiplicative magic square with multiple primes, and now to fill in the matrix entries.

## Removing the Zeros

But we still have so many zeros in those matrices. Can we get rid of them?

Suppose we replace every matrix $M_i$ in the magic square with $P M_i P^{-1}$ for some fixed invertible matrix $P$. Does the magic square stay magic?

For products, yes. The product along any line transforms as:

$$
\begin{aligned}
&(P M_1 P^{-1})(P M_2 P^{-1})(P M_3 P^{-1}) \\
={} &P M_1 (P^{-1} P) M_2 (P^{-1} P) M_3 P^{-1} \\
={} &P (M_1 M_2 M_3) P^{-1}
\end{aligned}
$$

The inner $P^{-1} P$ pairs collapse to $I$, and we're left with $P$ times the old product times $P^{-1}$. Since the old product was the same for every line, the new product is too.

For sums, a simple factoring works:

$$
P M_1 P^{-1} + P M_2 P^{-1} + P M_3 P^{-1} = P (M_1 + M_2 + M_3) P^{-1}
$$

Again, a constant transformation of the old magic sum -- the same across every line.

So conjugation by any invertible $P$ preserves both the additive and multiplicative magic properties. We're free to choose $P$ to scramble the zero structure.

Let's choose:

$$
P = \begin{bmatrix} 1 & 0 & 1 \\ 2 & 3 & -2 \\ -2 & -2 & 1 \end{bmatrix}, \qquad
P^{-1} = \begin{bmatrix} -1 & -2 & -3 \\ 2 & 3 & 4 \\ 2 & 2 & 3 \end{bmatrix}
$$

Replacing each $M_i \mapsto P M_i P^{-1}$ in our $3 \times 3$ matrix magic square from above:

$$
\mmmsq
{\begin{bmatrix} 7 & 8 & 11 \\ 12 & 17 & 22 \\ -12 & -16 & -21 \end{bmatrix}}
{\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}
{\begin{bmatrix} 7 & 7 & 10 \\ 12 & 15 & 20 \\ -12 & -14 & -19 \end{bmatrix}}
{\begin{bmatrix} 5 & 4 & 6 \\ 8 & 9 & 12 \\ -8 & -8 & -11 \end{bmatrix}}
{\begin{bmatrix} 5 & 5 & 7 \\ 8 & 11 & 14 \\ -8 & -10 & -13 \end{bmatrix}}
{\begin{bmatrix} 5 & 6 & 8 \\ 8 & 13 & 16 \\ -8 & -12 & -15 \end{bmatrix}}
{\begin{bmatrix} 3 & 3 & 4 \\ 4 & 7 & 8 \\ -4 & -6 & -7 \end{bmatrix}}
{\begin{bmatrix} 9 & 10 & 14 \\ 16 & 21 & 28 \\ -16 & -20 & -27 \end{bmatrix}}
{\begin{bmatrix} 3 & 2 & 3 \\ 4 & 5 & 6 \\ -4 & -4 & -5 \end{bmatrix}}
$$

Almost no zeros.  
Magic sum $= \begin{bmatrix} 15 & 15 & 21 \\ 24 & 33 & 42 \\ -24 & -30 & -39 \end{bmatrix}$.  
Magic product $= \begin{bmatrix} 13 & 15 & 21 \\ 24 & 31 & 42 \\ -24 & -30 & -41 \end{bmatrix}$.

## Bonus: A Magic Square of Magic Squares

$$
\begin{array}{|c|c|c|}
\hline \rule[-2.5em]{0pt}{5.5em}
{\msq{71}{64}{69}{66}{68}{70}{67}{72}{65}} &
{\msq{8}{1}{6}{3}{5}{7}{4}{9}{2}} &
{\msq{53}{46}{51}{48}{50}{52}{49}{54}{47}} \\
\hline \rule[-2.5em]{0pt}{5.5em}
{\msq{26}{19}{24}{21}{23}{25}{22}{27}{20}} &
{\msq{44}{37}{42}{39}{41}{43}{40}{45}{38}} &
{\msq{62}{55}{60}{57}{59}{61}{58}{63}{56}} \\
\hline \rule[-2.5em]{0pt}{5.5em}
{\msq{35}{28}{33}{30}{32}{34}{31}{36}{29}} &
{\msq{80}{73}{78}{75}{77}{79}{76}{81}{74}} &
{\msq{17}{10}{15}{12}{14}{16}{13}{18}{11}} \\
\hline
\end{array}
$$

This is just additive. Magic sum $= \msq{132}{111}{126}{117}{123}{129}{120}{135}{114}$

Even the magic sum is a magic square with magic sum $= 369$! (And that's not a factorial.)

For obvious reasons, this is also a $9 \times 9$ additive magic square! Think how.

This nested pattern is known as a **composite (or compound) magic square**; a $9 \times 9$ grid formed by nine $3 \times 3$ magic squares with magic sum 369 was first documented by Chinese mathematician Yang Hui in 1275.[^5]

## Further Reading

- [Multimagie.com](http://www.multimagie.com/) -- Christian Boyer's encyclopedic repository on multimagic and additive-multiplicative squares.
- [Wolfram MathWorld: Multiplicative Magic Square](https://mathworld.wolfram.com/MultiplicativeMagicSquare.html) -- Mathematical definitions, properties, and order-specific results.

[^1]: Michael Stifel, _Arithmetica Integra_ (1544), pp. 29–30.

[^2]: G. Pfeffermann, _Les Tablettes du Chercheur_ (1893); Henry Ernest Dudeney, _Amusements in Mathematics_ (1917), Problem 410. See also Eric W. Weisstein, ["Multiplicative Magic Square"](https://mathworld.wolfram.com/MultiplicativeMagicSquare.html), _Wolfram MathWorld_.

[^3]: The impossibility of $3 \times 3$ and $4 \times 4$ additive-multiplicative magic squares was proved by Lee Morgenstern in 2007. See Christian Boyer, ["Smallest additive-multiplicative magic square"](http://multimagie.com/English/SmallestAddMult.htm), _Multimagie.com_.

[^4]: Sébastien Miquel, "7x7 Additive-Multiplicative Magic Square" (August 2016). Details and computation logs available on Christian Boyer's [Multimagie.com](http://multimagie.com/English/SmallestAddMult.htm).

[^5]: Yang Hui, _Xugu Zhaiqi Suanfa_ (续古摘奇算法, 1275).
