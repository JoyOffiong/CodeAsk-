export function convertString(str) {
    var eachStr = str.split(",");
    var total = [];

    for (let i = 0; i < eachStr.length; i++) {
      total.push({
        name: eachStr[i].toLowerCase(),
      });
    }

    return total;
  }

  export function convertArray(str) {
    var total = [];
  
    for (let i = 0; i < str.length; i++) {
      total.push({
        name: str[i].toLowerCase(),
      });
    }
  
    return total;
  }