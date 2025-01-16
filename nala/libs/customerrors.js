/* eslint-disable import/prefer-default-export */

export class AccessibilityError extends Error {
  constructor(messages) {
    super(messages);
    this.name = 'AccessibilityError';
  }
}
