function decodeString(s: string): string {
    const stack: (string | number)[] = [];
    let currentNum = 0;

    for (let char of s) {
        if (char >= '0' && char <= '9') {
            currentNum = currentNum * 10 + Number(char);
        } else if (char === '[') {
            stack.push(currentNum)
            currentNum = 0;
        } else if (char === ']') {
            let segment = "";
            while (typeof stack[stack.length - 1] !== "number") {
                const popped = stack.pop() as string;
                segment = popped + segment;
            }
            const num = stack.pop() as number;
            stack.push(segment.repeat(num));
        } else {
            stack.push(char);
        }
    }

    return stack.join('');
}
