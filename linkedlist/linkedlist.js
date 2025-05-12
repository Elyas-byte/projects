export class Node {
    constructor(value = null, nextNode = null) {
      this.value = value;
      this.nextNode = nextNode;
    }
  }
  
  export class LinkedList {
    constructor() {
      this.headNode = null;
    }
  
    append(value) {
      const newNode = new Node(value);
      if (!this.headNode) {
        this.headNode = newNode;
        return;
      }
      let current = this.headNode;
      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }
  
    toString() {
      let current = this.headNode;
      let str = '';
      while (current) {
        str += `( ${current.value} ) -> `;
        current = current.nextNode;
      }
      return str + 'null';
    }
  
    clear() {
      this.headNode = null;
    }
  }
  