export declare class Environment {
    private eGridDiv;
    private gridSize;
    private iconSize;
    private sassVariables;
    loadSassVariables(): void;
    getSassVariable(theme: string, key: string): number;
    getTheme(): string;
}
