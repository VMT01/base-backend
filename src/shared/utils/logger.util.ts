export function log(position: string, messages?: any[], isError = false) {
    console.log(
        `${isError ? '[err] ' : ''}${position}`,
        ...messages.map(message => (typeof message === 'object' ? JSON.stringify(message, null, 4) : message)),
    );
}
