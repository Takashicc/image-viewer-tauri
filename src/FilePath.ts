import { Item, List } from "linked-list";

export class FilePaths extends List<FilePath> {}
export class FilePath extends Item {
  private _value: string;
  constructor(value: string) {
    super();
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  hasPrevious(): boolean {
    return this.prev !== null;
  }

  hasNext(): boolean {
    return this.next !== null;
  }
}
