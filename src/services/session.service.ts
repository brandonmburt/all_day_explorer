class SessionService {

    public hasKey(key: string): boolean {
        return sessionStorage.getItem(key) !== null;
    }

    public get(key: string): any {
        return JSON.parse(sessionStorage.getItem(key));
    }

    public set(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

}

export const sessionService = new SessionService();