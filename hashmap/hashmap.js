class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
      this.capacity = initialCapacity;
      this.loadFactor = loadFactor;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.count = 0;
    }
  
    _hash(key) {
      let hashCode = 0;
      const prime = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  
    _resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.count = 0;
  
      for (const bucket of oldBuckets) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  
    set(key, value) {
      if (typeof key !== "string") throw new Error("Keys must be strings.");
      if (this.count / this.capacity >= this.loadFactor) {
        this._resize();
      }
  
      const index = this._hash(key);
      if (index < 0 || index >= this.buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      const bucket = this.buckets[index];
      for (const pair of bucket) {
        if (pair[0] === key) {
          pair[1] = value;
          return;
        }
      }
  
      bucket.push([key, value]);
      this.count++;
    }
  
    get(key) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
  
      for (const [k, v] of bucket) {
        if (k === key) return v;
      }
      return null;
    }
  
    has(key) {
      return this.get(key) !== null;
    }
  
    remove(key) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          this.count--;
          return true;
        }
      }
      return false;
    }
  
    length() {
      return this.count;
    }
  
    clear() {
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.count = 0;
    }
  
    keys() {
      const keys = [];
      for (const bucket of this.buckets) {
        for (const [k] of bucket) keys.push(k);
      }
      return keys;
    }
  
    values() {
      const values = [];
      for (const bucket of this.buckets) {
        for (const [, v] of bucket) values.push(v);
      }
      return values;
    }
  
    entries() {
      const entries = [];
      for (const bucket of this.buckets) {
        for (const pair of bucket) entries.push([...pair]);
      }
      return entries;
    }
  }
  