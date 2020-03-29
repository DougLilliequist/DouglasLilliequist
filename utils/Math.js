
  //https://torstencurdt.com/tech/posts/modulo-of-negative-numbers/
export const loopNegativeNumber = ({a, b}) => {

    a %= b;
    a = a > 0.0 ? a + b : a;
    return a;

}