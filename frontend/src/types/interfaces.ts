// REACT
export interface ITarget {
    target: {
      value: React.SetStateAction<string>;
    };
    preventDefault(): void;
  }