// /(.)(?!(?:.{0,12})\1)(.)(?!(?:.{0,11})\2)(.)(?!(?:.{0,10})\3)(.)(?!(?:.{0,9})\4)(.)(?!(?:.{0,8})\5)(.)(?!(?:.{0,7})\6)(.)(?!(?:.{0,6})\7)(.)(?!(?:.{0,5})\8)(.)(?!(?:.{0,4})\9)(.)(?!(?:.{0,3})\10)(.)(?!(?:.{0,2})\11)(.)(?!(?:.?)\12)(.)(?!\13)./;

export function fn(input: string, markerLength: number) {
    let regexStr = ""
    
    for (let i = 0; i <= markerLength - 2; ++i) {
        const lookAhead = markerLength - (i + 2);
        const captureGroup = i + 1;
        regexStr += `(.)(?!(?:.{0,${lookAhead}})\\${captureGroup})`;
    }
  
    const regex = new RegExp(regexStr);
    
    console.log(regexStr)
    const result = regex.exec(input)!
    console.log(result)
    return result.index + markerLength;
}
