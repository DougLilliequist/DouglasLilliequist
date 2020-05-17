
  //https://torstencurdt.com/tech/posts/modulo-of-negative-numbers/
export const loopNegativeNumber = ({a, b}) => {

    a %= b;
    a = a > 0.0 ? a + b : a;
    return a;

}

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export const makeid = ({length}) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}