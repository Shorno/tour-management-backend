function isValid(s: string): boolean {
    const brackets: Record<string, string> = {
        "(": ")",
        "{": "}",
        "[": "]",
    };


    const stack: string[] = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char in brackets) {
            stack.push(char)
        }else {
            const last = stack.pop();
            if (!last || char !== brackets[last]) return false
        }

    }

    return stack.length === 0;

}

